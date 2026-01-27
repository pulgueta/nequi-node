import type { output } from "zod";
import { z } from "zod";

// ============================================================================
// Destination Schema (shared across all services)
// ============================================================================

export const DestinationSchema = z.object({
  ServiceName: z.string(),
  ServiceOperation: z.string(),
  ServiceRegion: z.string(),
  ServiceVersion: z.string(),
});

// ============================================================================
// Request Header Schema
// ============================================================================

export const RequestHeaderSchema = z.object({
  Channel: z.string(),
  RequestDate: z.string(),
  MessageID: z.string().uuid(),
  ClientID: z.string(),
  Destination: DestinationSchema,
});

// ============================================================================
// Response Status Schema
// ============================================================================

export const StatusSchema = z.object({
  StatusCode: z.string(),
  StatusDesc: z.string(),
});

// ============================================================================
// Response Header Schema
// ============================================================================

export const ResponseHeaderSchema = z.object({
  Channel: z.string(),
  ResponseDate: z.string(),
  Status: StatusSchema,
  MessageID: z.string(),
  ClientID: z.string(),
  Destination: DestinationSchema.optional(),
});

// ============================================================================
// Base Response Envelope Schema Factory
// ============================================================================

export const createResponseSchema = <T extends z.ZodTypeAny>(bodySchema: T) =>
  z.object({
    ResponseMessage: z.object({
      ResponseHeader: ResponseHeaderSchema,
      ResponseBody: z.object({
        any: bodySchema,
      }),
    }),
  });

// ============================================================================
// Base Request Envelope Schema Factory
// ============================================================================

export const createRequestSchema = <T extends z.ZodTypeAny>(bodySchema: T) =>
  z.object({
    RequestMessage: z.object({
      RequestHeader: RequestHeaderSchema,
      RequestBody: z.object({
        any: bodySchema,
      }),
    }),
  });

// ============================================================================
// Inferred Types (using verbatim module syntax)
// ============================================================================

export type Destination = output<typeof DestinationSchema>;
export type RequestHeader = output<typeof RequestHeaderSchema>;
export type ResponseHeader = output<typeof ResponseHeaderSchema>;
export type Status = output<typeof StatusSchema>;
