import type { output } from "zod";
import { z } from "zod";

import type { NequiError } from "./error";

// ============================================================================
// Nequi SDK Options Schema
// ============================================================================

export const NequiOptionsSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  clientId: z.string().min(1, "Client ID is required"),
  clientSecret: z.string().min(1, "Client secret is required"),
  env: z.enum(["development", "production"]).default("development"),
});

// ============================================================================
// SDK Response Type - Tuple Pattern [error, data]
// ============================================================================

/**
 * SDK response as a tuple: [error, data]
 * - If error exists, data will be null
 * - If data exists, error will be null
 *
 * This pattern enforces error handling:
 * @example
 * const [error, data] = await nequi.qr.createQR({...});
 * if (error) {
 *   console.error(error);
 *   return;
 * }
 * console.log(data);
 */
export type SdkResponse<T> = readonly [NequiError, null] | readonly [null, T];

// ============================================================================
// Inferred Types (using verbatim module syntax)
// ============================================================================

export type NequiOptions = output<typeof NequiOptionsSchema>;
