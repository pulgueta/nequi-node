export const getUrls = (env: "development" | "production") => ({
  BASE_PATH:
    env === "development"
      ? "https://api.sandbox.nequi.com"
      : "https://api.nequi.com",
  AUTH_URI:
    env === "development"
      ? "https://oauth.sandbox.nequi.com/oauth2/token"
      : "https://oauth.nequi.com/oauth2/token",
});

export const ENDPOINTS = {
  QR: {
    GENERATE: "/payments/v2/-services-paymentservice-generatecodeqr",
    STATUS: "/payments/v2/-services-paymentservice-getstatuspayment",
    REVERT: "/payments/v2/-services-reverseservices-reversetransaction",
  },
  PAYMENT_PUSH: {
    UNREGISTERED: "/payments/v2/-services-paymentservice-unregisteredpayment",
    CANCEL_UNREGISTERED:
      "/payments/v2/-services-paymentservice-cancelunregisteredpayment",
    STATUS: "/payments/v2/-services-paymentservice-getstatuspayment",
    REVERT: "/payments/v2/-services-reverseservices-reversetransaction",
  },
  SUBSCRIPTION: {
    AUTOMATIC_PAYMENT:
      "/subscriptions/v2/-services-subscriptionpaymentservice-automaticpayment",
    CREATE_SUBSCRIPTION:
      "/subscriptions/v2/-services-subscriptionpaymentservice-newsubscription",
    GET_SUBSCRIPTION:
      "/subscriptions/v2/-services-subscriptionpaymentservice-getsubscription",
    // Per the official spec this path has no leading hyphen segment
    CANCEL_SUBSCRIPTION:
      "/subscriptions/v2/services-subscriptionpaymentservice-cancelsubscription",
    REVERSE_TRANSACTION:
      "/subscriptions/v2/-services-reverseservices-reversetransaction",
  },
  DISPERSIONS: {
    CREATE_DISPERSION:
      "/dispersions/v2/-services-dispersionservice-dispersefunds",
    CANCEL_DISPERSION:
      "/dispersions/v2/-services-dispersionservice-reversedispersion",
  },
  REPORTS: {
    GET_REPORTS: "/partners/v2/-services-reportsservice-getreports",
  },
  GIFT_CODES: {
    GENERATE_CODE: "/giftcodes/v2/-services-giftcodeservices-generatecode",
    REVERSE_REDEMPTION:
      "/giftcodes/v2/-services-giftcodeservices-reverseredemption",
  },
} as const;

export const CHANNELS = {
  QR: "PQR03-C001",
  PAYMENT_PUSH: "PNP04-C001",
  SUBSCRIPTION: "PDA05-C001",
  DISPERSIONS: "GLK06-C001",
  REPORTS: "MF-001",
  GIFT_CODES: "MF-001",
} as const;

// Values returned in getStatusPaymentRS.status (QR and push payments)
export const PAYMENT_STATUS = {
  PENDING: "33",
  COMPLETED: "35",
  FAILED: "71",
  EXPIRED: "10-454",
  CANCELLED_OR_REJECTED: "10-455",
} as const;
