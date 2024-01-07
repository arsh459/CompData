import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { UserAppSubscription } from "@models/AppSubscription/AppSubscription";
import { subscriptionStatus } from "./useSubscription";
import { pastUserSubscribers } from "@constants/subscribersList";
// import { Subscription, UserAppSubscription } from "@models/User/User";
// import { PricingPlan } from "@models/Event/Event";

export const useAppConsumables = (uid?: string, id?: string) => {
  const [userSubscription, setSub] = useState<UserAppSubscription>();

  const [currentStatus, setStatus] = useState<subscriptionStatus>("PENDING");
  const [daysLeft, setDaysLeft] = useState<number>(-1);

  useEffect(() => {
    if (
      uid &&
      pastUserSubscribers[uid] &&
      pastUserSubscribers[uid] > Date.now()
    ) {
      setStatus("SUBSCRIBED");
      const d = Math.ceil(
        (pastUserSubscribers[uid] - Date.now()) / (24 * 60 * 60 * 1000)
      );
      setDaysLeft(d);
      setSub(undefined);
    } else if (id && uid) {
      const productRef = doc(db, "appSubscriptions", id);
      const userSubscriptionRef = doc(productRef, "userSubs", uid);

      //   const q = query(productRef, where("state", "==", "active"), limit(1));
      const listener = onSnapshot(userSubscriptionRef, (doc) => {
        const remoteObj = doc.data() as UserAppSubscription | undefined;

        // console.log("doc", remoteObj);

        if (remoteObj) {
          const now = Date.now();

          const freeTrialEnds = remoteObj.freeTrialEndsOn;
          const endingAt = remoteObj.paidPeriodEndsOn;

          if (endingAt && endingAt > now) {
            const days = Math.ceil((endingAt - now) / (24 * 60 * 60 * 1000));

            setDaysLeft(days);
            setStatus("SUBSCRIBED");
            setSub(remoteObj);
          } else if (freeTrialEnds && freeTrialEnds > now) {
            const days = Math.ceil(
              (freeTrialEnds - now) / (24 * 60 * 60 * 1000)
            );
            setDaysLeft(days);
            setStatus("FREE_TRIAL");
            setSub(remoteObj);
          } else {
            setDaysLeft(0);
            setStatus("EXPIRED");
            setSub(remoteObj);
          }
        } else {
          setDaysLeft(0);
          setStatus("EXPIRED");
          setSub(undefined);
        }
      });

      return () => {
        listener();
      };
    }
  }, [id, uid]);

  return {
    userSubscription,
    currentStatus,
    daysLeft,
  };
};
