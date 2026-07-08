import { CHANNELS, ENDPOINTS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  type DisperseFundsResponse,
  DisperseFundsRQSchema,
  type ReverseDispersionResponse,
  ReverseDispersionRQSchema,
} from "@/schemas/dispersions";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

export class Dispersions {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async createDispersion(disperseFundsRQ: unknown) {
    const [error, validated] = safeParse(
      DisperseFundsRQSchema,
      disperseFundsRQ,
    );

    if (error) {
      return [error, null] as const;
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
      { disperseFundsRQ: validated },
      // Dispersions require a 16-digit numeric MessageID
      "numeric-16",
    );

    return this.nequi.post<DisperseFundsResponse>(
      `${this.nequi.basePath}${ENDPOINTS.DISPERSIONS.CREATE_DISPERSION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async reverseDispersion(reverseDispersionRQ: unknown) {
    const [error, validated] = safeParse(
      ReverseDispersionRQSchema,
      reverseDispersionRQ,
    );

    if (error) {
      return [error, null] as const;
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
      { reverseDispersionRQ: validated },
      "numeric-16",
    );

    return this.nequi.post<ReverseDispersionResponse>(
      `${this.nequi.basePath}${ENDPOINTS.DISPERSIONS.CANCEL_DISPERSION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
