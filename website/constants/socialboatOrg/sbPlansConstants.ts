import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { SbPlans } from "@models/SbPlans/interface";

export const oneMonthSBPlanID = "1d46cf40-170d-4fcb-8702-d8d4428a9e4a";
export const ThreeMonthSBPlanID = "8d680b40-f4e7-47eb-b839-69ab92cd532d";
export const oneYearSBPlanID = "434e213d-50aa-42d1-ad69-d36f3cc3f63b";
export const ThreeMonthSBProPlusPlanId = "381411ae-1c92-49f4-894d-dae9abd3fdfc";
export const oneYearSBProPlusPlanId = "3c898f1e-7fcd-405c-9016-11e093f04025";

export const SBoneYear_sbV3: SbPlans = {
  appSubId: "0cPvVrnphNJBnvvOM9Zf",
  cost: 9000,
  baseCost: 24000,
  usdBaseCost: 291.99,
  usdCost: 109.99,
  currency: "INR",
  duration: "Monthly",
  freeTrialDuration: 2,
  gameAcess: ["high_tier"],
  gameId: TEAM_ALPHABET_GAME,
  recommended: true,
  durationInDays: 365,
  descList: [
    "At INR 750 per month",
    "Everything in previous plan",
    "Free SocialBoat Merchandize.",
  ],
  id: oneYearSBPlanID,
  offerings: {
    nbDoctorConsultation: 4,
    nbDietConsultation: 48,
    nbLiveInteraction: 12,
    nbDailyVideoes: 365,
    nbPauseDays: 48,
    nbLiveClasses: 0,
  },
  benefits: {
    isAccountabilityCoach: true,
  },
};

export const SB3MonthPlus_sbV3: SbPlans = {
  appSubId: "0cPvVrnphNJBnvvOM9Zf",
  cost: 9000,
  baseCost: 12000,
  usdBaseCost: 149.99,
  usdCost: 109.99,
  currency: "INR",
  duration: "Monthly",
  freeTrialDuration: 0,
  gameAcess: ["high_tier"],
  gameId: TEAM_ALPHABET_GAME,
  recommended: true,
  durationInDays: 90,
  descList: [
    "At INR 750 per month",
    "Everything in previous plan",
    "Free SocialBoat Merchandize.",
  ],
  id: ThreeMonthSBProPlusPlanId,
  offerings: {
    nbDoctorConsultation: 1,
    nbDietConsultation: 12,
    nbLiveInteraction: 0,
    nbDailyVideoes: 90,
    nbPauseDays: 12,
    nbLiveClasses: 48,
  },
  benefits: {
    isAccountabilityCoach: true,
  },
};

export const SB1YearPlus_sbV3: SbPlans = {
  appSubId: "0cPvVrnphNJBnvvOM9Zf",
  cost: 20000,
  baseCost: 36000,
  usdBaseCost: 435.99,
  usdCost: 244.99,
  currency: "INR",
  duration: "Monthly",
  freeTrialDuration: 0,
  gameAcess: ["high_tier"],
  gameId: TEAM_ALPHABET_GAME,
  recommended: true,
  durationInDays: 90,
  descList: [
    "At INR 750 per month",
    "Everything in previous plan",
    "Free SocialBoat Merchandize.",
  ],
  id: oneYearSBProPlusPlanId,
  offerings: {
    nbDoctorConsultation: 4,
    nbDietConsultation: 48,
    nbLiveInteraction: 0,
    nbDailyVideoes: 365,
    nbPauseDays: 48,
    nbLiveClasses: 192,
  },
  benefits: {
    isAccountabilityCoach: true,
  },
};

export const fourThousandUpSB: SbPlans = {
  ...SBoneYear_sbV3,
  name: "9 Month Upgrade",
  cost: 4000,
  usdCost: 49.99,
  durationInDays: 9 * 30,
  id: oneYearSBPlanID,
};

export const fiveThousandUpSB: SbPlans = {
  ...SBoneYear_sbV3,
  name: "9 Month Upgrade",
  cost: 5000,
  usdCost: 62.99,
  durationInDays: 9 * 30,
  id: oneYearSBPlanID,
};

export const onlyYoga: SbPlans = {
  ...SBoneYear_sbV3,
  name: "9 Month Upgrade",
  cost: 3000,
  usdCost: 37,
  durationInDays: 9 * 30,
  id: oneYearSBPlanID,
};

export const twoThousandUpSB: SbPlans = {
  ...SBoneYear_sbV3,
  name: "3 Month Plan",
  cost: 2000,
  usdCost: 25.99,
  durationInDays: 3 * 30,
  id: ThreeMonthSBPlanID,
};

export const oneThousandUpSB: SbPlans = {
  ...SB3MonthPlus_sbV3,
  name: "2 Month Upgrade",
  cost: 1000,
  usdCost: 13.49,
  durationInDays: 2 * 30,
  id: ThreeMonthSBPlanID,
};

export const threeMonthPlan: SbPlans = {
  ...SB3MonthPlus_sbV3,
  name: "3 Month Plan",
  cost: 3000,
  usdCost: 37.0,
  durationInDays: 3 * 30,
  id: ThreeMonthSBPlanID,
};

export const fortyFiveHundredSB: SbPlans = {
  ...SBoneYear_sbV3,

  name: "9 Month Upgrade",
  cost: 4500,
  usdCost: 55.99,
  durationInDays: 9 * 30,
  id: oneYearSBPlanID,
};

// export const foundThousandSB: SbPlans = {
//   ...SBoneYear_sbV3,

//   name: "9 Month Upgrade",
//   cost: 4000,
//   usdCost: 50.0,
//   durationInDays: 9 * 30,
//   id: oneYearSBPlanID,
// };

export const fortyFiveHundredSBAnnual: SbPlans = {
  ...SBoneYear_sbV3,

  name: "12 Month Upgrade",
  cost: 4500,
  usdCost: 55.99,
  durationInDays: 12 * 30,
  id: oneYearSBPlanID,
};

export const sixThousandUpSB: SbPlans = {
  ...SBoneYear_sbV3,
  name: "11 Month Upgrade",
  cost: 6000,
  usdCost: 74,
  durationInDays: 11 * 30,
  id: oneYearSBPlanID,
};

export const sevenThousandUpSBPro: SbPlans = {
  ...SB3MonthPlus_sbV3,
  name: "2 Months Upgrade",
  cost: 7000,
  usdCost: 85,
  durationInDays: 2 * 30,
  id: oneYearSBPlanID,
};

export const sixThousandUpSBPlus: SbPlans = {
  ...SB3MonthPlus_sbV3,
  name: "4 Months Upgrade",
  cost: 6000,
  usdCost: 74,
  durationInDays: 4 * 30,
  id: SB3MonthPlus_sbV3.id,
};

export const seventyEightSBPlus: SbPlans = {
  ...SB3MonthPlus_sbV3,
  name: "9 Months Upgrade",
  cost: 7800,
  usdCost: 95,
  durationInDays: 9 * 30,
  id: SB1YearPlus_sbV3.id,
};
