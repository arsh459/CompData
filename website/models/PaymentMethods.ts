export type paymentMethods = "GPay" | "Cards" | "PayTM";

export type paymentMethodType = "subscription" | "payPerView" | "preLaunch";

export interface SubscriptionPlan {
  amount: number;
  currency: string;
  sessions: number;
  duration: number;
  freeSessions?: number;
  freePeriod?: number;

  name: string;
}

export interface payPerViewPlan {
  amount: number;
  currency: string;
  name: string;
}
