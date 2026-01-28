import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

export const DisperseFundsRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  trackingID: z.string().min(1, "trackingID is required"),
  phoneNumber: z.string().min(1, "phoneNumber is required"),
  value: z.string().min(1, "value is required"),
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
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
  reference1: z.string().optional(),
  reference2: z.string().optional(),
  reference3: z.string().optional(),
});

export const ReverseDispersionRSSchema = z.object({}).optional();

export const ReverseDispersionResponseSchema = createResponseSchema(
  z.object({}).catchall(z.unknown()),
);

export type DisperseFundsRQ = output<typeof DisperseFundsRQSchema>;
export type ReverseDispersionRQ = output<typeof ReverseDispersionRQSchema>;
