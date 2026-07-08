import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

export const AutomaticPaymentRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  value: z.string().min(1, "value is required"),
  token: z.string().min(1, "token is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

export const AutomaticPaymentRSSchema = z.object({
  automaticPaymentRS: z.object({
    transactionId: z.string(),
    token: z.string(),
  }),
});

export const AutomaticPaymentResponseSchema = createResponseSchema(
  AutomaticPaymentRSSchema,
);

export const NewSubscriptionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  name: z.string().min(1, "name is required"),
});

export const NewSubscriptionRSSchema = z.object({
  newSubscriptionRS: z.object({
    token: z.string(),
  }),
});

export const NewSubscriptionResponseSchema = createResponseSchema(
  NewSubscriptionRSSchema,
);

export const GetSubscriptionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  token: z.string().min(1, "token is required"),
});

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

export const CancelSubscriptionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  token: z.string().min(1, "token is required"),
});

export const CancelSubscriptionRSSchema = z.object({
  cancelSubscriptionRS: z.object({}).optional(),
});

export const CancelSubscriptionResponseSchema = createResponseSchema(
  CancelSubscriptionRSSchema,
);

export const ReverseSubscriptionTransactionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  code: z.string().min(1, "code is required"),
  messageId: z.string().min(1, "messageId is required"),
  type: z.literal("automaticPayment"),
});

// The API returns reversionRS as an empty string in the documented examples
export const ReverseSubscriptionTransactionRSSchema = z.object({
  reversionRS: z.union([z.object({}), z.literal("")]).optional(),
});

export const ReverseSubscriptionTransactionResponseSchema =
  createResponseSchema(ReverseSubscriptionTransactionRSSchema);

export type AutomaticPaymentRQ = output<typeof AutomaticPaymentRQSchema>;
export type NewSubscriptionRQ = output<typeof NewSubscriptionRQSchema>;
export type GetSubscriptionRQ = output<typeof GetSubscriptionRQSchema>;
export type CancelSubscriptionRQ = output<typeof CancelSubscriptionRQSchema>;
export type ReverseSubscriptionTransactionRQ = output<
  typeof ReverseSubscriptionTransactionRQSchema
>;
export type NewSubscriptionResponse = output<
  typeof NewSubscriptionResponseSchema
>;
export type GetSubscriptionResponse = output<
  typeof GetSubscriptionResponseSchema
>;
export type AutomaticPaymentResponse = output<
  typeof AutomaticPaymentResponseSchema
>;
export type CancelSubscriptionResponse = output<
  typeof CancelSubscriptionResponseSchema
>;
export type ReverseSubscriptionTransactionResponse = output<
  typeof ReverseSubscriptionTransactionResponseSchema
>;
