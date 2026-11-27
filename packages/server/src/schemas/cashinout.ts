import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

export const ValidateClientRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
});

export const ValidateClientRSSchema = z.object({
  validateClientRS: z.object({
    customerName: z.string().optional(),
  }),
});

export const ValidateClientResponseSchema = createResponseSchema(
  ValidateClientRSSchema,
);

export const CashInRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  value: z.string().min(1, "value is required"),
  origin: z.string().min(1, "origin is required"),
});

export const CashInResponseSchema = createResponseSchema(
  z.object({}).catchall(z.unknown()),
);

export const CashOutConsultRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
});

export const CashOutConsultRSSchema = z.object({
  cashOutConsultRS: z.object({
    phoneNumber: z.string().optional(),
    value: z.string().optional(),
    description: z.string().optional(),
    reference: z.string().optional(),
  }),
});

export const CashOutConsultResponseSchema = createResponseSchema(
  CashOutConsultRSSchema,
);

export const CashOutRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  /** Token encrypted with the RSA public key from `getPublicKey`. */
  token: z.string().min(1, "token is required"),
  code: z.string().min(1, "code is required"),
  reference: z.string().optional(),
  value: z.string().min(1, "value is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
  reference4: z.string().optional(),
  reference5: z.string().optional(),
  reference6: z.string().optional(),
});

export const CashOutResponseSchema = createResponseSchema(
  z.object({}).catchall(z.unknown()),
);

export const ReverseCashTransactionRQSchema = z.object({
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  code: z.string().min(1, "code is required"),
  value: z.string().min(1, "value is required"),
  /** MessageID of the original transaction. */
  messageId: z.string().min(1, "messageId is required"),
  type: z.enum(["cashout", "cashin"]),
});

export const ReverseCashTransactionRSSchema = z.object({
  reversionRS: z.object({}).catchall(z.unknown()).optional(),
});

export const ReverseCashTransactionResponseSchema = createResponseSchema(
  ReverseCashTransactionRSSchema,
);

// The spec returns the RSA public key as a PEM string
// (application/x-pem-file), not as a JSON message
export const GetPublicKeyResponseSchema = z.string();

export type ValidateClientRQ = output<typeof ValidateClientRQSchema>;
export type ValidateClientResponse = output<
  typeof ValidateClientResponseSchema
>;
export type CashInRQ = output<typeof CashInRQSchema>;
export type CashInResponse = output<typeof CashInResponseSchema>;
export type CashOutConsultRQ = output<typeof CashOutConsultRQSchema>;
export type CashOutConsultResponse = output<
  typeof CashOutConsultResponseSchema
>;
export type CashOutRQ = output<typeof CashOutRQSchema>;
export type CashOutResponse = output<typeof CashOutResponseSchema>;
export type ReverseCashTransactionRQ = output<
  typeof ReverseCashTransactionRQSchema
>;
export type ReverseCashTransactionResponse = output<
  typeof ReverseCashTransactionResponseSchema
>;
export type GetPublicKeyResponse = output<typeof GetPublicKeyResponseSchema>;
