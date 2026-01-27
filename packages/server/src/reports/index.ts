import type { Nequi } from "@/nequi";
import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type { GetReportsBody, GetReportsResponse } from "./types";

/**
 * @name Servicios de reportes
 * @description Servicio para consultar la información de las transacciones.
 */
export class Reports {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async getReports(getReportsRQ: GetReportsBody) {
    const req = await this.nequi.post<GetReportsResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.REPORTS.GET_REPORTS}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.REPORTS,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "ReportsService",
                ServiceOperation: "getReports",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                getReportsRQ,
              },
            },
          },
        }),
      }
    );

    return req;
  }
}
