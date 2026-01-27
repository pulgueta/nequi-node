import { URLS } from "@/constants";
import { NequiError } from "@/error";
import type { Auth, AuthResponse } from "./types";

export const nequiAuth = async (clientId: string, clientSecret: string): Promise<Auth | NequiError> => {
  try {
    const authToken = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;

    const req = await fetch(`${URLS.AUTH_URI}?grant_type=client_credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authToken,
        Accept: "application/json",
      },
    });

    if (!req.ok || NequiError.isNequiError(req)) {
      throw NequiError.from({
        message: "[Nequi SDK]: Fallo de autenticación",
        name: "invalid_access",
        status: 422,
      });
    }

    const res = (await req.json()) as AuthResponse;

    return {
      token: res.access_token,
      tokenType: res.token_type,
      expiresAt: new Date(Date.now() + res.expires_in * 1000),
      isValid: new Date() < new Date(Date.now() + res.expires_in * 1000),
    };
  } catch (error) {
    if (NequiError.isNequiError(error)) {
      throw error;
    }

    throw NequiError.from({
      message: "[Nequi SDK]: Fallo de autenticación",
      name: "authentication_error",
      status: 401,
    });
  }
};
