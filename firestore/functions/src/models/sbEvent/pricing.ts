import { PricingPlan, sbEventInterface } from "./sbEvent";

export const getGamePricingHandler = (game: sbEventInterface) => {
  // console.log("game", game.pricing);
  const subId = getDefaultSubscriptionId(game);
  if (subId) {
    const plan = getSubscriptionPlan(game, subId);
    if (plan) {
      return {
        cost: getGameCost(plan, 0),
        moneyBackDays: plan.moneyBackDays,
      };
    }
  }

  return {
    cost: 0,
  };
};

export const getDefaultSubscriptionId = (game: sbEventInterface) => {
  if (game.pricing && game.pricing.length) {
    return game.pricing[0].id;
  }

  return undefined;
};

export const getSubscriptionPlan = (
  game: sbEventInterface,
  subscriptionId: string,
) => {
  const plans = game.pricing;
  if (plans) {
    for (const item of plans) {
      if (item.id === subscriptionId) {
        return item;
      }
    }
  }

  return undefined;
};

export const getGameCost = (plan: PricingPlan, discount: number) => {
  const cost = plan.cost;
  const discountValue = cost * discount;

  return cost - discountValue;
};
