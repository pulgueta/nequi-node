import type { Destination } from "@/schemas/common";

export const buildRequestHeader = (
  channel: string,
  clientId: string,
  destination: Destination,
) => ({
  Channel: channel,
  RequestDate: new Date().toISOString(),
  MessageID: crypto.randomUUID(),
  ClientID: clientId,
  Destination: destination,
});

export const buildRequestMessage = <T extends Record<string, unknown>>(
  channel: string,
  clientId: string,
  destination: Destination,
  requestBody: T,
) => ({
  RequestMessage: {
    RequestHeader: buildRequestHeader(channel, clientId, destination),
    RequestBody: {
      any: requestBody,
    },
  },
});
