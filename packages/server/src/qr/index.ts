import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import { Nequi } from "@/nequi";
import type { CreateQRBody, CreateQRResponse, GetStatusQRResponse, RevertQRBody, RevertQRResponse } from "./types";

/**
 * @name Pagos con QR code
 * @description Servicio para integrar APIs con comercios electrónicos y recibir pagos con Nequi a través de QR dinámicos.
 */
export class GenerateQR {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async createQR(generateCodeQRRQ: CreateQRBody) {
    const req = await this.nequi.post<CreateQRResponse>(`${URLS.BASE_PATH}${ENDPOINTS.QR.GENERATE}`, {
      body: JSON.stringify({
        RequestMessage: {
          RequestHeader: {
            Channel: CHANNELS.QR,
            RequestDate: new Date().toISOString(),
            MessageID: "1234567890",
            ClientID: this.clientId,
            Destination: {
              ServiceName: "PaymentsService",
              ServiceOperation: "generateCodeQR",
              ServiceRegion: "C001",
              ServiceVersion: "1.2.0",
            },
          },
          RequestBody: {
            any: {
              generateCodeQRRQ,
            },
          },
        },
      }),
    });

    return req;
  }

  async getStatus(codeQR: string) {
    const req = await this.nequi.post<GetStatusQRResponse>(`${URLS.BASE_PATH}${ENDPOINTS.QR.STATUS}`, {
      body: JSON.stringify({
        RequestMessage: {
          RequestHeader: {
            Channel: CHANNELS.QR,
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
              getStatusPaymentRQ: {
                codeQR,
              },
            },
          },
        },
      }),
    });

    return req;
  }

  async revert(reversionRQ: RevertQRBody) {
    const req = await this.nequi.post<RevertQRResponse>(`${URLS.BASE_PATH}${ENDPOINTS.QR.REVERT}`, {
      body: JSON.stringify({
        RequestMessage: {
          RequestHeader: {
            Channel: CHANNELS.QR,
            RequestDate: new Date().toISOString(),
            MessageID: "1234567890",
            ClientID: this.clientId,
            Destination: {
              ServiceName: "reverseServices",
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
    });

    return req;
  }
}
