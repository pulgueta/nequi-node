import { nequiAuth } from "@/auth";
import type { Auth } from "@/auth/types";
import { NequiError } from "@/error";
import { GenerateQR } from "@/qr";
import { PushPayment } from "@/payments";
import { Subscription } from "@/subscriptions";
import { Dispersions } from "@/dispersions";
import { Reports } from "@/reports";
import type { FetchResponse, NequiOptions } from "@/types";

export class Nequi {
  private readonly apiKey: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  readonly qr: GenerateQR;
  readonly pushPayment: PushPayment;
  readonly subscription: Subscription;
  readonly dispersions: Dispersions;
  readonly reports: Reports;

  constructor(opts: NequiOptions) {
    if (!opts.apiKey || !opts.clientId || !opts.clientSecret) {
      throw NequiError.from({
        message: "[Nequi SDK]: Proporcione las credenciales",
        name: "missing_required_field",
        status: 422,
      });
    }

    this.apiKey = opts.apiKey;
    this.clientId = opts.clientId;
    this.clientSecret = opts.clientSecret;

    this.qr = new GenerateQR(this);
    this.pushPayment = new PushPayment(this);
    this.subscription = new Subscription(this);
    this.dispersions = new Dispersions(this);
    this.reports = new Reports(this);
  }

  public getClientId(): string {
    return this.clientId;
  }

  private async auth(): Promise<Auth | NequiError> {
    const authenticate = await nequiAuth(this.clientId, this.clientSecret);

    if (NequiError.isNequiError(authenticate)) {
      throw NequiError.from(authenticate);
    }

    return authenticate;
  }

  async request<const T>(
    url: string,
    options: RequestInit
  ): Promise<FetchResponse<T>> {
    const auth = await this.auth();

    if (auth instanceof NequiError) {
      throw NequiError.from(auth);
    }

    const req = await fetch(url, {
      ...options,
      headers: {
        Authorization: `${auth.tokenType} ${auth.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
    });

    if (!req.ok) {
      try {
        const err = await req.text();

        return { data: null, error: JSON.parse(err) };
      } catch (error) {
        if (NequiError.isNequiError(error)) {
          return {
            data: null,
            error: {
              name: "application_error",
              message: "Internal server error",
              status: 500,
            },
          };
        }

        const err: NequiError = {
          name: "application_error",
          message: req.statusText,
          status: 500,
        };

        if (NequiError.isNequiError(error)) {
          return {
            data: null,
            error: { ...err, message: error.message, status: error.status },
          };
        }

        return { data: null, error: err };
      }
    }

    return {
      data: (await req.json()) as T,
      error: null,
    };
  }

  async get<T>(
    url: string,
    options: { query: Record<string, unknown> }
  ): Promise<T | null> {
    const requestOptions = {
      method: "GET",
      ...options,
    };

    const res = await this.request<T>(url, requestOptions);

    return res.data;
  }

  async post<T>(url: string, options: RequestInit): Promise<T | null> {
    const requestOptions = {
      method: "POST",
      ...options,
    };

    const res = await this.request<T>(url, requestOptions);

    return res.data;
  }
}
