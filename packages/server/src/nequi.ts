import { nequiAuth } from "@/auth";
import { getUrls } from "@/constants";
import { Dispersions } from "@/dispersions";
import { NequiError } from "@/error";
import { GiftCodes } from "@/giftcodes";
import { PushPayment } from "@/payments";
import { GenerateQR } from "@/qr";
import { Reports } from "@/reports";
import { Subscription } from "@/subscriptions";
import type { SdkResponse } from "@/types";
import { handleValidationError } from "@/utils/validation";

export interface NequiOptions {
  apiKey: string;
  clientId: string;
  clientSecret: string;
  env?: "development" | "production";
  /** Per-request timeout in milliseconds. Defaults to 30000. */
  timeoutMs?: number;
}

interface CachedToken {
  token: string;
  tokenType: string;
  expiresAt: Date;
}

/** Renew the token this many ms before its actual expiry. */
const TOKEN_REFRESH_SKEW_MS = 60_000;

const DEFAULT_TIMEOUT_MS = 30_000;

export class Nequi {
  private readonly apiKey: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly env: "development" | "production";
  private readonly timeoutMs: number;
  private cachedToken: CachedToken | null = null;
  private authInFlight: Promise<CachedToken | NequiError> | null = null;
  readonly basePath: string;
  readonly authUri: string;

  readonly qr: GenerateQR;
  readonly pushPayment: PushPayment;
  readonly subscription: Subscription;
  readonly dispersions: Dispersions;
  readonly reports: Reports;
  readonly giftCodes: GiftCodes;

  constructor(opts: NequiOptions) {
    for (const key of ["apiKey", "clientId", "clientSecret"] as const) {
      if (typeof opts?.[key] !== "string" || opts[key].length === 0) {
        throw new TypeError(
          `[Nequi SDK]: "${key}" is required and must be a non-empty string`,
        );
      }
    }

    const env = opts.env ?? "development";

    if (env !== "development" && env !== "production") {
      throw new TypeError(
        `[Nequi SDK]: "env" must be "development" or "production", received "${env}"`,
      );
    }

    this.apiKey = opts.apiKey;
    this.clientId = opts.clientId;
    this.clientSecret = opts.clientSecret;
    this.env = env;
    this.timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;

    const urls = getUrls(this.env);
    this.basePath = urls.BASE_PATH;
    this.authUri = urls.AUTH_URI;

    this.qr = new GenerateQR(this);
    this.pushPayment = new PushPayment(this);
    this.subscription = new Subscription(this);
    this.dispersions = new Dispersions(this);
    this.reports = new Reports(this);
    this.giftCodes = new GiftCodes(this);
  }

  getClientId() {
    return this.clientId;
  }

  private async auth(): Promise<CachedToken | NequiError> {
    if (
      this.cachedToken &&
      this.cachedToken.expiresAt.getTime() - TOKEN_REFRESH_SKEW_MS > Date.now()
    ) {
      return this.cachedToken;
    }

    // Share a single in-flight token request so concurrent calls don't
    // stampede the OAuth endpoint
    this.authInFlight ??= this.fetchToken().finally(() => {
      this.authInFlight = null;
    });

    return this.authInFlight;
  }

  private async fetchToken(): Promise<CachedToken | NequiError> {
    const authenticate = await nequiAuth(
      this.clientId,
      this.clientSecret,
      this.authUri,
      AbortSignal.timeout(this.timeoutMs),
    );

    if (NequiError.isNequiError(authenticate)) {
      this.cachedToken = null;
      return authenticate;
    }

    this.cachedToken = {
      token: authenticate.token,
      tokenType: authenticate.tokenType,
      expiresAt: authenticate.expiresAt,
    };

    return this.cachedToken;
  }

  async request<T>(url: string, options: RequestInit): Promise<SdkResponse<T>> {
    const auth = await this.auth();

    if (NequiError.isNequiError(auth)) {
      return [auth, null] as const;
    }

    try {
      // Normalize caller headers (plain object, Headers, or entries array),
      // then set the SDK headers last so they can't be overridden
      const headers = new Headers(options.headers);
      headers.set("Authorization", `${auth.tokenType} ${auth.token}`);
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set("x-api-key", this.apiKey);

      const req = await fetch(url, {
        ...options,
        headers,
        signal: options.signal ?? AbortSignal.timeout(this.timeoutMs),
      });

      if (!req.ok) {
        if (req.status === 401 || req.status === 403) {
          // Token may have been revoked server-side; force re-auth next call
          this.cachedToken = null;
        }

        const errText = await req.text().catch(() => "");

        let message = req.statusText;
        try {
          const errJson = JSON.parse(errText);
          message = errJson?.message || message;
        } catch {
          // Non-JSON error body; keep statusText
        }

        const errorName =
          req.status === 401
            ? "authentication_error"
            : req.status === 403
              ? "invalid_api_key"
              : req.status === 429
                ? "rate_limit_exceeded"
                : "application_error";

        return [
          NequiError.from(
            {
              name: errorName,
              message,
              status: req.status,
            },
            { raw: errText || undefined },
          ),
          null,
        ] as const;
      }

      const data = (await req.json()) as T;

      // Nequi reports API-level failures inside a 200 response:
      // ResponseMessage.ResponseHeader.Status.StatusCode !== "0"
      const status = (
        data as {
          ResponseMessage?: {
            ResponseHeader?: {
              Status?: { StatusCode?: unknown; StatusDesc?: string };
            };
          };
        }
      )?.ResponseMessage?.ResponseHeader?.Status;
      if (
        status &&
        typeof status.StatusCode === "string" &&
        status.StatusCode !== "0"
      ) {
        return [
          NequiError.from(
            {
              name: "api_error",
              message: `[Nequi SDK]: API error ${status.StatusCode}: ${status.StatusDesc ?? "Unknown error"}`,
              status: 502,
            },
            { apiStatusCode: status.StatusCode, raw: data },
          ),
          null,
        ] as const;
      }

      return [null, data] as const;
    } catch (error) {
      if (error instanceof Error && error.name === "TimeoutError") {
        return [
          NequiError.from({
            name: "request_timeout",
            message: `[Nequi SDK]: Request timed out after ${this.timeoutMs}ms`,
            status: 408,
          }),
          null,
        ] as const;
      }

      return [handleValidationError(error), null] as const;
    }
  }

  async get<T>(url: string, options?: { query?: Record<string, unknown> }) {
    let requestUrl = url;

    if (options?.query) {
      const params = new URLSearchParams();

      for (const [key, value] of Object.entries(options.query)) {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      }

      const qs = params.toString();
      if (qs) {
        requestUrl += `${url.includes("?") ? "&" : "?"}${qs}`;
      }
    }

    return this.request<T>(requestUrl, { method: "GET" });
  }

  async post<T>(url: string, options: RequestInit) {
    const requestOptions: RequestInit = {
      method: "POST",
      ...options,
    };

    return this.request<T>(url, requestOptions);
  }
}
