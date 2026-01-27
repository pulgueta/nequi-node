import { z } from "zod";
import { NequiError } from "@/error";

/**
 * Handles Zod validation errors and converts them to NequiError format
 */
export const handleValidationError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    const formattedErrors = error.issues
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join("; ");

    return NequiError.from({
      name: "validation_error",
      message: `Validation failed: ${formattedErrors}`,
      status: 422,
    });
  }

  if (error instanceof Error) {
    return NequiError.from({
      name: "application_error",
      message: error.message,
      status: 500,
    });
  }

  return NequiError.from({
    name: "application_error",
    message: "An unknown error occurred",
    status: 500,
  });
};

/**
 * Safely parses data with a Zod schema, returning a result object
 */
export const safeParse = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
):
  | { success: true; data: z.infer<T> }
  | { success: false; error: NequiError } => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    error: handleValidationError(result.error),
  };
};

/**
 * Checks if the response status indicates success (StatusCode === "0")
 */
export const isSuccessResponse = (statusCode: string) => statusCode === "0";
