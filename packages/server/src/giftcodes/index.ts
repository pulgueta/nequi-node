import { CHANNELS, ENDPOINTS } from "@/constants";
import type { Nequi } from "@/nequi";
import {
  type GenerateGiftCodeResponse,
  GenerateGiftCodeRQSchema,
} from "@/schemas/giftcodes";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

// Códigos Plata (gift codes). The official doc's Destination examples contain
// placeholder values ("ExampleService"/"test"); the values below are derived
// from the endpoint path segments, following the convention of every other
// Nequi service
export class GiftCodes {
  private readonly clientId: string;

  constructor(private readonly nequi: Nequi) {
    this.clientId = nequi.getClientId();
  }

  async generateCode(generateGiftCodeRQ: unknown) {
    const [error, validated] = safeParse(
      GenerateGiftCodeRQSchema,
      generateGiftCodeRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.GIFT_CODES,
      this.clientId,
      {
        ServiceName: "GiftCodeServices",
        ServiceOperation: "generateCode",
        ServiceRegion: "C001",
        ServiceVersion: "1.0.0",
      },
      { generateGiftCodeRQ: validated },
    );

    return this.nequi.post<GenerateGiftCodeResponse>(
      `${this.nequi.basePath}${ENDPOINTS.GIFT_CODES.GENERATE_CODE}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
