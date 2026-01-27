import type { NequiError } from "./error";

export type FetchResponse<T> = {
  data: T | null;
  error: NequiError | null;
};

export type NequiOptions = {
  apiKey: string;
  clientId: string;
  clientSecret: string;
  env?: "development" | "production";
};
