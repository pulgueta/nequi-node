import type { output } from "zod";
import { z } from "zod";

import type { NequiError } from "./error";

export const NequiOptionsSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  clientId: z.string().min(1, "Client ID is required"),
  clientSecret: z.string().min(1, "Client secret is required"),
  env: z.enum(["development", "production"]).default("development"),
});

export type SdkResponse<T> = readonly [NequiError, null] | readonly [null, T];
export type NequiOptions = output<typeof NequiOptionsSchema>;
