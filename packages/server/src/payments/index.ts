import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  CancelUnregisteredPaymentRQSchema,
  GetStatusPaymentRQSchema,
  RevertTransactionRQSchema,
  UnregisteredPaymentRQSchema,
} from "@/schemas/payments";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

/**
 * @name Pagos con notificación push
 * @description A través de este servicio puedes recibir el pago de tus clientes que tengan una cuenta Nequi, ya sea en tu página web o en tu aplicación.
 *
 * Este servicio envía una notificación a tu cliente al centro de notificaciones de la app Nequi, indicando la información del pago a realizar, dicha notificación podrá ser aceptada o cancelada por tu cliente. En caso de ser aceptada se debitará la cuenta del usuario Nequi y todo el dinero que recibas por tus ventas se enviará al siguiente día a tu cuenta Nequi o Bancolombia.
 */
export class PushPayment {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  /**
   * Create a new push payment request (unregistered payment)
   * @see PUSH-PAYMENTS.md for documentation
   */
  async createPayment(unregisteredPaymentRQ: unknown) {
    const validated = safeParse(
      UnregisteredPaymentRQSchema,
      unregisteredPaymentRQ,
    );

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { unregisteredPaymentRQ: validated.data },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.PAYMENT_PUSH.UNREGISTERED}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * Cancel an unregistered payment request
   * @see PUSH-PAYMENTS.md for documentation
   */
  async cancel(cancelUnregisteredPaymentRQ: unknown) {
    const validated = safeParse(
      CancelUnregisteredPaymentRQSchema,
      cancelUnregisteredPaymentRQ,
    );

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { cancelUnregisteredPaymentRQ: validated.data },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.PAYMENT_PUSH.CANCEL_UNREGISTERED}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * Get the status of a push payment
   * @see PUSH-PAYMENTS.md for documentation
   */
  async getStatus(getStatusPaymentRQ: unknown) {
    const validated = safeParse(GetStatusPaymentRQSchema, getStatusPaymentRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { getStatusPaymentRQ: validated.data },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.PAYMENT_PUSH.STATUS}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * Revert a push payment transaction
   * @see PUSH-PAYMENTS.md for documentation
   */
  async revertTransaction(reversionRQ: unknown) {
    const validated = safeParse(RevertTransactionRQSchema, reversionRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { reversionRQ: validated.data },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.PAYMENT_PUSH.REVERT}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
