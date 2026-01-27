import type { Nequi } from "@/nequi";
import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type {
  CancelUnregisteredPaymentBody,
  CancelUnregisteredPaymentResponse,
  CreatePaymentPushBody,
  CreatePaymentPushResponse,
  GetStatusPaymentBody,
  GetStatusPaymentResponse,
  RevertTransactionBody,
  RevertTransactionResponse,
} from "./types";

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

  async createPayment(unregisteredPaymentRQ: CreatePaymentPushBody) {
    const req = await this.nequi.post<CreatePaymentPushResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.PAYMENT_PUSH.UNREGISTERED}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.PAYMENT_PUSH,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "PaymentsService",
                ServiceOperation: "unregisteredPayment",
                ServiceRegion: "C001",
                ServiceVersion: "1.2.0",
              },
            },
            RequestBody: {
              any: {
                unregisteredPaymentRQ,
              },
            },
          },
        }),
      }
    );

    return req;
  }

  async cancel(cancelUnregisteredPaymentRQ: CancelUnregisteredPaymentBody) {
    const req = await this.nequi.post<CancelUnregisteredPaymentResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.PAYMENT_PUSH.CANCEL_UNREGISTERED}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.PAYMENT_PUSH,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "PaymentsService",
                ServiceOperation: "cancelUnregisteredPayment",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                cancelUnregisteredPaymentRQ,
              },
            },
          },
        }),
      }
    );

    return req;
  }

  async getStatus(getStatusPaymentRQ: GetStatusPaymentBody) {
    const req = await this.nequi.post<GetStatusPaymentResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.PAYMENT_PUSH.STATUS}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.PAYMENT_PUSH,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "PaymentsService",
                ServiceOperation: "getStatusPayment",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                getStatusPaymentRQ,
              },
            },
          },
        }),
      }
    );

    return req;
  }

  async revertTransaction(reversionRQ: RevertTransactionBody) {
    const req = await this.nequi.post<RevertTransactionResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.PAYMENT_PUSH.REVERT}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: "PNP04-C001",
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "ReverseServices",
                ServiceOperation: "reverseTransaction",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                reversionRQ,
              },
            },
          },
        }),
      }
    );

    return req;
  }
}
