import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type { Nequi } from "@/nequi";
import { GetReportsRQSchema } from "@/schemas/reports";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

export class Reports {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async getReports(getReportsRQ: unknown) {
    const [error, validated] = safeParse(GetReportsRQSchema, getReportsRQ);

    if (error) {
      return [error, null] as const;
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
      { getReportsRQ: validated },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.REPORTS.GET_REPORTS}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
