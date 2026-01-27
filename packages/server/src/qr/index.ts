import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  GenerateCodeQRRQSchema,
  GetQRStatusPaymentRQSchema,
  ReverseQRTransactionRQSchema,
} from "@/schemas/qr";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

/**
 * @name Pagos con QR code
 * @description Servicio para integrar APIs con comercios electrónicos y recibir pagos con Nequi a través de QR dinámicos.
 */
export class GenerateQR {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  /**
   * Generate a QR code for payment
   * @see QR-CODE-PAYMENTS.md for documentation
   * @returns Tuple [error, data] - always check error first
   */
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

  /**
   * Get the status of a QR payment
   * @param qrValue - The QR code string value returned from generateCodeQR
   * @see QR-CODE-PAYMENTS.md for documentation
   * @returns Tuple [error, data] - always check error first
   */
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

    return this.nequi.post(`${URLS.BASE_PATH}${ENDPOINTS.QR.STATUS}`, {
      body: JSON.stringify(body),
    });
  }

  /**
   * Reverse a QR payment transaction
   * @see QR-CODE-PAYMENTS.md for documentation
   * @returns Tuple [error, data] - always check error first
   */
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

    return this.nequi.post(`${URLS.BASE_PATH}${ENDPOINTS.QR.REVERT}`, {
      body: JSON.stringify(body),
    });
  }
}
