import { NequiError } from "@/error";
import { AuthResponseSchema } from "@/schemas/auth";
import { handleValidationError } from "@/utils/validation";

export const nequiAuth = async (
  clientId: string,
  clientSecret: string,
  authUri: string,
  signal?: AbortSignal,
) => {
  try {
    const authToken = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;

    const req = await fetch(`${authUri}?grant_type=client_credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authToken,
        Accept: "application/json",
      },
      signal,
    });

    if (!req.ok) {
      const raw = await req.text().catch(() => undefined);

      return NequiError.from(
        {
          message: "[Nequi SDK]: Authentication failed - Invalid credentials",
          name: "authentication_error",
          status: req.status,
        },
        { raw },
      );
    }

    const json = await req.json();
    const parsed = AuthResponseSchema.safeParse(json);

    if (!parsed.success) {
      return handleValidationError(parsed.error);
    }

    const res = parsed.data;
    const expiresAt = new Date(Date.now() + res.expires_in * 1000);

    return {
      token: res.access_token,
      tokenType: res.token_type,
      expiresAt,
      isValid: new Date() < expiresAt,
    };
  } catch (error) {
    if (NequiError.isNequiError(error)) {
      return error;
    }

    if (error instanceof Error && error.name === "TimeoutError") {
      return NequiError.from({
        message: "[Nequi SDK]: Authentication request timed out",
        name: "request_timeout",
        status: 408,
      });
    }

    return NequiError.from({
      message: `[Nequi SDK]: Authentication failed${error instanceof Error ? ` - ${error.message}` : ""}`,
      name: "authentication_error",
      status: 401,
    });
  }
};
