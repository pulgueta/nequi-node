import { CHANNELS, ENDPOINTS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  type AutomaticPaymentResponse,
  AutomaticPaymentRQSchema,
  type CancelSubscriptionResponse,
  CancelSubscriptionRQSchema,
  type GetSubscriptionResponse,
  GetSubscriptionRQSchema,
  type NewSubscriptionResponse,
  NewSubscriptionRQSchema,
  type ReverseSubscriptionTransactionResponse,
  ReverseSubscriptionTransactionRQSchema,
} from "@/schemas/subscriptions";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

export class Subscription {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async automaticPayment(automaticPaymentRQ: unknown) {
    const [error, validated] = safeParse(
      AutomaticPaymentRQSchema,
      automaticPaymentRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.SUBSCRIPTION,
      this.clientId,
      {
        ServiceName: "SubscriptionPaymentService",
        ServiceOperation: "automaticPayment",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { automaticPaymentRQ: validated },
    );

    return this.nequi.post<AutomaticPaymentResponse>(
      `${this.nequi.basePath}${ENDPOINTS.SUBSCRIPTION.AUTOMATIC_PAYMENT}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async createSubscription(newSubscriptionRQ: unknown) {
    const [error, validated] = safeParse(
      NewSubscriptionRQSchema,
      newSubscriptionRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.SUBSCRIPTION,
      this.clientId,
      {
        ServiceName: "SubscriptionPaymentService",
        ServiceOperation: "newSubscription",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { newSubscriptionRQ: validated },
    );

    return this.nequi.post<NewSubscriptionResponse>(
      `${this.nequi.basePath}${ENDPOINTS.SUBSCRIPTION.CREATE_SUBSCRIPTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async getSubscription(getSubscriptionRQ: unknown) {
    const [error, validated] = safeParse(
      GetSubscriptionRQSchema,
      getSubscriptionRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.SUBSCRIPTION,
      this.clientId,
      {
        ServiceName: "SubscriptionPaymentService",
        // The official spec's request example shows the typo "getubscription"
        // and the response shows "Subscription"; the canonical spelling is used
        ServiceOperation: "getSubscription",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { getSubscriptionRQ: validated },
    );

    return this.nequi.post<GetSubscriptionResponse>(
      `${this.nequi.basePath}${ENDPOINTS.SUBSCRIPTION.GET_SUBSCRIPTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async cancelSubscription(cancelSubscriptionRQ: unknown) {
    const [error, validated] = safeParse(
      CancelSubscriptionRQSchema,
      cancelSubscriptionRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.SUBSCRIPTION,
      this.clientId,
      {
        ServiceName: "SubscriptionPaymentService",
        ServiceOperation: "cancelSubscription",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { cancelSubscriptionRQ: validated },
    );

    return this.nequi.post<CancelSubscriptionResponse>(
      `${this.nequi.basePath}${ENDPOINTS.SUBSCRIPTION.CANCEL_SUBSCRIPTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async reverseTransaction(reversionRQ: unknown) {
    const [error, validated] = safeParse(
      ReverseSubscriptionTransactionRQSchema,
      reversionRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.SUBSCRIPTION,
      this.clientId,
      {
        ServiceName: "ReverseServices",
        ServiceOperation: "reverseTransaction",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { reversionRQ: validated },
    );

    return this.nequi.post<ReverseSubscriptionTransactionResponse>(
      `${this.nequi.basePath}${ENDPOINTS.SUBSCRIPTION.REVERSE_TRANSACTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
