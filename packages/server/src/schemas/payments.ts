import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

// ============================================================================
// Create Unregistered Payment (Push) - Request Schema
// ============================================================================

export const UnregisteredPaymentRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

// ============================================================================
// Create Unregistered Payment - Response Schema
// ============================================================================

export const UnregisteredPaymentRSSchema = z.object({
  unregisteredPaymentRS: z.object({
    transactionId: z.string(),
  }),
});

export const UnregisteredPaymentResponseSchema = createResponseSchema(
  UnregisteredPaymentRSSchema,
);

// ============================================================================
// Cancel Unregistered Payment - Request Schema
// ============================================================================

export const CancelUnregisteredPaymentRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  transactionId: z.string().min(1, "transactionId is required"),
});

// ============================================================================
// Cancel Unregistered Payment - Response Schema
// ============================================================================

export const CancelUnregisteredPaymentRSSchema = z.object({
  cancelRequestMoneyRS: z.object({}).optional(),
});

export const CancelUnregisteredPaymentResponseSchema = createResponseSchema(
  CancelUnregisteredPaymentRSSchema,
);

// ============================================================================
// Get Status Payment - Request Schema
// ============================================================================

export const GetStatusPaymentRQSchema = z.object({
  codeQR: z.string().min(1, "codeQR is required"),
});

// ============================================================================
// Get Status Payment - Response Schema
// ============================================================================

export const OriginMoneySchema = z.object({
  name: z.string(),
  pocketType: z.string(),
  value: z.string(),
});

export const GetStatusPaymentRSSchema = z.object({
  getStatusPaymentRS: z.object({
    status: z.string(),
    name: z.string(),
    value: z.string(),
    date: z.string(),
    trnId: z.string(),
    originMoney: z.array(OriginMoneySchema),
    ipAddress: z.string(),
  }),
});

export const GetStatusPaymentResponseSchema = createResponseSchema(
  GetStatusPaymentRSSchema,
);

// ============================================================================
// Revert Transaction - Request Schema
// ============================================================================

export const RevertTransactionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  code: z.string().min(1, "code is required"),
  messageId: z.string().min(1, "messageId is required"),
  type: z.string().min(1, "type is required"),
});

// ============================================================================
// Revert Transaction - Response Schema
// ============================================================================

export const RevertTransactionRSSchema = z.object({
  reversionRS: z.object({}).optional(),
});

export const RevertTransactionResponseSchema = createResponseSchema(
  RevertTransactionRSSchema,
);

// ============================================================================
// Inferred Types (using verbatim module syntax)
// ============================================================================

export type UnregisteredPaymentRQ = output<typeof UnregisteredPaymentRQSchema>;
export type UnregisteredPaymentResponse = output<
  typeof UnregisteredPaymentResponseSchema
>;

export type CancelUnregisteredPaymentRQ = output<
  typeof CancelUnregisteredPaymentRQSchema
>;
export type CancelUnregisteredPaymentResponse = output<
  typeof CancelUnregisteredPaymentResponseSchema
>;

export type GetStatusPaymentRQ = output<typeof GetStatusPaymentRQSchema>;
export type GetStatusPaymentResponse = output<
  typeof GetStatusPaymentResponseSchema
>;

export type RevertTransactionRQ = output<typeof RevertTransactionRQSchema>;
export type RevertTransactionResponse = output<
  typeof RevertTransactionResponseSchema
>;

export type OriginMoney = output<typeof OriginMoneySchema>;
