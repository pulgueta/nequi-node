export const ERROR_CODES_BY_KEY = {
  missing_required_field: 422,
  invalid_access: 422,
  invalid_parameter: 422,
  invalid_region: 422,
  rate_limit_exceeded: 429,
  missing_api_key: 401,
  invalid_api_Key: 403,
  validation_error: 403,
  not_found: 404,
  authentication_error: 401,
  method_not_allowed: 405,
  application_error: 500,
  internal_server_error: 500,
  bad_request: 400,
} as const;

export type ERROR_CODE_KEY = keyof typeof ERROR_CODES_BY_KEY;
export type ERROR_CODE_VALUE = (typeof ERROR_CODES_BY_KEY)[ERROR_CODE_KEY];

export type ErrorResponse = {
  status: number;
  message: string;
  name: ERROR_CODE_KEY;
};

export type Tag = { name: string; value: string };
