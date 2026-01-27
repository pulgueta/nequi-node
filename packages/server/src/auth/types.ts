export type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type Auth = {
  token: string;
  tokenType: string;
  expiresAt: Date;
  isValid: boolean;
};
