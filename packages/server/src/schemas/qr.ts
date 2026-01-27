import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

// ============================================================================
// Generate QR Code - Request Schema
// ============================================================================

export const GenerateCodeQRRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

// ============================================================================
// Generate QR Code - Response Schema
// ============================================================================

export const GenerateCodeQRRSSchema = z.object({
  generateCodeQRRS: z.object({
    qrValue: z.string(),
    transactionId: z.string(),
  }),
});

export const GenerateCodeQRResponseSchema = createResponseSchema(
  GenerateCodeQRRSSchema,
);

// ============================================================================
// Get QR Status Payment - Request Schema (uses qrValue per documentation)
// ============================================================================

export const GetQRStatusPaymentRQSchema = z.object({
  qrValue: z.string().min(1, "qrValue is required"),
});

// ============================================================================
// Get QR Status Payment - Response Schema
// ============================================================================

export const QROriginMoneySchema = z.object({
  name: z.string(),
  pocketType: z.string(),
  value: z.string(),
});

export const GetQRStatusPaymentRSSchema = z.object({
  getStatusPaymentRS: z.object({
    status: z.string(),
    name: z.string(),
    value: z.string(),
    date: z.string(),
    trnId: z.string(),
    originMoney: z.array(QROriginMoneySchema),
    ipAddress: z.string(),
  }),
});

export const GetQRStatusPaymentResponseSchema = createResponseSchema(
  GetQRStatusPaymentRSSchema,
);

// ============================================================================
// Reverse QR Transaction - Request Schema
// ============================================================================

export const ReverseQRTransactionRQSchema = z.object({
  qrValue: z.string().min(1, "qrValue is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  code: z.string().min(1, "code is required"),
});

// ============================================================================
// Reverse QR Transaction - Response Schema
// ============================================================================

export const ReverseQRTransactionRSSchema = z.object({
  reversionRS: z.object({}).optional(),
});

export const ReverseQRTransactionResponseSchema = createResponseSchema(
  ReverseQRTransactionRSSchema,
);

// ============================================================================
// Inferred Types (using verbatim module syntax)
// ============================================================================

export type GenerateCodeQRRQ = output<typeof GenerateCodeQRRQSchema>;
export type GenerateCodeQRResponse = output<
  typeof GenerateCodeQRResponseSchema
>;

export type GetQRStatusPaymentRQ = output<typeof GetQRStatusPaymentRQSchema>;
export type GetQRStatusPaymentResponse = output<
  typeof GetQRStatusPaymentResponseSchema
>;

export type ReverseQRTransactionRQ = output<
  typeof ReverseQRTransactionRQSchema
>;
export type ReverseQRTransactionResponse = output<
  typeof ReverseQRTransactionResponseSchema
>;

export type QROriginMoney = output<typeof QROriginMoneySchema>;
