import { CHANNELS, ENDPOINTS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  CancelUnregisteredPaymentRQSchema,
  GetStatusPaymentRQSchema,
  RevertTransactionRQSchema,
  UnregisteredPaymentRQSchema,
} from "@/schemas/payments";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

export class PushPayment {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async createPayment(unregisteredPaymentRQ: unknown) {
    const [error, validated] = safeParse(
      UnregisteredPaymentRQSchema,
      unregisteredPaymentRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.PAYMENT_PUSH,
      this.clientId,
      {
        ServiceName: "PaymentsService",
        ServiceOperation: "unregisteredPayment",
        ServiceRegion: "C001",
        ServiceVersion: "1.2.0",
      },
      { unregisteredPaymentRQ: validated },
    );

    return this.nequi.post(
      `${this.nequi.basePath}${ENDPOINTS.PAYMENT_PUSH.UNREGISTERED}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async cancel(cancelUnregisteredPaymentRQ: unknown) {
    const [error, validated] = safeParse(
      CancelUnregisteredPaymentRQSchema,
      cancelUnregisteredPaymentRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.PAYMENT_PUSH,
      this.clientId,
      {
        ServiceName: "PaymentsService",
        ServiceOperation: "cancelUnregisteredPayment",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { cancelUnregisteredPaymentRQ: validated },
    );

    return this.nequi.post(
      `${this.nequi.basePath}${ENDPOINTS.PAYMENT_PUSH.CANCEL_UNREGISTERED}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async getStatus(getStatusPaymentRQ: unknown) {
    const [error, validated] = safeParse(
      GetStatusPaymentRQSchema,
      getStatusPaymentRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.PAYMENT_PUSH,
      this.clientId,
      {
        ServiceName: "PaymentsService",
        ServiceOperation: "getStatusPayment",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { getStatusPaymentRQ: validated },
    );

    return this.nequi.post(
      `${this.nequi.basePath}${ENDPOINTS.PAYMENT_PUSH.STATUS}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async revertTransaction(reversionRQ: unknown) {
    const [error, validated] = safeParse(
      RevertTransactionRQSchema,
      reversionRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.PAYMENT_PUSH,
      this.clientId,
      {
        ServiceName: "ReverseServices",
        ServiceOperation: "reverseTransaction",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { reversionRQ: validated },
    );

    return this.nequi.post(
      `${this.nequi.basePath}${ENDPOINTS.PAYMENT_PUSH.REVERT}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
