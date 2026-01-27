import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

// ============================================================================
// Automatic Payment - Request Schema
// ============================================================================

export const AutomaticPaymentRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  value: z.string().min(1, "value is required"),
  token: z.string().min(1, "token is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

// ============================================================================
// Automatic Payment - Response Schema
// ============================================================================

export const AutomaticPaymentRSSchema = z.object({
  automaticPaymentRS: z.object({
    transactionId: z.string(),
    token: z.string(),
  }),
});

export const AutomaticPaymentResponseSchema = createResponseSchema(
  AutomaticPaymentRSSchema,
);

// ============================================================================
// New Subscription - Request Schema
// ============================================================================

export const NewSubscriptionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  name: z.string().min(1, "name is required"),
});

// ============================================================================
// New Subscription - Response Schema
// ============================================================================

export const NewSubscriptionRSSchema = z.object({
  newSubscriptionRS: z.object({
    token: z.string(),
  }),
});

export const NewSubscriptionResponseSchema = createResponseSchema(
  NewSubscriptionRSSchema,
);

// ============================================================================
// Get Subscription - Request Schema
// ============================================================================

export const GetSubscriptionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  token: z.string().min(1, "token is required"),
});

// ============================================================================
// Get Subscription - Response Schema
// ============================================================================

export const GetSubscriptionRSSchema = z.object({
  getSubscriptionRS: z.object({
    dateCreated: z.string(),
    name: z.string(),
    status: z.string(),
  }),
});

export const GetSubscriptionResponseSchema = createResponseSchema(
  GetSubscriptionRSSchema,
);

// ============================================================================
// Reverse Transaction (Subscription) - Request Schema
// ============================================================================

export const ReverseSubscriptionTransactionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  code: z.string().min(1, "code is required"),
  messageId: z.string().min(1, "messageId is required"),
  type: z.literal("automaticPayment"),
});

// ============================================================================
// Reverse Transaction - Response Schema
// ============================================================================

export const ReverseSubscriptionTransactionRSSchema = z.object({
  reversionRS: z.object({}).optional(),
});

export const ReverseSubscriptionTransactionResponseSchema =
  createResponseSchema(ReverseSubscriptionTransactionRSSchema);

// ============================================================================
// Inferred Types (using verbatim module syntax)
// ============================================================================

export type AutomaticPaymentRQ = output<typeof AutomaticPaymentRQSchema>;
export type AutomaticPaymentResponse = output<
  typeof AutomaticPaymentResponseSchema
>;

export type NewSubscriptionRQ = output<typeof NewSubscriptionRQSchema>;
export type NewSubscriptionResponse = output<
  typeof NewSubscriptionResponseSchema
>;

export type GetSubscriptionRQ = output<typeof GetSubscriptionRQSchema>;
export type GetSubscriptionResponse = output<
  typeof GetSubscriptionResponseSchema
>;

export type ReverseSubscriptionTransactionRQ = output<
  typeof ReverseSubscriptionTransactionRQSchema
>;
export type ReverseSubscriptionTransactionResponse = output<
  typeof ReverseSubscriptionTransactionResponseSchema
>;
