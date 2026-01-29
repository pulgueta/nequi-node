import { z } from "zod";

// Schema for credentials validation
export const credentialsSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  clientSecret: z.string().min(1, "Client secret is required"),
  apiKey: z.string().min(1, "API key is required"),
});

export type Credentials = z.infer<typeof credentialsSchema>;

// Check if we're running in production (deployed) or development (local)
export const isProduction = process.env.NODE_ENV === "production";

// Environment variables schema for development mode
const envSchema = z.object({
  NEQUI_CLIENT_ID: z.string().min(1, "Client ID is required"),
  NEQUI_CLIENT_SECRET: z.string().min(1, "Client secret is required"),
  NEQUI_API_KEY: z.string().min(1, "API key is required"),
});

// Parse environment variables (only used in development)
const parseEnv = () => {
  if (isProduction) {
    return {
      isConfigured: false,
      errors: [],
      config: null,
    };
  }

  const result = envSchema.safeParse({
    NEQUI_CLIENT_ID: process.env.NEQUI_CLIENT_ID,
    NEQUI_CLIENT_SECRET: process.env.NEQUI_CLIENT_SECRET,
    NEQUI_API_KEY: process.env.NEQUI_API_KEY,
  });

  if (!result.success) {
    return {
      isConfigured: false,
      errors: result.error.issues.map((i: z.ZodIssue) => i.message),
      config: null,
    };
  }

  return {
    isConfigured: true,
    errors: [],
    config: {
      clientId: result.data.NEQUI_CLIENT_ID,
      clientSecret: result.data.NEQUI_CLIENT_SECRET,
      apiKey: result.data.NEQUI_API_KEY,
    } satisfies Credentials,
  };
};

export const { isConfigured, errors, config } = parseEnv();
