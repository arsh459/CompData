import { PricingPlan, RoundObject, SprintObject } from "@models/Event/Event";
import { useAppConsumables } from "./useAppConsumables";
// import { useState } from "react";
import { usePlans } from "./usePlans";
// import { useRemotePlans } from "./useRemotePlans";
import { subscriptionStatus } from "./useSubscription";
import { useSubscriptionV2 } from "./useSubscriptionV2";

export const useUserPlanStatus = (
  userRazorPlans?: string[],
  uid?: string,
  gameId?: string,
  rounds?: RoundObject[],
  sprints?: SprintObject[],
  gamePricing?: PricingPlan[],
  starts?: number,
  freeGame?: boolean
) => {
  const { appPlan } = usePlans();
  const { subStatus, daysLeftToGame, basicPlan } = useSubscriptionV2(
    uid,
    gameId,
    rounds,
    sprints,
    gamePricing,
    starts,
    freeGame
  );
  const { daysLeft, currentStatus, userSubscription } = useAppConsumables(
    uid,
    appPlan?.id
  );
  // const { daysLeft, currentStatus } = useRemotePlans(uid, userRazorPlans);

  // console.log("daysLeft", daysLeft, currentStatus);

  // still checking
  if (currentStatus === "PENDING" || subStatus === "PENDING") {
    return {
      daysLeft: -1,
      currentStatus: "PENDING" as subscriptionStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
      // onShowModal,
    };
  } else if (subStatus === "GAME_ENDED" || subStatus === "FREE_GAME") {
    return {
      daysLeft: 0,
      currentStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
    };
  }
  // game hasnt started
  else if (subStatus === "GAME_TO_START" || subStatus === "PAID_ONE") {
    return {
      daysLeft: daysLeftToGame,
      currentStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
      // basicPlanName: defaultPlan?.name,
      // onShowModal,
    };
  } else {
    return {
      daysLeft,
      currentStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
      // onShowModal,
    };
  }
};

/**
 * Plans - RevenueCat, Razorpay
 *
 *
 * Fetch plans from Firestore - Source of truth
 *
 *
 * fetch user subscriptions from razorpay - statusOfPlan
 * fetch user subscriptions from revenueCat - statusOfPlan
 *
 * basis status give access or handle UI
 *
 * user can subscribe.
 *
 * if on web, update on razorpay && firestore
 * if on mobile, update on revenueCat && firestore
 *
 *
 */
