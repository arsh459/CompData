export interface googleToken {
  access_token?: string | null;
  refresh_token?: string | null;
  scope?: string | string[] | null;
  token_type?: string | null;
  expiry_date?: number | null;
}

export interface fitnessToken extends googleToken {
  uid: string;
  creatorId: string;
  creationTime: number;
}
