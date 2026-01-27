import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type { Nequi } from "@/nequi";
import { GetReportsRQSchema } from "@/schemas/reports";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

/**
 * @name Servicios de reportes
 * @description Servicio para consultar la información de las transacciones.
 */
export class Reports {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  /**
   * Get transaction reports for a commerce
   * @see REPORTS.md for documentation
   */
  async getReports(getReportsRQ: unknown) {
    const validated = safeParse(GetReportsRQSchema, getReportsRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
    }

    const body = buildRequestMessage(
      CHANNELS.REPORTS,
      this.clientId,
      {
        ServiceName: "ReportsService",
        ServiceOperation: "getReports",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { getReportsRQ: validated.data },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.REPORTS.GET_REPORTS}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
