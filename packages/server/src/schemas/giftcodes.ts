import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

// The spec's required list marks every field as required, but the module docs
// state a code can be generated with or without an assignee; the assignment
// fields are modeled as optional to match that behavior
export const GenerateGiftCodeRQSchema = z.object({
  commerceCode: z.string().min(1, "commerceCode is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().min(1, "reference1 is required"),
  lifeTime: z.string().min(1, "lifeTime is required"),
  documentType: z.enum(["CC", "TI", "CE", "PT"]).optional(),
  documentNumber: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  contactEmail: z.string().optional(),
});

export const GenerateGiftCodeRSSchema = z.object({
  generateGiftCodeRS: z.object({
    giftCode: z.string(),
    urlQR: z.string(),
    phoneNumber: z.string().optional(),
    documentType: z.string().optional(),
    documentNumber: z.string().optional(),
    commerceCode: z.string(),
    value: z.string(),
    lifeTime: z.string().optional(),
    reference1: z.string(),
  }),
});

export const GenerateGiftCodeResponseSchema = createResponseSchema(
  GenerateGiftCodeRSSchema,
);

export const ReverseRedemptionRQSchema = z.object({
  commerceCode: z.string().min(1, "commerceCode is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  giftCode: z.string().min(1, "giftCode is required"),
});

export const ReverseRedemptionRSSchema = z.object({}).catchall(z.unknown());

export const ReverseRedemptionResponseSchema = createResponseSchema(
  ReverseRedemptionRSSchema,
);

export type GenerateGiftCodeRQ = output<typeof GenerateGiftCodeRQSchema>;
export type ReverseRedemptionRQ = output<typeof ReverseRedemptionRQSchema>;
export type GenerateGiftCodeResponse = output<
  typeof GenerateGiftCodeResponseSchema
>;
export type ReverseRedemptionResponse = output<
  typeof ReverseRedemptionResponseSchema
>;
