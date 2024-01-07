import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";

const useSubscriptionPlans = (gameId: string) => {
  const [plans, setPlans] = useState<AppSubscription[]>([]);

  useEffect(() => {
    const productRef = collection(db, "appSubscriptions");
    const q = query(
      productRef,
      where("gameId", "==", gameId),
      orderBy("cost", "desc"),
      limit(4)
    );
    const listener = onSnapshot(q, (docs) => {
      if (docs.docs.length) {
        const remotePlans: AppSubscription[] = [];

        for (const doc of docs.docs) {
          remotePlans.push(doc.data() as AppSubscription);
        }

        setPlans(remotePlans);
      }
    });

    return () => {
      listener();
    };
  }, [gameId]);

  return {
    plans,
  };
};

export default useSubscriptionPlans;
