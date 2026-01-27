import type { output } from "zod";
import { z } from "zod";

import { createResponseSchema } from "./common";

export const ReportFormatSchema = z.enum(["json", "csv", "pdf"]);

export const GetReportsRQSchema = z.object({
  code: z.string().min(1, "code is required"),
  startDate: z.string().min(1, "startDate is required"),
  endDate: z.string().min(1, "endDate is required"),
  format: ReportFormatSchema,
});

export const ReportTransactionSchema = z.object({
  buyerLastName: z.string(),
  transactionDate: z.string(),
  commerceName: z.string(),
  buyerName: z.string(),
  productChannel: z.string(),
  transactionReference: z.string(),
  messageId: z.string(),
  transactionValue: z.string(),
});

export const GetReportsRSSchema = z.object({
  getReportsRS: z.object({
    commerce: z.string(),
    nit: z.string(),
    accountNumber: z.array(z.string()),
    from: z.string(),
    to: z.string(),
    total: z.string(),
    count: z.string(),
    transactions: z.array(ReportTransactionSchema),
  }),
});

export const GetReportsResponseSchema =
  createResponseSchema(GetReportsRSSchema);

export type GetReportsRQ = output<typeof GetReportsRQSchema>;
