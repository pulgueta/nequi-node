import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

export const GenerateCodeQRRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

export const GenerateCodeQRRSSchema = z.object({
  generateCodeQRRS: z.object({
    qrValue: z.string(),
    transactionId: z.string(),
  }),
});

export const GenerateCodeQRResponseSchema = createResponseSchema(
  GenerateCodeQRRSSchema,
);

export const GetQRStatusPaymentRQSchema = z.object({
  qrValue: z.string().min(1, "qrValue is required"),
});

export const QROriginMoneySchema = z.object({
  name: z.string().optional(),
  pocketType: z.string().optional(),
  value: z.string().optional(),
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

export const ReverseQRTransactionRQSchema = z.object({
  qrValue: z.string().min(1, "qrValue is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  code: z.string().min(1, "code is required"),
});

// The API returns reversionRS as an empty string in the documented examples
export const ReverseQRTransactionRSSchema = z.object({
  reversionRS: z.union([z.object({}), z.literal("")]).optional(),
});

export const ReverseQRTransactionResponseSchema = createResponseSchema(
  ReverseQRTransactionRSSchema,
);

export type GenerateCodeQRRQ = output<typeof GenerateCodeQRRQSchema>;
export type GetQRStatusPaymentRQ = output<typeof GetQRStatusPaymentRQSchema>;
export type ReverseQRTransactionRQ = output<
  typeof ReverseQRTransactionRQSchema
>;
export type GenerateCodeQRResponse = output<
  typeof GenerateCodeQRResponseSchema
>;
export type GetQRStatusPaymentResponse = output<
  typeof GetQRStatusPaymentResponseSchema
>;
export type ReverseQRTransactionResponse = output<
  typeof ReverseQRTransactionResponseSchema
>;
