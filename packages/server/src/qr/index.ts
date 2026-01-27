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
   * @see PUSH-PAYMENTS.md for documentation
   */
  async createQR(generateCodeQRRQ: unknown) {
    const validated = safeParse(GenerateCodeQRRQSchema, generateCodeQRRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { generateCodeQRRQ: validated.data },
    );

    return this.nequi.post(`${URLS.BASE_PATH}${ENDPOINTS.QR.GENERATE}`, {
      body: JSON.stringify(body),
    });
  }

  /**
   * Get the status of a QR payment
   * @param qrValue - The QR code string value returned from generateCodeQR
   * @see QR-CODE-PAYMENTS.md for documentation
   */
  async getStatus(qrValue: unknown) {
    const validated = safeParse(GetQRStatusPaymentRQSchema, { qrValue });

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { getStatusPaymentRQ: validated.data },
    );

    return this.nequi.post(`${URLS.BASE_PATH}${ENDPOINTS.QR.STATUS}`, {
      body: JSON.stringify(body),
    });
  }

  /**
   * Reverse a QR payment transaction
   * @see QR-CODE-PAYMENTS.md for documentation
   */
  async revert(reversionRQ: unknown) {
    const validated = safeParse(ReverseQRTransactionRQSchema, reversionRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
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
      { reversionRQ: validated.data },
    );

    return this.nequi.post(`${URLS.BASE_PATH}${ENDPOINTS.QR.REVERT}`, {
      body: JSON.stringify(body),
    });
  }
}
