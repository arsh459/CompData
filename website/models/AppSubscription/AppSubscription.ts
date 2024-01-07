export interface AppSubscription {
  id: string;
  razorpayId?: string;
  cost: number;
  currency: "INR";
  usdCost: number;

  duration: "Monthly";
  freeTrialDuration?: number;
  moneyBackDuration?: number;
  gameAcess?: gameAccessTypes[];
  name?: string;
  description?: string;
  gameId?: string;
  recommended?: boolean;
  durationInDays?: number;
  descList: string[];
  baseCost?: number;
  usdBaseCost: number;

  sbPlanId: string;
}

export interface UserAppSubscription {
  freeTrialStartedOn: number; // number
  freeTrialEndsOn: number; // number

  paidPeriodEndsOn?: number;
  uid: string;

  numPayments: number;
  // last paid values
  lastPaidUnix?: number;
  lastPlanName?: string;
  lastPaidValue?: number;
  lastPaidCurrency?: "INR" | "USD";
}

export type gameAccessTypes = "low_tier" | "mid_tier" | "high_tier";
