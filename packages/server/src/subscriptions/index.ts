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
   */
  async automaticPayment(automaticPaymentRQ: unknown) {
    const validated = safeParse(AutomaticPaymentRQSchema, automaticPaymentRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { automaticPaymentRQ: validated.data },
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
   */
  async createSubscription(newSubscriptionRQ: unknown) {
    const validated = safeParse(NewSubscriptionRQSchema, newSubscriptionRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { newSubscriptionRQ: validated.data },
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
   */
  async getSubscription(getSubscriptionRQ: unknown) {
    const validated = safeParse(GetSubscriptionRQSchema, getSubscriptionRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { getSubscriptionRQ: validated.data },
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
   */
  async reverseTransaction(reversionRQ: unknown) {
    const validated = safeParse(
      ReverseSubscriptionTransactionRQSchema,
      reversionRQ,
    );

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { reversionRQ: validated.data },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.REVERSE_TRANSACTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
