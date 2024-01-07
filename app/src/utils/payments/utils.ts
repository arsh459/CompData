import { EventInterface, PricingPlan } from "@models/Event/Event";
import { getDefaultSubscriptionId } from "@modules/JoinBoatMain/utils/teamUtils";

export const getGamePricingHandler = (game?: EventInterface) => {
  if (game) {
    const subId = getDefaultSubscriptionId(game);
    if (subId) {
      const plan = getSubscriptionPlan(game, subId);
      if (plan) {
        return {
          cost: getGameCost(plan, 0),
          moneyBackDays: plan.moneyBackDays,
          freeAccessDays: plan.freeAccessDays,
        };
      }
    }
  }

  return {
    cost: 0,
  };
};

export const getSubscriptionPlan = (
  game: EventInterface,
  subscriptionId: string
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
