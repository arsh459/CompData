import { useEffect, useState } from "react";
// import { doc, onSnapshot } from "firebase/firestore";
import { Subscription } from "@models/User/User";
import { PricingPlan } from "@models/Event/Event";
// import { db } from "@config/firebase";
import firestore from "@react-native-firebase/firestore";

export type subscriptionStatus =
  | "PENDING"
  | "SUBSCRIBED"
  | "FREE_TRIAL"
  | "PAID_ONE"
  | "GAME_ENDED"
  | "FREE_GAME"
  // | "NEED_SUBSCRIPTION"
  | "GAME_TO_START"
  | "EXPIRED";

export type affirmationType = "TO_BE_SHOWN" | "ACCEPTED" | "VISIBLE" | "NONE";

export const useSubscription = (
  uid: string | undefined,
  gameId: string | undefined,
  currentRound: string | undefined,
  currentSprint: string | undefined,
  gamePricing?: PricingPlan[]
) => {
  const [subStatus, setSubStatus] = useState<subscriptionStatus>("PENDING");
  const [subObj, setSubObj] = useState<Subscription>();
  const [affirmation, setAffirmation] = useState<affirmationType>("NONE");

  const onSuccessSub = () => setAffirmation("VISIBLE");
  const onHideSub = () => setAffirmation("ACCEPTED");

  useEffect(() => {
    if (uid && gameId) {
      if (
        !gamePricing ||
        gamePricing.length === 0 ||
        (gamePricing?.length && gamePricing[0].cost === 0)
      ) {
        setSubStatus("SUBSCRIBED");
        return;
      }

      // const userRef = doc(db, "users", uid);
      // const subscriptionRef = doc(userRef, "subscriptions", gameId);

      const listener = firestore()
        .collection("users")
        .doc(uid)
        .collection("subscriptions")
        .doc(gameId)
        .onSnapshot((doc) => {
          if (doc) {
            const subObj = doc.data() as Subscription | undefined;
            if (subObj) {
              const enrolledSprints = subObj.paidSprints;
              const enrolledRounds = subObj.paidRounds;

              if (
                (currentSprint && enrolledSprints?.length) ||
                (currentRound && enrolledRounds?.includes(currentRound))
              ) {
                setSubStatus("SUBSCRIBED");
                setAffirmation("NONE");
                setSubObj(subObj);
              } else if (enrolledSprints?.length || enrolledRounds?.length) {
                setSubStatus("EXPIRED");
                setAffirmation("TO_BE_SHOWN");
                setSubObj(subObj);
              } else {
                setSubStatus("EXPIRED");
                setAffirmation("TO_BE_SHOWN");
                setSubObj(subObj);
              }
            } else {
              setSubStatus("EXPIRED");
              setAffirmation("TO_BE_SHOWN");
              setSubObj(undefined);
            }
          }
        });

      return () => {
        listener();
      };
    }
  }, [uid, gameId, currentSprint, currentRound, gamePricing]);

  return {
    subStatus,
    affirmation,
    onSuccessSub,
    onHideSub,
    subObj,
  };
};
