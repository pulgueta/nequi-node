import { z } from "zod";
import { NequiError } from "@/error";
import type { SdkResponse } from "@/types";

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

export const safeParse = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
): SdkResponse<z.infer<T>> => {
  const result = schema.safeParse(data);

  if (result.success) {
    return [null, result.data] as const;
  }

  return [handleValidationError(result.error), null] as const;
};

export const isSuccessResponse = (statusCode: string) => statusCode === "0";
