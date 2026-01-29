import { NequiError } from "@/error";
import { AuthResponseSchema } from "@/schemas/auth";
import { handleValidationError } from "@/utils/validation";

export const nequiAuth = async (
  clientId: string,
  clientSecret: string,
  authUri: string,
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
    });

    if (!req.ok) {
      return NequiError.from({
        message: "[Nequi SDK]: Authentication failed - Invalid credentials",
        name: "authentication_error",
        status: req.status,
      });
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

    return NequiError.from({
      message: "[Nequi SDK]: Authentication failed",
      name: "authentication_error",
      status: 401,
    });
  }
};
