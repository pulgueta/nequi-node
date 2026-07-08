import { z } from "zod";

// ============================================================================
// OAuth2 Token Response Schema (from /oauth2/token)
// ============================================================================

export const AuthResponseSchema = z.object({
  access_token: z.string(),
  // Docs say token_type is "typically Bearer", not a guaranteed literal
  token_type: z.string(),
  expires_in: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    // Guard against NaN/negative values silently producing an invalid expiry
    .pipe(z.number().int().positive()),
});

// ============================================================================
// Processed Auth Result Schema
// ============================================================================

export const AuthSchema = z.object({
  token: z.string(),
  tokenType: z.string(),
  expiresAt: z.date(),
  isValid: z.boolean(),
});
