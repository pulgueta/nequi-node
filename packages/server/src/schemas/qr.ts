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

export const ReverseQRTransactionRQSchema = z.object({
  qrValue: z.string().min(1, "qrValue is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  code: z.string().min(1, "code is required"),
});

export const ReverseQRTransactionRSSchema = z.object({
  reversionRS: z.object({}).optional(),
});

export const ReverseQRTransactionResponseSchema = createResponseSchema(
  ReverseQRTransactionRSSchema,
);

export type GenerateCodeQRRQ = output<typeof GenerateCodeQRRQSchema>;
export type GetQRStatusPaymentRQ = output<typeof GetQRStatusPaymentRQSchema>;
export type ReverseQRTransactionRQ = output<
  typeof ReverseQRTransactionRQSchema
>;
