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
    // const now = Date.now();
    // const del = (starts - now) / (24 * 60 * 60 * 1000);
    // console.log("d", del, currntSprintDay);
    return gamePricing[0].freeAccessDays + Math.abs(currntSprintDay);
    // return Math.ceil(del + gamePricing[0].freeAccessDays);
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

export const getFreeTierDaysV2 = (
  freeTrialStartd?: number,
  gamePricing?: PricingPlan[],
  gameStarts?: number
) => {
  if (
    gameStarts &&
    freeTrialStartd &&
    gamePricing?.length &&
    gamePricing[0].freeAccessDays
  ) {
    const now = Date.now();
    let daysInTrial: number = 0;

    // game not started
    if (now <= gameStarts) {
      const daysToStart = Math.ceil((gameStarts - now) / (24 * 60 * 60 * 1000));

      return daysToStart + gamePricing[0].freeAccessDays;
    }

    // game started and trial taken before
    else if (now > gameStarts && freeTrialStartd > gameStarts) {
      daysInTrial = Math.floor((now - freeTrialStartd) / (24 * 60 * 60 * 1000));
    }
    // game started and trial taken after
    else if (now > gameStarts && freeTrialStartd <= gameStarts) {
      daysInTrial = Math.floor((now - gameStarts) / (24 * 60 * 60 * 1000));
    }

    if (daysInTrial <= gamePricing[0].freeAccessDays) {
      return gamePricing[0].freeAccessDays - daysInTrial;
    }
  }

  return 0;
};
