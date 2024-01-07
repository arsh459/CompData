import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { PlanType } from "@constants/teams/plans";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";

export const oneMonthSBPlanID = "1d46cf40-170d-4fcb-8702-d8d4428a9e4a";
export const ThreeMonthSBPlanID = "8d680b40-f4e7-47eb-b839-69ab92cd532d";
export const oneYearSBPlanID = "434e213d-50aa-42d1-ad69-d36f3cc3f63b";

// export const freePlan: AppSubscription = {
//   id: "0cPvVrnphNJBnvvOM9Zf",
//   cost: 0,
//   usdCost: 0,
//   usdBaseCost: 0,
//   currency: "INR",
//   duration: "Monthly",
//   freeTrialDuration: 2,
//   gameAcess: ["high_tier"],
//   gameId: TEAM_ALPHABET_GAME,
//   recommended: false,
//   durationInDays: 2,
//   descList: [
//     "A self paced plan and access to app",
//     "Fitness tracking and community access",
//     "Ask questions in the open community",
//   ],
// };

// export const oneMonth: AppSubscription = {
//   id: "0cPvVrnphNJBnvvOM9Zf",
//   cost: 300,
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
//     "67% Discount on Monthly Pricing with all benefits of previous plan",
//     "Get a SocialBoat Gym Tee shirt",
//     "Rewards worth INR 10,000 every month",
//   ],
// };

// export const sixMonth: AppSubscription = {
//   id: "0cPvVrnphNJBnvvOM9Zf",
//   cost: 750,
//   baseCost: 2000,
//   usdBaseCost: 25,
//   usdCost: 10,

//   currency: "INR",
//   duration: "Monthly",
//   freeTrialDuration: 0,
//   gameAcess: ["high_tier"],
//   gameId: TEAM_ALPHABET_GAME,
//   recommended: false,
//   durationInDays: 180,
//   descList: [
//     "50% Discounts on Monthly Pricing with all benefits of the monthly plan",
//     "Get 1 consultation Call with our experts every month",
//     "Rewards worth INR 10,000 every month",
//   ],
// };

// export const oneYear: AppSubscription = {
//   id: "0cPvVrnphNJBnvvOM9Zf",
//   cost: 1000,
//   baseCost: 3000,
//   usdBaseCost: 39.99,
//   usdCost: 12.5,

//   currency: "INR",
//   duration: "Monthly",
//   freeTrialDuration: 2,
//   gameAcess: ["high_tier"],
//   gameId: TEAM_ALPHABET_GAME,
//   recommended: true,
//   durationInDays: 365,
//   descList: [
//     "Multiple workouts styles to choose from",
//     "Free Nutrition Plan basis your goal",
//     "Rewards worth INR 10,000 every month",
//   ],
// };

// export const oneMonth_sb: AppSubscription = {
//   id: "0cPvVrnphNJBnvvOM9Zf",
//   cost: 500,
//   baseCost: 2000,
//   usdBaseCost: 25,
//   usdCost: 6.5,

//   currency: "INR",
//   duration: "Monthly",
//   freeTrialDuration: 0,
//   gameAcess: ["high_tier"],
//   gameId: TEAM_ALPHABET_GAME,
//   recommended: false,
//   durationInDays: 30,

//   descList: [
//     "Get a personalized workout plan",
//     "Get a personalized diet plan",
//     "Rewards worth INR 10,000 every month",
//   ],
// };

// export const sixMonth_sb: AppSubscription = {
//   id: "0cPvVrnphNJBnvvOM9Zf",
//   cost: 2000,
//   baseCost: 3000,
//   usdBaseCost: 39.9,
//   usdCost: 24.99,
//   currency: "INR",
//   duration: "Monthly",
//   freeTrialDuration: 0,
//   gameAcess: ["high_tier"],
//   gameId: TEAM_ALPHABET_GAME,
//   recommended: false,
//   durationInDays: 180,
//   descList: [
//     "At INR 333 per month",
//     "Everything in previous plan",
//     "Weekly Free Consultation Calls",
//   ],
// };

// export const oneYear_sb: AppSubscription = {
//   id: "0cPvVrnphNJBnvvOM9Zf",
//   cost: 3000,
//   baseCost: 5000,
//   usdBaseCost: 61.99,
//   usdCost: 39.99,
//   currency: "INR",
//   duration: "Monthly",
//   freeTrialDuration: 2,
//   gameAcess: ["high_tier"],
//   gameId: TEAM_ALPHABET_GAME,
//   recommended: true,
//   durationInDays: 365,
//   descList: [
//     "At INR 250 per month",
//     "Everything in previous plan",
//     "Free SocialBoat Merchandize.",
//   ],
// };

export const oneMonth_sbV3: AppSubscription = {
  id: "0cPvVrnphNJBnvvOM9Zf",
  cost: 3000,
  baseCost: 3000,
  usdBaseCost: 36.99,
  usdCost: 36.99,

  currency: "INR",
  duration: "Monthly",
  freeTrialDuration: 0,
  gameAcess: ["high_tier"],
  gameId: TEAM_ALPHABET_GAME,
  recommended: false,
  durationInDays: 30,

  descList: [
    "Get a personalized workout plan",
    "Get a personalized diet plan",
    "Rewards worth INR 10,000 every month",
  ],
  sbPlanId: oneMonthSBPlanID,
};

export const sixMonth_sbV3: AppSubscription = {
  id: "0cPvVrnphNJBnvvOM9Zf",
  cost: 5000,
  baseCost: 6000,
  usdBaseCost: 72.9,
  usdCost: 59.99,
  currency: "INR",
  duration: "Monthly",
  freeTrialDuration: 0,
  gameAcess: ["high_tier"],
  gameId: TEAM_ALPHABET_GAME,
  recommended: true,
  durationInDays: 90,
  descList: [
    "At INR 1666 per month",
    "Everything in previous plan",
    "Weekly Free Consultation Calls",
  ],
  sbPlanId: ThreeMonthSBPlanID,
};

export const oneYear_sbV3: AppSubscription = {
  id: "0cPvVrnphNJBnvvOM9Zf",
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
  sbPlanId: oneYearSBPlanID,
};

export const fiftyHundredUp: AppSubscription = {
  ...oneYear_sbV3,
  cost: 5500,
  usdCost: 68,
  durationInDays: 12 * 30,
  sbPlanId: oneYearSBPlanID,
};

export const sixThousandUp: AppSubscription = {
  ...oneYear_sbV3,
  cost: 6000,
  usdCost: 74,
  durationInDays: 9 * 30,
  sbPlanId: oneYearSBPlanID,
};

// export const thirtyFiveHundredUp: AppSubscription = {
//   ...oneYear_sbV3,
//   cost: 3500,
//   usdCost: 44,
//   durationInDays: 9 * 30,
// };

export const fourThousandUp: AppSubscription = {
  ...oneYear_sbV3,
  cost: 4000,
  usdCost: 49.99,
  durationInDays: 9 * 30,
  sbPlanId: ThreeMonthSBPlanID,
};

export const fortyFiveHundred: AppSubscription = {
  ...oneYear_sbV3,
  cost: 4500,
  usdCost: 55.99,
  durationInDays: 4 * 30,
  sbPlanId: ThreeMonthSBPlanID,
};

// export const sixThousandUp: AppSubscription = {
//   ...oneYear_sbV3,
//   cost: 4500,
//   usdCost: 55.99,
//   durationInDays: 4 * 30,
//   sbPlanId: ThreeMonthSBPlanID,
// };

// export const fourThousand: AppSubscription = {
//   ...oneYear_sbV3,
//   cost: 4000,
//   usdCost: 49.99,
//   durationInDays: 9 * 30,
// };

// export const mothersDay: AppSubscription = {
//   ...oneYear_sbV3,
//   cost: 6750,
//   usdCost: 84,
//   durationInDays: 12 * 30,
// };

// export const twentyOffAnual: AppSubscription = {
//   ...oneYear_sbV3,
//   cost: 7250,
//   usdCost: 88,
//   durationInDays: 12 * 30,
// };

export const specialInvite: AppSubscription = {
  ...oneMonth_sbV3,
  cost: 0,
  usdCost: 0,
  durationInDays: 30,
};

// export const twoThousandUp: AppSubscription = {
//   ...oneYear_sbV3,
//   cost: 2000,
//   usdCost: 25,
//   durationInDays: 2 * 30,
// };

export const appPlans: AppSubscription[] = [
  // freePlan,
  // oneMonth_sb,
  // sixMonth_sb,
  // oneYear_sb,
];

export const appPlansV3: AppSubscription[] = [
  // freePlan,
  oneMonth_sbV3,
  sixMonth_sbV3,
  oneYear_sbV3,
];

export const socialboat: PlanType = {
  companyCode: "SocialBoat",
  plansTitle: "SocialBoat Subscriptions Plans",
  plans: appPlans,
};

export const socialboatV3: PlanType = {
  companyCode: "SocialBoat",
  plansTitle: "SocialBoat Subscriptions Plans",
  plans: appPlansV3,
};
