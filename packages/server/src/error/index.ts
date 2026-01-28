import type { ERROR_CODE_KEY, ERROR_CODE_VALUE, ErrorResponse } from "./types";
import { ERROR_CODES_BY_KEY } from "./types";

export class NequiError extends Error implements ErrorResponse {
  status: ERROR_CODE_VALUE;

  constructor(
    message: string,
    public name: ERROR_CODE_KEY,
    status: ERROR_CODE_VALUE,
  ) {
    super(message);
    this.status = status;
  }

  static from(error: ErrorResponse) {
    return new NequiError(error.message, error.name, ERROR_CODES_BY_KEY[error.name]);
  }

  static isNequiError(error: any): error is NequiError {
    return error instanceof NequiError;
  }
}
