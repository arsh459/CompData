export type PowerUpVariantsType = "freeze";
export type powerUpStatusType = "available" | "used" | "expired";

export interface PowerUpInterface {
    id: string;
    purchasedOn: number;
    status: powerUpStatusType;
    fpSpent: number;
    type: PowerUpVariantsType;
    usedOn?: number;
  }