import type { output } from "zod";
import { z } from "zod";

// ============================================================================
// OAuth2 Token Response Schema (from /oauth2/token)
// ============================================================================

export const AuthResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val)),
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
