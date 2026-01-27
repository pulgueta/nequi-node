import type { Nequi } from "@/nequi";
import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type {
  CreateDispersionBody,
  CreateDispersionResponse,
  ReverseDispersionBody,
  ReverseDispersionResponse,
} from "./types";

/**
 * @name Dispersiones
 * @description A través de este servicio puedes realizar los pagos que tu negocio necesite hacer, ya sea de nómina o proveedor, adicionalmente también podrás usarlo para tus procesos operativos, como reembolsos a tus clientes.
 
 * Este servicio aplica los pagos desde la cuenta Bancolombia de tu negocio, a la cuenta Nequi de tus empleados, proveedores o clientes.
 
 * Con el objetivo de que la integración funcione de manera correcta se debe realizar el consumo de todos los servicios. El servicio de dispersión permitirá el procesamiento de la dispersión y el servicio de reversos permitirá reversar las transacciones de dispersión que hayan quedado con el estado declinadas.
 */
export class Dispersions {
  readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async createDispersion(disperseFundsRQ: CreateDispersionBody) {
    const req = await this.nequi.post<CreateDispersionResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.DISPERSIONS.CREATE_DISPERSION}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.DISPERSIONS,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "DispersionService",
                ServiceOperation: "disperseFunds",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                disperseFundsRQ,
              },
            },
          },
        }),
      }
    );

    return req;
  }

  async reverseDispersion(reverseDispersionRQ: ReverseDispersionBody) {
    const req = await this.nequi.post<ReverseDispersionResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.DISPERSIONS.CANCEL_DISPERSION}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.DISPERSIONS,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "DispersionService",
                ServiceOperation: "reverseDispersion",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                reverseDispersionRQ,
              },
            },
          },
        }),
      }
    );

    return req;
  }
}
