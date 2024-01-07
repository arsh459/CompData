import { useEffect, useState } from "react";
// import { db } from "@config/firebase";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { UserAppSubscription } from "@models/AppSubscription/AppSubscription";
import { subscriptionStatus } from "./useSubscription";
import { pastUserSubscribers } from "@constants/subscribersList";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { Subscription, UserAppSubscription } from "@models/User/User";
// import { PricingPlan } from "@models/Event/Event";

export const useAppConsumables = (uid?: string, id?: string) => {
  const [userSubscription, setSub] = useState<UserAppSubscription>();

  const [currentStatus, setStatus] = useState<subscriptionStatus>("PENDING");
  const [msLeftWeb, setMSLeftWeb] = useState<number>(0);
  const [daysLeft, setDaysLeft] = useState<number>(-1);
  // const {state} = useAuthContext();

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
      const productRef = firestore().collection("appSubscriptions").doc(id);
      // doc(db, "appSubscriptions", id);
      const userSubscriptionRef = productRef.collection("userSubs").doc(uid);

      try {
        const listener = userSubscriptionRef.onSnapshot(
          // userSubscriptionRef,
          (doc) => {
            if (doc) {
              const remoteObj = doc.data() as UserAppSubscription | undefined;

              if (remoteObj) {
                const now = Date.now();

                const freeTrialEnds = remoteObj.freeTrialEndsOn;
                const endingAt = remoteObj.paidPeriodEndsOn;

                if (endingAt && endingAt > now) {
                  const ms = endingAt - now;

                  const days = Math.ceil(ms / (24 * 60 * 60 * 1000));

                  setMSLeftWeb(ms);
                  setDaysLeft(days);
                  setStatus("SUBSCRIBED");
                  setSub(remoteObj);
                } else if (freeTrialEnds && freeTrialEnds > now) {
                  const ms = freeTrialEnds - now;
                  const days = Math.ceil(ms / (24 * 60 * 60 * 1000));

                  setMSLeftWeb(ms);
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
            } else {
              setDaysLeft(0);
              setStatus("EXPIRED");
              setSub(undefined);
            }
          }
        );

        return () => {
          listener();
        };
      } catch (error: any) {
        console.log("error", error);
        crashlytics().recordError(error);
      }
    }
  }, [id, uid]);

  return {
    userSubscription,
    currentStatus,
    daysLeft,
    msLeftWeb,
  };
};
