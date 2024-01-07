import { currency } from "@modules/ProScreenMain/GetAccessMain/utils";

export interface AppSubscription {
  id: string;
  razorpayId: string;
  cost: number;
  currency: "INR";
  duration: "Monthly";
  freeTrialDuration?: number;
  moneyBackDuration?: number;
  gameAcess: gameAccessTypes[];
  name?: string;
  state: "ACTIVE";
  description?: string;
  gameId: string;

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
export type sbplansDuration = "Monthly" | "THREE_MONTH" | "ANNUAL";

export type PlanTypes = "pro" | "proPlus";

export interface SbPlans {
  id: string;
  razorpayId?: string;
  cost: number;
  currency: currency;
  usdCost: number;

  duration: sbplansDuration;
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
  pinned?: boolean;
  appSubId: string;
  priority?: number;
  inclusions?: planInclusionInterface;
  offerings?: planOfferings;
  benefits?: planBenefits;
  baseText?: string;
  mostPopular?: boolean;

  planType?: PlanTypes;
}

interface planInclusionInterface {
  nbDoctors?: number;
}
export interface planOfferings {
  nbDoctorConsultation?: number;
  nbDietConsultation?: number;
  nbLiveInteraction?: number;
  nbDailyVideoes?: number;
  nbPauseDays?: number;
  nbLiveClasses?: number;
}

export interface planBenefits {
  isWeeklyChallenges?: boolean;
  isPeriodTracker?: boolean;
  isRecipesAndDietTips?: boolean;
  isRewards?: boolean;
  isExpertBlogTips?: boolean;
  isSleepTracker?: boolean;
  isAmaSessions?: boolean;
  isAccountabilityCoach?: boolean;
}
