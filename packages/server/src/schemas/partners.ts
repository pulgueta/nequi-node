import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

export const ValidatePartnerRQSchema = z.object({
  /** Commerce identification type, for example "NIT" or "CC". */
  type: z.string().min(1, "type is required"),
  /** Commerce identification number, without the check digit. */
  id: z.string().min(1, "id is required"),
});

// The spec gives no fields for validatePartnerRS
export const ValidatePartnerRSSchema = z.object({
  validatePartnerRS: z.unknown(),
});

export const ValidatePartnerResponseSchema = createResponseSchema(
  ValidatePartnerRSSchema,
);

export type ValidatePartnerRQ = output<typeof ValidatePartnerRQSchema>;
export type ValidatePartnerResponse = output<
  typeof ValidatePartnerResponseSchema
>;
