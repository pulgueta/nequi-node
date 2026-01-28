# Nequi Node.js SDK

A community-driven TypeScript SDK for integrating with Nequi Conecta API in Node.js applications.

## Features

- ✅ **TypeScript Support** - Full type safety and IntelliSense
- ✅ **QR Code Payments** - Generate and manage QR code payments
- ✅ **Push Payments** - Send payment notifications to Nequi app users
- ✅ **Subscriptions** - Create and manage automatic subscription payments
- ✅ **Dispersions** - Send payments from your business account to Nequi accounts
- ✅ **Reports** - Retrieve transaction reports and analytics
- ✅ **Error Handling** - Comprehensive error handling with typed errors
- ✅ **Validation** - Built-in request validation using Zod schemas

## Installation

```bash
npm install @pulgueta/nequi-node
yarn add @pulgueta/nequi-node
pnpm add @pulgueta/nequi-node
bun add @pulgueta/nequi-node
```

## Quick Start

```typescript
import { Nequi } from "@pulgueta/nequi-node";

const nequi = new Nequi({
  apiKey: "your-api-key",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  env: "development", // or "production"
});

// Generate a QR code for payment
const [error, data] = await nequi.qr.createQR({
  code: "NIT_1",
  value: "1000",
  reference1: "Order #123",
});

if (error) {
  console.error("Error:", error.message);
  return;
}

console.log("QR Code:", data);
```

## Documentation

For detailed API documentation, see the [SDK Documentation](./packages/server/README.md).

## Requirements

- Node.js >= 24
- Bun >= 1.3.5

## Development

This is a monorepo managed with Bun workspaces.

```bash
# Install dependencies
bun install

# Build the SDK
bun run build:server

# Run linting
bun run lint

# Format code
bun run format

# Run CI checks
bun run ci
```

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Attribution

This SDK was originally developed by Andrés Rodríguez and is now accepting contributions from the community. Any official work or release based on this project must give appropriate credit and should not be claimed as work done solely by any entity, institution, or person.

## Links

- [GitHub Repository](https://github.com/pulgueta/nequi-node)
- [Issue Tracker](https://github.com/pulgueta/nequi-node/issues)
- [NPM Package](https://www.npmjs.com/package/@pulgueta/nequi-node)
