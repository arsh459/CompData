import { usePurchaser } from "@hooks/purchases/usePurchaser";
import { PricingPlan, RoundObject, SprintObject } from "@models/Event/Event";
import {
  storedDescriptions,
  storedNames,
} from "@modules/Subscription/constants";
import { useAppConsumables } from "./useAppConsumables";
// import { useState } from "react";
import { usePlans } from "./usePlans";
// import { useRevenueCat } from "./useRevenueCat";
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
  freeGame?: boolean,
  fetchingGameId?: string
) => {
  const { appPlan } = usePlans();
  const { subStatus, daysLeftToGame, basicPlan } = useSubscriptionV2(
    uid,
    gameId,
    rounds,
    sprints,
    gamePricing,
    starts,
    freeGame,
    fetchingGameId
  );
  const { daysLeft, currentStatus, userSubscription } = useAppConsumables(
    uid,
    appPlan?.id
  );
  const {
    appDaysLeft,
    inAppPurchaseStatus,
    purchaserInformation,
    planIdentifyer,
    // msLeft,
  } = usePurchaser();

  // useRevenueCat();

  // still checking
  if (
    currentStatus === "PENDING" ||
    subStatus === "PENDING" ||
    inAppPurchaseStatus === "PENDING"
  ) {
    return {
      daysLeft: -1,
      currentStatus: "PENDING" as subscriptionStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
      purchaserInformation,
      // onShowModal,
    };
  } else if (subStatus === "GAME_ENDED" || subStatus === "FREE_GAME") {
    return {
      daysLeft: 0,
      currentStatus: subStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
      purchaserInformation,
    };
  }
  // game hasnt started
  else if (subStatus === "GAME_TO_START" || subStatus === "PAID_ONE") {
    return {
      daysLeft: daysLeftToGame,
      currentStatus: subStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
      purchaserInformation,
      // basicPlanName: defaultPlan?.name,
      // onShowModal,
    };
  }
  // app subscribed
  else if (inAppPurchaseStatus === "SUBSCRIBED") {
    return {
      daysLeft: appDaysLeft,
      currentStatus: inAppPurchaseStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
      purchaserInformation,

      planName: planIdentifyer ? storedNames[planIdentifyer] : "App Plan",
      planDescription: planIdentifyer
        ? storedDescriptions[planIdentifyer]
        : ["Access to SocialBoat Games"],
    };
  } else {
    return {
      daysLeft,
      currentStatus,
      appPlan,
      basicPlan,
      basePlanStatus: subStatus,
      userSubscription,
      purchaserInformation,
      planName: appPlan?.name ? appPlan?.name : "",
      planDescription: [appPlan?.description ? appPlan?.description : ""],
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
