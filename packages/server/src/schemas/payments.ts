import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

export const UnregisteredPaymentRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

export const UnregisteredPaymentRSSchema = z.object({
  unregisteredPaymentRS: z.object({
    transactionId: z.string(),
  }),
});

export const UnregisteredPaymentResponseSchema = createResponseSchema(
  UnregisteredPaymentRSSchema,
);

export const CancelUnregisteredPaymentRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  transactionId: z.string().min(1, "transactionId is required"),
});

export const CancelUnregisteredPaymentRSSchema = z.object({
  cancelRequestMoneyRS: z.object({}).optional(),
});

export const CancelUnregisteredPaymentResponseSchema = createResponseSchema(
  CancelUnregisteredPaymentRSSchema,
);

export const GetStatusPaymentRQSchema = z.object({
  codeQR: z.string().min(1, "codeQR is required"),
});

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

export const RevertTransactionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  code: z.string().min(1, "code is required"),
  messageId: z.string().min(1, "messageId is required"),
  type: z.string().min(1, "type is required"),
});

export const RevertTransactionRSSchema = z.object({
  reversionRS: z.object({}).optional(),
});

export const RevertTransactionResponseSchema = createResponseSchema(
  RevertTransactionRSSchema,
);

export type UnregisteredPaymentRQ = output<typeof UnregisteredPaymentRQSchema>;
export type CancelUnregisteredPaymentRQ = output<
  typeof CancelUnregisteredPaymentRQSchema
>;
export type GetStatusPaymentRQ = output<typeof GetStatusPaymentRQSchema>;
export type RevertTransactionRQ = output<typeof RevertTransactionRQSchema>;
