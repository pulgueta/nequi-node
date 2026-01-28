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
    STATUS_PAYMENT:
      "/subscriptions/v2/-services-subscriptionpaymentservice-getstatuspayment",
    CREATE_SUBSCRIPTION:
      "/subscriptions/v2/-services-subscriptionpaymentservice-newsubscription",
    GET_SUBSCRIPTION:
      "/subscriptions/v2/-services-subscriptionpaymentservice-getsubscription",
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
} as const;

export const CHANNELS = {
  QR: "PQR03-C001",
  PAYMENT_PUSH: "PNP04-C001",
  SUBSCRIPTION: "PDA05-C001",
  DISPERSIONS: "GLK06-C001",
  REPORTS: "MF-001",
} as const;
