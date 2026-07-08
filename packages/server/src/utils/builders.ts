import { randomBytes, randomUUID } from "node:crypto";

import type { Destination } from "@/schemas/common";

export type MessageIdFormat = "alphanumeric-10" | "numeric-16";

// Nequi constrains MessageID per API: most services expect a 10-char
// alphanumeric ID, while dispersions (and gift-code reversals) require a
// 16-digit numeric ID
export const generateMessageId = (
  format: MessageIdFormat = "alphanumeric-10",
) => {
  if (format === "numeric-16") {
    return Array.from(randomBytes(16), (byte) => byte % 10).join("");
  }

  return randomUUID().replace(/-/g, "").slice(0, 10);
};

export const buildRequestHeader = (
  channel: string,
  clientId: string,
  destination: Destination,
  messageIdFormat?: MessageIdFormat,
) => ({
  Channel: channel,
  RequestDate: new Date().toISOString(),
  MessageID: generateMessageId(messageIdFormat),
  ClientID: clientId,
  Destination: destination,
});

export const buildRequestMessage = <T extends Record<string, unknown>>(
  channel: string,
  clientId: string,
  destination: Destination,
  requestBody: T,
  messageIdFormat?: MessageIdFormat,
) => ({
  RequestMessage: {
    RequestHeader: buildRequestHeader(
      channel,
      clientId,
      destination,
      messageIdFormat,
    ),
    RequestBody: {
      any: requestBody,
    },
  },
});
