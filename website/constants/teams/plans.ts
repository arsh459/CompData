// import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
// import { AppSubscription } from "@models/AppSubscription/AppSubscription";

import { AppSubscription } from "@models/AppSubscription/AppSubscription";

export type PlanType = {
  companyCode: string;
  plansTitle: string;
  plans: AppSubscription[];
};

// const basePlan: AppSubscription = {
//   id: "0cPvVrnphNJBnvvOM9Zf",
//   cost: 0,
//   baseCost: 1000,

//   usdBaseCost: 12.5,
//   usdCost: 4,

//   currency: "INR",
//   duration: "Monthly",
//   freeTrialDuration: 0,
//   gameAcess: ["high_tier"],
//   gameId: TEAM_ALPHABET_GAME,
//   recommended: false,
//   durationInDays: 30,

//   descList: [
//     "Step tracking and free workout videos.",
//     "Access to SocialBoat shop to win rewards",
//     "24*7 health consultation",
//   ],
// };

// export const INR_99lan: AppSubscription = {
//   ...basePlan,
//   cost: 99,
// };

// export const INR_200Plan: AppSubscription = {
//   ...basePlan,
//   cost: 200,
// };

// export const INR_500Plan: AppSubscription = {
//   ...basePlan,
//   cost: 500,
// };

// export const INR_999Plan: AppSubscription = {
//   ...basePlan,
//   cost: 999,
// };

// export const freePlan: AppSubscription = {
//   ...basePlan,
//   cost: 0,
//   freeTrialDuration: 1,
// };
