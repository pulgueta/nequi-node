import { Nequi } from "@pulgueta/nequi-node";
import type { Credentials } from "./config";
import { config, credentialsSchema, isConfigured, isProduction } from "./config";

/**
 * Create a Nequi SDK instance with the provided credentials
 * Environment is always "development" (sandbox) for testing
 */
export const createNequiInstance = (credentials: Credentials) => {
  return new Nequi({
    apiKey: credentials.apiKey,
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    env: "development", // Always sandbox for testing
  });
};

/**
 * Get Nequi SDK instance based on environment:
 * - Production: requires credentials passed in the request
 * - Development: uses environment variables
 */
export const getNequiFromRequest = (requestCredentials?: unknown) => {
  // In production, credentials must be provided in the request
  if (isProduction) {
    if (!requestCredentials) {
      return { nequi: null, error: "Credentials required" };
    }

    const parsed = credentialsSchema.safeParse(requestCredentials);
    if (!parsed.success) {
      return { nequi: null, error: "Invalid credentials format" };
    }

    return { nequi: createNequiInstance(parsed.data), error: null };
  }

  // In development, use environment variables
  if (!isConfigured || !config) {
    return { nequi: null, error: "SDK not configured. Check your .env.local file." };
  }

  return { nequi: createNequiInstance(config), error: null };
};

export { isConfigured, isProduction, config };
