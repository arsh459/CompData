import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
} from "firebase/firestore";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";
// import { Subscription, UserAppSubscription } from "@models/User/User";
// import { PricingPlan } from "@models/Event/Event";

export const usePlans = () => {
  const [appPlan, setAppPlan] = useState<AppSubscription>();

  useEffect(() => {
    // console.log("fetching plans");
    const productRef = collection(db, "appSubscriptions");
    const q = query(productRef, where("state", "==", "active"), limit(1));
    const listener = onSnapshot(q, (docs) => {
      if (docs.docs.length) {
        setAppPlan(docs.docs[0].data() as AppSubscription);
      }
      // const remAppPlans: AppSubscription[] = [];
      // for (const doc of docs.docs) {
      //   const plan = doc.data() as AppSubscription;
      //   remAppPlans.push(plan);
      // }
    });

    return () => {
      listener();
    };
  }, []);

  return {
    appPlan,
  };
};
