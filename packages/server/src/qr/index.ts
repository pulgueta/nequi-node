import { CHANNELS, ENDPOINTS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  GenerateCodeQRRQSchema,
  GetQRStatusPaymentRQSchema,
  ReverseQRTransactionRQSchema,
} from "@/schemas/qr";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

export class GenerateQR {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async createQR(generateCodeQRRQ: unknown) {
    const [error, validated] = safeParse(
      GenerateCodeQRRQSchema,
      generateCodeQRRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.QR,
      this.clientId,
      {
        ServiceName: "PaymentsService",
        ServiceOperation: "generateCodeQR",
        ServiceRegion: "C001",
        ServiceVersion: "1.2.0",
      },
      { generateCodeQRRQ: validated },
    );

    return this.nequi.post(`${URLS.BASE_PATH}${ENDPOINTS.QR.GENERATE}`, {
      body: JSON.stringify(body),
    });
  }

  async getStatus(qrValue: unknown) {
    const [error, validated] = safeParse(GetQRStatusPaymentRQSchema, {
      qrValue,
    });

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.QR,
      this.clientId,
      {
        ServiceName: "PaymentsService",
        ServiceOperation: "getStatusPayment",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { getStatusPaymentRQ: validated },
    );

    return this.nequi.post(`${this.nequi.basePath}${ENDPOINTS.QR.STATUS}`, {
      body: JSON.stringify(body),
    });
  }

  async revert(reversionRQ: unknown) {
    const [error, validated] = safeParse(
      ReverseQRTransactionRQSchema,
      reversionRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.QR,
      this.clientId,
      {
        ServiceName: "reverseServices",
        ServiceOperation: "reverseTransaction",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { reversionRQ: validated },
    );

    return this.nequi.post(`${this.nequi.basePath}${ENDPOINTS.QR.REVERT}`, {
      body: JSON.stringify(body),
    });
  }
}
