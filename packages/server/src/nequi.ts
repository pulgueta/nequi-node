import type { z } from "zod";

import { nequiAuth } from "@/auth";
import { Dispersions } from "@/dispersions";
import { NequiError } from "@/error";
import { PushPayment } from "@/payments";
import { GenerateQR } from "@/qr";
import { Reports } from "@/reports";
import { Subscription } from "@/subscriptions";
import type { SdkResponse } from "@/types";
import { NequiOptionsSchema } from "@/types";
import { handleValidationError } from "@/utils/validation";

export class Nequi {
  private readonly apiKey: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  readonly qr: GenerateQR;
  readonly pushPayment: PushPayment;
  readonly subscription: Subscription;
  readonly dispersions: Dispersions;
  readonly reports: Reports;

  constructor(opts: z.input<typeof NequiOptionsSchema>) {
    const parsed = NequiOptionsSchema.safeParse(opts);

    if (!parsed.success) {
      throw NequiError.from({
        message: `[Nequi SDK]: Invalid configuration - ${parsed.error.issues.map((e) => e.message).join(", ")}`,
        name: "missing_required_field",
        status: 422,
      });
    }

    this.apiKey = parsed.data.apiKey;
    this.clientId = parsed.data.clientId;
    this.clientSecret = parsed.data.clientSecret;

    this.qr = new GenerateQR(this);
    this.pushPayment = new PushPayment(this);
    this.subscription = new Subscription(this);
    this.dispersions = new Dispersions(this);
    this.reports = new Reports(this);
  }

  getClientId() {
    return this.clientId;
  }

  private async auth() {
    const authenticate = await nequiAuth(this.clientId, this.clientSecret);

    if (NequiError.isNequiError(authenticate)) {
      throw NequiError.from(authenticate);
    }

    return authenticate;
  }

  async request<T>(url: string, options: RequestInit): Promise<SdkResponse<T>> {
    const auth = await this.auth();

    if (NequiError.isNequiError(auth)) {
      return [auth, null] as const;
    }

    try {
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
          const errText = await req.text();
          const errJson = JSON.parse(errText);

          return [
            NequiError.from({
              name:
                req.status === 403 ? "invalid_api_Key" : "application_error",
              message: errJson?.message || req.statusText,
              status: req.status,
            }),
            null,
          ] as const;
        } catch {
          return [
            NequiError.from({
              name: "application_error",
              message: req.statusText,
              status: req.status,
            }),
            null,
          ] as const;
        }
      }

      const data = (await req.json()) as T;
      return [null, data] as const;
    } catch (error) {
      return [handleValidationError(error), null] as const;
    }
  }

  async get<T>(url: string, options?: { query?: Record<string, unknown> }) {
    const requestOptions: RequestInit = {
      method: "GET",
      ...options,
    };

    return this.request<T>(url, requestOptions);
  }

  async post<T>(url: string, options: RequestInit) {
    const requestOptions: RequestInit = {
      method: "POST",
      ...options,
    };

    return this.request<T>(url, requestOptions);
  }
}
