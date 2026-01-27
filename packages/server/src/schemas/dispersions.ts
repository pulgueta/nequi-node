import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

// ============================================================================
// Disperse Funds - Request Schema
// ============================================================================

export const DisperseFundsRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  trackingID: z.string().min(1, "trackingID is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

// ============================================================================
// Disperse Funds - Response Schema
// ============================================================================

export const DisperseFundsRSSchema = z.object({}).optional();

export const DisperseFundsResponseSchema = createResponseSchema(
  z.object({}).catchall(z.unknown()),
);

// ============================================================================
// Reverse Dispersion - Request Schema
// ============================================================================

export const ReverseDispersionRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  trackingID: z.string().min(1, "trackingID is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

// ============================================================================
// Reverse Dispersion - Response Schema
// ============================================================================

export const ReverseDispersionRSSchema = z.object({}).optional();

export const ReverseDispersionResponseSchema = createResponseSchema(
  z.object({}).catchall(z.unknown()),
);

// ============================================================================
// Inferred Types (using verbatim module syntax)
// ============================================================================

export type DisperseFundsRQ = output<typeof DisperseFundsRQSchema>;
export type DisperseFundsResponse = output<typeof DisperseFundsResponseSchema>;

export type ReverseDispersionRQ = output<typeof ReverseDispersionRQSchema>;
export type ReverseDispersionResponse = output<
  typeof ReverseDispersionResponseSchema
>;
