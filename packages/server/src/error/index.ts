import type { ERROR_CODE_KEY, ErrorResponse } from "./types";
import { ERROR_CODES_BY_KEY } from "./types";

// Cross-realm/duplicate-install safe brand for isNequiError
const NEQUI_ERROR_BRAND = Symbol.for("nequi.error");

export class NequiError extends Error implements ErrorResponse {
  status: number;
  /** API-level status code from ResponseMessage.ResponseHeader.Status (e.g. "20-08A"). */
  apiStatusCode?: string;
  /**
   * Raw Nequi response body, kept accessible for unknown or newly added
   * fields. May contain transaction/user data — redact before logging.
   */
  raw?: unknown;

  constructor(
    message: string,
    public name: ERROR_CODE_KEY,
    status: number,
    extras?: { apiStatusCode?: string; raw?: unknown },
  ) {
    super(message);
    this.status = status;
    this.apiStatusCode = extras?.apiStatusCode;
    this.raw = extras?.raw;
    Object.defineProperty(this, NEQUI_ERROR_BRAND, { value: true });
  }

  static from(
    error: ErrorResponse,
    extras?: { apiStatusCode?: string; raw?: unknown },
  ) {
    // Preserve the real HTTP status when provided so callers can react to
    // e.g. 429 vs 500; fall back to the canonical code for the error name
    const status = error.status ?? ERROR_CODES_BY_KEY[error.name] ?? 500;
    return new NequiError(error.message, error.name, status, extras);
  }

  static isNequiError(error: any): error is NequiError {
    return error instanceof NequiError || error?.[NEQUI_ERROR_BRAND] === true;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      apiStatusCode: this.apiStatusCode,
    };
  }
}
