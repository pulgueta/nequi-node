# Nequi Node.js SDK

TypeScript SDK for integrating with Nequi API.

## Installation

```bash
npm install @pulgueta/nequi-node
```

## Configuration

```typescript
import { Nequi } from "@pulgueta/nequi-node";

const nequi = new Nequi({
  apiKey: "your-api-key", // Required: API key from Nequi
  clientId: "your-client-id", // Required: Client ID from Nequi
  clientSecret: "your-client-secret", // Required: Client secret from Nequi
  env: "development", // Optional: "development" | "production" (default: "development")
});
```

## Error Handling

All SDK methods return a tuple `[error, data]` pattern:

```typescript
const [error, data] = await nequi.qr.createQR({...});

if (error) {
  // Handle error
  console.error(error.message);
  console.error(error.status);
  console.error(error.name);
  return;
}

// Use data
console.log(data);
```

## Services

### QR Code Payments

Generate QR codes for payments and check their status.

```typescript
// Generate QR code
const [error, qrData] = await nequi.qr.createQR({
  code: "NIT_1",
  value: "1000",
  reference1: "Order #123",
  reference2: "optional",
  reference3: "optional",
});

// Get QR payment status
const [error, status] = await nequi.qr.getStatus({
  qrValue: "0002010102125303170540410005802CO...",
});

// Reverse QR transaction
const [error, result] = await nequi.qr.revert({
  qrValue: "0002010102125303170540410005802CO...",
  phoneNumber: "3998764643",
  value: "1000",
  code: "NIT_1",
});
```

### Push Payments

Send payment notifications to customers' Nequi app.

```typescript
// Create push payment
const [error, payment] = await nequi.pushPayment.createPayment({
  phoneNumber: "3998764643",
  code: "NIT_1",
  value: "1000",
  reference1: "Order #123",
  reference2: "optional",
  reference3: "optional",
});

// Get payment status
const [error, status] = await nequi.pushPayment.getStatus({
  codeQR: "350-913291938-2471-C001",
});

// Cancel payment
const [error, result] = await nequi.pushPayment.cancel({
  code: "1",
  phoneNumber: "3012146840",
  transactionId: "350-3012146840-9232-8944090690",
});

// Revert transaction
const [error, result] = await nequi.pushPayment.revertTransaction({
  phoneNumber: "3998764643",
  value: "1000",
  code: "NIT_1",
  messageId: "9857836163",
  type: "payment",
});
```

### Subscriptions

Create and manage automatic subscription payments.

```typescript
// Create subscription
const [error, subscription] = await nequi.subscription.createSubscription({
  phoneNumber: "3998764643",
  code: "NIT_1",
  name: "Premium Plan",
});

// Process automatic payment
const [error, payment] = await nequi.subscription.automaticPayment({
  phoneNumber: "3998764643",
  code: "NIT_1",
  value: "1000",
  token: subscription.token, // Token from createSubscription
  reference1: "Monthly payment",
});

// Get subscription details
const [error, details] = await nequi.subscription.getSubscription({
  phoneNumber: "3998764643",
  code: "NIT_1",
  token: subscription.token,
});

// Reverse subscription transaction
const [error, result] = await nequi.subscription.reverseTransaction({
  phoneNumber: "3998764643",
  value: "100",
  code: "NIT_1",
  messageId: "9857836163",
  type: "automaticPayment",
});
```

### Dispersions

Send payments from your business account to Nequi accounts.

```typescript
// Disperse funds
const [error, result] = await nequi.dispersions.createDispersion({
  code: "NIT_440627004_00",
  trackingID: "DAN123456789",
  phoneNumber: "3998764643",
  value: "1000",
  reference1: "Payroll",
  reference2: "optional",
  reference3: "optional",
});

// Reverse dispersion
const [error, result] = await nequi.dispersions.reverseDispersion({
  code: "NIT_440627004_00",
  trackingID: "DAN123456789",
  phoneNumber: "3998764643",
  value: "1000",
  reference1: "Payroll",
  reference2: "optional",
  reference3: "optional",
});
```

### Reports

Retrieve transaction reports and analytics.

```typescript
// Get reports
const [error, reports] = await nequi.reports.getReports({
  code: "NIT_901049033",
  startDate: "2018-09-01",
  endDate: "2018-09-09",
  format: "json", // "json" | "csv" | "pdf"
});
```

## Types

The SDK exports TypeScript types for all request and response schemas:

```typescript
import type {
  GenerateCodeQRRQ,
  GetQRStatusPaymentRQ,
  UnregisteredPaymentRQ,
  AutomaticPaymentRQ,
  DisperseFundsRQ,
  GetReportsRQ,
  // ... and more
} from "@pulgueta/nequi-node";
```

## Error Types

```typescript
import { NequiError } from "@pulgueta/nequi-node";

// Check if error is NequiError
if (NequiError.isNequiError(error)) {
  console.error(error.name); // Error code name
  console.error(error.message); // Error message
  console.error(error.status); // HTTP status code
}
```

## Advanced Usage

### Custom Request Building

```typescript
import { buildRequestHeader, buildRequestMessage } from "@pulgueta/nequi-node";

const header = buildRequestHeader("PQR03-C001", "client-id", {
  ServiceName: "PaymentsService",
  ServiceOperation: "generateCodeQR",
  ServiceRegion: "C001",
  ServiceVersion: "1.2.0",
});
```

### Validation Utilities

```typescript
import { safeParse, isSuccessResponse } from "@pulgueta/nequi-node";
import { GenerateCodeQRRQSchema } from "@pulgueta/nequi-node";

const [error, validated] = safeParse(GenerateCodeQRRQSchema, {
  code: "NIT_1",
  value: "1000",
});

// Check response status
if (isSuccessResponse("0")) {
  // Success
}
```

## Support

For issues and questions, please visit the [GitHub repository](https://github.com/pulgueta/nequi-node/issues).
