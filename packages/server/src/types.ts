import type { NequiError } from "./error";

export type SdkResponse<T> = readonly [NequiError, null] | readonly [null, T];
