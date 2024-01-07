import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { UserAppSubscription } from "@models/AppSubscription/AppSubscription";
import { createUserAppSubscriptionLastPaid } from "@models/AppSubscription/createAppSubscription";

export const useUserAppSub = (planId: string, id: string) => {
  const [appPlan, setAppPlan] = useState<UserAppSubscription>();
  const [loading, setLoading] = useState(false);
  //   useEffect(() => {
  //     if (id && planId) {
  //       const ref = doc(db, "testimonials", id);

  //       const unsubscribe = onSnapshot(ref, (appPlan) => {
  //         setAppPlan(appPlan.data() as UserAppSubscription);
  //       });

  //       return () => {
  //         unsubscribe();
  //       };
  //     } else {
  //         const now = Date.now();

  //       setAppPlan(createUserAppSubscriptionLastPaid(id,0,now,0,"","INR"));
  //     }
  //   }, [planId, id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id && planId) {
          const appSubscriptionsRef = collection(db, "appSubscriptions");
          const planDocRef = doc(appSubscriptionsRef, planId);
          const userSubsCollectionRef = collection(planDocRef, "userSubs");
          const userSubsDocRef = doc(userSubsCollectionRef, id);

          const docSnap = await getDoc(userSubsDocRef);
          if (docSnap.data()) {
            const appPlanRemote = docSnap.data() as UserAppSubscription;

            setAppPlan(appPlanRemote);
          }
        } else {
          const now = Date.now();
          setAppPlan(
            createUserAppSubscriptionLastPaid(id, 0, now, 0, "", "INR")
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle any errors
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [planId, id]);

  const onUpdatePlanName = (newVal: string) => {
    setAppPlan((prev) => {
      if (prev) {
        return {
          ...prev,
          lastPlanName: newVal,
        };
      }
    });
  };
  const onUpdatePaidCurrency = (newVal: "INR" | "USD") => {
    setAppPlan((prev) => {
      if (prev) {
        return {
          ...prev,
          lastPaidCurrency: newVal,
        };
      }
    });
  };

  const onUpdatePaidValue = (newVal: string) => {
    setAppPlan((prev) => {
      if (prev) {
        return {
          ...prev,
          lastPaidValue: parseInt(newVal),
        };
      }
    });
  };
  const onUpdatePaidUnix = (newVal: string) => {
    setAppPlan((prev) => {
      if (prev) {
        return {
          ...prev,
          lastPaidUnix: parseInt(newVal),
        };
      }
    });
  };

  return {
    appPlan,

    onUpdatePlanName,

    onUpdatePaidValue,
    onUpdatePaidUnix,
    onUpdatePaidCurrency,
    loading,
    setLoading,
  };
};
