import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  DisperseFundsRQSchema,
  ReverseDispersionRQSchema,
} from "@/schemas/dispersions";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

/**
 * @name Dispersiones
 * @description A través de este servicio puedes realizar los pagos que tu negocio necesite hacer, ya sea de nómina o proveedor, adicionalmente también podrás usarlo para tus procesos operativos, como reembolsos a tus clientes.
 *
 * Este servicio aplica los pagos desde la cuenta Bancolombia de tu negocio, a la cuenta Nequi de tus empleados, proveedores o clientes.
 *
 * Con el objetivo de que la integración funcione de manera correcta se debe realizar el consumo de todos los servicios. El servicio de dispersión permitirá el procesamiento de la dispersión y el servicio de reversos permitirá reversar las transacciones de dispersión que hayan quedado con el estado declinadas.
 */
export class Dispersions {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  /**
   * Disperse funds to a Nequi account
   * @see DISPERTIONS.md for documentation
   */
  async createDispersion(disperseFundsRQ: unknown) {
    const validated = safeParse(DisperseFundsRQSchema, disperseFundsRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
    }

    const body = buildRequestMessage(
      CHANNELS.DISPERSIONS,
      this.clientId,
      {
        ServiceName: "DispersionService",
        ServiceOperation: "disperseFunds",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { disperseFundsRQ: validated.data },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.DISPERSIONS.CREATE_DISPERSION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * Reverse a dispersion transaction
   * @see DISPERTIONS.md for documentation
   */
  async reverseDispersion(reverseDispersionRQ: unknown) {
    const validated = safeParse(ReverseDispersionRQSchema, reverseDispersionRQ);

    if (!validated.success) {
      return { data: null, error: validated.error };
    }

    const body = buildRequestMessage(
      CHANNELS.DISPERSIONS,
      this.clientId,
      {
        ServiceName: "DispersionService",
        ServiceOperation: "reverseDispersion",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { reverseDispersionRQ: validated.data },
    );

    return this.nequi.post(
      `${URLS.BASE_PATH}${ENDPOINTS.DISPERSIONS.CANCEL_DISPERSION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
