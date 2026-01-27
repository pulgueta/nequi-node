import type { output } from "zod";
import { z } from "zod";

export const DestinationSchema = z.object({
  ServiceName: z.string(),
  ServiceOperation: z.string(),
  ServiceRegion: z.string(),
  ServiceVersion: z.string(),
});

export const RequestHeaderSchema = z.object({
  Channel: z.string(),
  RequestDate: z.string(),
  MessageID: z.string().uuid(),
  ClientID: z.string(),
  Destination: DestinationSchema,
});

export const StatusSchema = z.object({
  StatusCode: z.string(),
  StatusDesc: z.string(),
});

export const ResponseHeaderSchema = z.object({
  Channel: z.string(),
  ResponseDate: z.string(),
  Status: StatusSchema,
  MessageID: z.string(),
  ClientID: z.string(),
  Destination: DestinationSchema.optional(),
});

export const createResponseSchema = <T extends z.ZodTypeAny>(bodySchema: T) =>
  z.object({
    ResponseMessage: z.object({
      ResponseHeader: ResponseHeaderSchema,
      ResponseBody: z.object({
        any: bodySchema,
      }),
    }),
  });

export const createRequestSchema = <T extends z.ZodTypeAny>(bodySchema: T) =>
  z.object({
    RequestMessage: z.object({
      RequestHeader: RequestHeaderSchema,
      RequestBody: z.object({
        any: bodySchema,
      }),
    }),
  });

export type Destination = output<typeof DestinationSchema>;
