export const URLS = {
  BASE_PATH:
    process.env.NODE_ENV === "development"
      ? "https://api.sandbox.nequi.com"
      : "https://api.nequi.com",
  AUTH_URI:
    process.env.NODE_ENV === "development"
      ? "https://oauth.sandbox.nequi.com/oauth2/token"
      : "https://oauth.nequi.com/oauth2/token",
} as const;

export const ENDPOINTS = {
  QR: {
    GENERATE: "/payments/v2/-services-paymentservice-generatecodeqr",
    STATUS: "/-services-paymentservice-getstatuspayment",
    REVERT: "/-services-reverseservices-reversetransaction",
  },
  PAYMENT_PUSH: {
    UNREGISTERED: "/-services-paymentservice-unregisteredpayment",
    CANCEL_UNREGISTERED: "/-services-paymentservice-cancelunregisteredpayment",
    STATUS: "/-services-paymentservice-getstatuspayment",
    REVERT: "/-services-reverseservices-reversetransaction",
  },
  SUBSCRIPTION: {
    AUTOMATIC_PAYMENT: "/-services-subscriptionpaymentservice-automaticpayment",
    STATUS_PAYMENT: "/-services-subscriptionpaymentservice-getstatuspayment",
    CREATE_SUBSCRIPTION:
      "/-services-subscriptionpaymentservice-newsubscription",
    GET_SUBSCRIPTION: "/-services-subscriptionpaymentservice-getsubscription",
    REVERSE_TRANSACTION: "/-services-reverseservices-reversetransaction",
  },
  DISPERSIONS: {
    CREATE_DISPERSION: "/-services-dispersionservice-dispersefunds",
    CANCEL_DISPERSION: "/-services-dispersionservice-reversedispersion",
  },
  REPORTS: {
    GET_REPORTS: "/-services-reportsservice-getreports",
  },
} as const;

export const CHANNELS = {
  QR: "PQR03-C001",
  PAYMENT_PUSH: "PNP04-C001",
  SUBSCRIPTION: "PDA05-C001",
  DISPERSIONS: "GLK06-C001",
  REPORTS: "MF-001",
} as const;
