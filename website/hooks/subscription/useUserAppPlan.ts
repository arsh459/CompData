import { db } from "@config/firebase";
import { UserAppSubscription } from "@models/AppSubscription/AppSubscription";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserAppPlan = (uid?: string, planId?: string) => {
  const [savedPlan, setSavedPlan] = useState<UserAppSubscription>();
  useEffect(() => {
    if (planId && uid) {
      onSnapshot(
        doc(doc(db, "appSubscriptions", planId), "userSubs", uid),
        (doc) => {
          const userApp = doc.data() as UserAppSubscription;
          if (userApp) {
            setSavedPlan(userApp);
          }
        }
      );
    }
  }, [planId, uid]);

  return {
    savedPlan,
  };
};
