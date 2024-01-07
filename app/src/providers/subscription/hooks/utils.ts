import { PricingPlan } from "@models/Event/Event";

export const getFreeTierDays = (
  currntSprintDay: number,
  gamePricing?: PricingPlan[],
  starts?: number
) => {
  if (
    currntSprintDay < 0 &&
    gamePricing &&
    gamePricing.length > 0 &&
    gamePricing[0].freeAccessDays &&
    starts
  ) {
    const now = Date.now();
    const del = (starts - now) / (24 * 60 * 60 * 1000);
    return Math.ceil(del + gamePricing[0].freeAccessDays);
  } else if (
    starts &&
    gamePricing &&
    gamePricing.length > 0 &&
    gamePricing[0].freeAccessDays &&
    currntSprintDay < gamePricing[0].freeAccessDays
  ) {
    return gamePricing[0].freeAccessDays - currntSprintDay;
  }

  return 0;
};
