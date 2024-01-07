import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Subscription } from "@models/User/User";
import { PricingPlan, RoundObject, SprintObject } from "@models/Event/Event";
import { subscriptionStatus } from "./useSubscription";
import { getCurrentRoundSprint } from "@hooks/community/challengeWeekUtils/utils";
import { getDefaultSubscriptionPlan } from "@hooks/joinBoat/utils";

const now = Date.now();

export interface basicPlanDetails {
  name: string;
  cost: number;
  durationInDays: number;
  pointers: string[];
  currentSprintId: string;
  currentRoundId: string;
  plan: PricingPlan;
}

export const useSubscriptionV2 = (
  uid: string | undefined,
  gameId: string | undefined,
  rounds?: RoundObject[],
  sprints?: SprintObject[],
  gamePricing?: PricingPlan[],
  starts?: number,
  freeGame?: boolean
) => {
  const [subStatus, setSubStatus] = useState<subscriptionStatus>("PENDING");
  const [subObj, setSubObj] = useState<Subscription>();
  const [daysLeftToGame, setDaysLeft] = useState<number>(0);
  const [basicPlan, setBasicPlan] = useState<basicPlanDetails>();

  useEffect(() => {
    // console.log("useSubscriptionsV2");
    if (uid && gameId) {
      const defaultPlan = getDefaultSubscriptionPlan(gamePricing);

      // console.log("d", defaultPlan);
      if (!defaultPlan || freeGame) {
        setSubStatus("FREE_GAME");
        return;
      }

      // if game hasnt started
      // if (starts && now < starts) {
      //   setSubStatus("GAME_TO_START");
      //   const days = Math.ceil((starts - now) / (24 * 60 * 60 * 1000));
      //   setDaysLeft(days);
      //   return;
      // }

      const res = getCurrentRoundSprint(sprints, rounds, starts);

      // no res
      if (!res) {
        setSubStatus("GAME_ENDED");
        return;
      }

      if (res?.selectedSprintId && res.selectedRoundId) {
        setBasicPlan({
          name: defaultPlan.name,
          cost: defaultPlan.cost,
          durationInDays: defaultPlan.durationInDays
            ? defaultPlan.durationInDays
            : 3,
          pointers: defaultPlan.pointers ? defaultPlan.pointers : [],
          currentSprintId: res?.selectedSprintId,
          currentRoundId: res.selectedRoundId,
          plan: defaultPlan,
        });

        const userRef = doc(db, "users", uid);
        const subscriptionRef = doc(userRef, "subscriptions", gameId);

        const listener = onSnapshot(subscriptionRef, (doc) => {
          const subObjRemote = doc.data() as Subscription | undefined;
          // console.log("s", subObjRemote);
          if (subObjRemote) {
            const enrolledSprints = subObjRemote.paidSprints;
            const enrolledRounds = subObjRemote.paidRounds;

            if (enrolledSprints?.includes(res.selectedSprintId)) {
              setSubStatus("PAID_ONE");
              setSubObj(subObjRemote);
              setDaysLeft(res.sprintEnd - res.days);
            } else if (enrolledRounds?.includes(res.selectedRoundId)) {
              setSubStatus("PAID_ONE");
              setSubObj(subObjRemote);
              setDaysLeft(res.roundEnd - res.days);
            } else if (res && res.days < 0 && starts) {
              const days = Math.ceil((starts - now) / (24 * 60 * 60 * 1000));
              setSubStatus("GAME_TO_START");
              setDaysLeft(days);
              setSubObj(subObjRemote);
            } else {
              setSubStatus("EXPIRED");
              setSubObj(subObjRemote);
              setDaysLeft(0);
            }
          } else if (res && res.days < 0 && starts) {
            const days = Math.ceil((starts - now) / (24 * 60 * 60 * 1000));
            setSubStatus("GAME_TO_START");
            setDaysLeft(days);
            setSubObj(undefined);
          } else {
            setSubStatus("EXPIRED");
            setSubObj(undefined);
            setDaysLeft(0);
          }
        });

        return () => {
          listener();
        };
      }
    }
  }, [uid, freeGame, gameId, sprints, rounds, gamePricing, starts]);

  return {
    subStatus,
    subObj,
    daysLeftToGame,
    basicPlan,
  };
};
