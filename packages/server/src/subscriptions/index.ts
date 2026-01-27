import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  AutomaticPaymentRQSchema,
  GetSubscriptionRQSchema,
  NewSubscriptionRQSchema,
  ReverseSubscriptionTransactionRQSchema,
} from "@/schemas/subscriptions";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

/**
 * @name Suscripciones
 * @description Servicio para suscribirse y realizar el pago de la suscripcion siendo cliente Nequi.
 */
export class Subscription {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  /**
   * Process an automatic subscription payment
   * @see SUBSCRIPTIONS.md for documentation
   * @returns Tuple [error, data] - always check error first
   */
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

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.AUTOMATIC_PAYMENT}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * Create a new subscription
   * @see SUBSCRIPTIONS.md for documentation
   * @returns Tuple [error, data] - always check error first
   */
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

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.CREATE_SUBSCRIPTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * Get subscription details
   * @see SUBSCRIPTIONS.md for documentation
   * @returns Tuple [error, data] - always check error first
   */
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
        ServiceOperation: "getSubscription",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { getSubscriptionRQ: validated },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.GET_SUBSCRIPTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * Reverse a subscription payment transaction
   * @see SUBSCRIPTIONS.md for documentation
   * @returns Tuple [error, data] - always check error first
   */
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

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.REVERSE_TRANSACTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
