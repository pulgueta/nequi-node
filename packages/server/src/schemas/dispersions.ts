import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

export const DocumentTypeSchema = z.enum(["CC", "TI", "CE", "PT"]);

export const DisperseFundsRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  trackingID: z.string().min(1, "trackingID is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  documentType: DocumentTypeSchema.optional(),
  documentNumber: z.string().optional(),
  reference1: z.string().min(1, "reference1 is required").max(45),
  reference2: z.string().min(1, "reference2 is required").max(45),
  reference3: z.string().min(1, "reference3 is required").max(45),
});

export const DisperseFundsRSSchema = z.object({}).optional();

export const DisperseFundsResponseSchema = createResponseSchema(
  z.object({}).catchall(z.unknown()),
);

export const ReverseDispersionRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  trackingID: z.string().min(1, "trackingID is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().min(1, "reference1 is required").max(45),
  reference2: z.string().min(1, "reference2 is required").max(45),
  reference3: z.string().min(1, "reference3 is required").max(45),
});

export const ReverseDispersionRSSchema = z.object({}).optional();

export const ReverseDispersionResponseSchema = createResponseSchema(
  z.object({}).catchall(z.unknown()),
);

export type DisperseFundsRQ = output<typeof DisperseFundsRQSchema>;
export type ReverseDispersionRQ = output<typeof ReverseDispersionRQSchema>;
export type DisperseFundsResponse = output<typeof DisperseFundsResponseSchema>;
export type ReverseDispersionResponse = output<
  typeof ReverseDispersionResponseSchema
>;
