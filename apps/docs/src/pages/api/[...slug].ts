import { Elysia } from "elysia";
import { getNequiFromRequest, isConfigured, isProduction } from "../../lib/nequi";

// Helper to extract credentials and data from request body
const parseRequestBody = (body: unknown) => {
  const { credentials, ...data } = (body || {}) as {
    credentials?: unknown;
    [key: string]: unknown;
  };
  return { credentials, data };
};

const app = new Elysia({ prefix: "/api" })
  // Health check and configuration status
  .get("/health", () => ({
    isProduction,
    isConfigured: isProduction ? false : isConfigured,
    message: isProduction
      ? "Production mode - provide credentials via the form"
      : isConfigured
        ? "SDK is ready (using .env.local)"
        : "SDK credentials not configured in .env.local",
  }))

  // Validate credentials (for production mode)
  .post("/auth/validate", async ({ body }) => {
    const { credentials } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "Invalid credentials" };
    }

    // We can't really validate without making an API call
    // Just return success if credentials are properly formatted
    return { success: true, message: "Credentials accepted" };
  })

  // ============================================================================
  // QR Code Payments
  // ============================================================================
  .post("/qr/create", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.qr.createQR(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/qr/status", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const { qrValue } = data as { qrValue: string };
    const [err, result] = await nequi.qr.getStatus(qrValue);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/qr/revert", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.qr.revert(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  // ============================================================================
  // Push Payments
  // ============================================================================
  .post("/payments/create", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.pushPayment.createPayment(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/payments/status", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.pushPayment.getStatus(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/payments/cancel", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.pushPayment.cancel(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/payments/revert", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.pushPayment.revertTransaction(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  // ============================================================================
  // Subscriptions
  // ============================================================================
  .post("/subscriptions/create", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.subscription.createSubscription(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/subscriptions/payment", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.subscription.automaticPayment(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/subscriptions/details", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.subscription.getSubscription(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/subscriptions/revert", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.subscription.reverseTransaction(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  // ============================================================================
  // Dispersions
  // ============================================================================
  .post("/dispersions/create", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.dispersions.createDispersion(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  // ============================================================================
  // Cash-In/Out
  // ============================================================================
  .post("/cash-in-out/validate-client", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.cashInOut.validateClient(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/cash-in-out/cash-in", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.cashInOut.cashIn(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/cash-in-out/consult-cash-out", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.cashInOut.consultCashOut(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/cash-in-out/cash-out", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.cashInOut.cashOut(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/cash-in-out/public-key", async ({ body }) => {
    const { credentials } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.cashInOut.getPublicKey();
    return { success: !err, message: err?.message || "Success", data: result };
  })

  .post("/cash-in-out/reverse", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.cashInOut.reverseTransaction(data);
    return { success: !err, message: err?.message || "Success", data: result };
  })

  // ============================================================================
  // Partners
  // ============================================================================
  .post("/partners/validate", async ({ body }) => {
    const { credentials, data } = parseRequestBody(body);
    const { nequi, error } = getNequiFromRequest(credentials);

    if (error || !nequi) {
      return { success: false, message: error || "SDK not configured", data: null };
    }

    const [err, result] = await nequi.partners.validatePartner(data);
    return { success: !err, message: err?.message || "Success", data: result };
  });

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
