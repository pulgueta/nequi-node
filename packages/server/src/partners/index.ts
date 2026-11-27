import { CHANNELS, ENDPOINTS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  type ValidatePartnerResponse,
  ValidatePartnerRQSchema,
} from "@/schemas/partners";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

export class Partners {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async validatePartner(validatePartnerRQ: unknown) {
    const [error, validated] = safeParse(
      ValidatePartnerRQSchema,
      validatePartnerRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.PARTNERS,
      this.clientId,
      {
        ServiceName: "PartnersService",
        ServiceOperation: "validatePartner",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { validatePartnerRQ: validated },
    );

    return this.nequi.post<ValidatePartnerResponse>(
      `${this.nequi.basePath}${ENDPOINTS.PARTNERS.VALIDATE}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
