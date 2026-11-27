import { CHANNELS, ENDPOINTS } from "@/constants";
import { NequiError } from "@/error";
import type { Nequi } from "@/nequi";
import {
  type CashInResponse,
  CashInRQSchema,
  type CashOutConsultResponse,
  CashOutConsultRQSchema,
  type CashOutResponse,
  CashOutRQSchema,
  type GetPublicKeyResponse,
  type ReverseCashTransactionResponse,
  ReverseCashTransactionRQSchema,
  type ValidateClientResponse,
  ValidateClientRQSchema,
} from "@/schemas/cashinout";
import type { Destination } from "@/schemas/common";
import { buildRequestMessage } from "@/utils/builders";
import { safeParse } from "@/utils/validation";

// The spec gives Channel "PTM01-C001" and one Destination example
// ("CashInService"/"cashIn", region "C001", version "1.0.0"). It gives no
// Destination for the other operations. Their ServiceName and
// ServiceOperation are inferred from the endpoint path segments, the same
// convention as the other Nequi services
const destination = (
  ServiceName: string,
  ServiceOperation: string,
): Destination => ({
  ServiceName,
  ServiceOperation,
  ServiceRegion: "C001",
  ServiceVersion: "1.0.0",
});

// Cash-In/Out (CN Transactions). This service uses a different host from the
// other services. Nequi has not published the production host yet, so every
// method returns an error when env is "production"
export class CashInOut {
  private readonly clientId: string;

  constructor(
    private readonly nequi: Nequi,
    private readonly basePath: string | null,
  ) {
    this.clientId = nequi.getClientId();
  }

  private hostError() {
    if (this.basePath) {
      return null;
    }

    return NequiError.from({
      name: "invalid_parameter",
      message:
        '[Nequi SDK]: Cash-In/Out is not available when env is "production". Nequi has not published the production host yet. Use env "development".',
      status: 422,
    });
  }

  async validateClient(validateClientRQ: unknown) {
    const hostError = this.hostError();

    if (hostError) {
      return [hostError, null] as const;
    }

    const [error, validated] = safeParse(
      ValidateClientRQSchema,
      validateClientRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.CASH_IN_OUT,
      this.clientId,
      // Inferred from the path "-services-clientservice-validateclient"
      destination("ClientService", "validateClient"),
      { validateClientRQ: validated },
    );

    return this.nequi.post<ValidateClientResponse>(
      `${this.basePath}${ENDPOINTS.CASH_IN_OUT.VALIDATE_CLIENT}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async cashIn(cashInRQ: unknown) {
    const hostError = this.hostError();

    if (hostError) {
      return [hostError, null] as const;
    }

    const [error, validated] = safeParse(CashInRQSchema, cashInRQ);

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.CASH_IN_OUT,
      this.clientId,
      // From the spec Destination example
      destination("CashInService", "cashIn"),
      { cashInRQ: validated },
    );

    return this.nequi.post<CashInResponse>(
      `${this.basePath}${ENDPOINTS.CASH_IN_OUT.CASH_IN}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async consultCashOut(cashOutConsultRQ: unknown) {
    const hostError = this.hostError();

    if (hostError) {
      return [hostError, null] as const;
    }

    const [error, validated] = safeParse(
      CashOutConsultRQSchema,
      cashOutConsultRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.CASH_IN_OUT,
      this.clientId,
      // Inferred from the path "-services-cashoutservice-cashoutconsult"
      destination("CashOutService", "cashOutConsult"),
      { cashOutConsultRQ: validated },
    );

    return this.nequi.post<CashOutConsultResponse>(
      `${this.basePath}${ENDPOINTS.CASH_IN_OUT.CASH_OUT_CONSULT}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  async cashOut(cashOutRQ: unknown) {
    const hostError = this.hostError();

    if (hostError) {
      return [hostError, null] as const;
    }

    const [error, validated] = safeParse(CashOutRQSchema, cashOutRQ);

    if (error) {
      return [error, null] as const;
    }

    const { RequestMessage } = buildRequestMessage(
      CHANNELS.CASH_IN_OUT,
      this.clientId,
      // Inferred from the path "-services-cashoutservice-cashout"
      destination("CashOutService", "cashOut"),
      { cashOutRQ: validated },
    );

    // The spec for this operation uses camelCase envelope keys
    // (requestMessage, requestHeader, requestBody), unlike the other services
    const body = {
      requestMessage: {
        requestHeader: RequestMessage.RequestHeader,
        requestBody: RequestMessage.RequestBody,
      },
    };

    return this.nequi.post<CashOutResponse>(
      `${this.basePath}${ENDPOINTS.CASH_IN_OUT.CASH_OUT}`,
      {
        body: JSON.stringify(body),
      },
    );
  }

  /** Returns the RSA public key (PEM) to encrypt the `cashOut` token. */
  async getPublicKey() {
    const hostError = this.hostError();

    if (hostError) {
      return [hostError, null] as const;
    }

    // The spec defines no request body for this operation
    return this.nequi.post<GetPublicKeyResponse>(
      `${this.basePath}${ENDPOINTS.CASH_IN_OUT.GET_PUBLIC_KEY}`,
      {},
    );
  }

  async reverseTransaction(reversionRQ: unknown) {
    const hostError = this.hostError();

    if (hostError) {
      return [hostError, null] as const;
    }

    const [error, validated] = safeParse(
      ReverseCashTransactionRQSchema,
      reversionRQ,
    );

    if (error) {
      return [error, null] as const;
    }

    const body = buildRequestMessage(
      CHANNELS.CASH_IN_OUT,
      this.clientId,
      // Inferred from the path "-services-reverseservices-reversetransaction"
      // and the same operation in the payments and subscriptions services
      destination("ReverseServices", "reverseTransaction"),
      { reversionRQ: validated },
    );

    return this.nequi.post<ReverseCashTransactionResponse>(
      `${this.basePath}${ENDPOINTS.CASH_IN_OUT.REVERSE_TRANSACTION}`,
      {
        body: JSON.stringify(body),
      },
    );
  }
}
