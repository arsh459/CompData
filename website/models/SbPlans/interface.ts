import { gameAccessTypes } from "@models/AppSubscription/AppSubscription";
import { currency } from "@templates/PaymentTemplate/SelectPlan";
export type sbplansDuration = "Monthly" | "THREE_MONTH" | "ANNUAL";
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

export type PlanTypes = "pro" | "proPlus";

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

export type planOfferingKeys =
  | "nbDoctorConsultation"
  | "nbDietConsultation"
  | "nbLiveInteraction"
  | "nbDailyVideoes"
  | "nbPauseDays"
  | "nbLiveClasses"
  | "isAccountabilityCoach";

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
