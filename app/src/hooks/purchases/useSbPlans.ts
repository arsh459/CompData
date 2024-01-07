import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

import { SbPlans } from "@models/AppSubscription/AppSubscription";

export const useSbPlans = () => {
  const [sbplans, setSbPlans] = useState<SbPlans[]>([]);

  // console.log("p", packages.length);
  const { state } = useAuthContext();

  useEffect(() => {
    const listener = firestore()
      .collection("sbplans")
      .orderBy("priority", "asc")
      // .where("pinned", "==", true)
      // .where("gameId", "==", state.gameId)
      .onSnapshot((docs) => {
        if (docs?.docs?.length) {
          const remAppPlans: SbPlans[] = [];
          for (const doc of docs.docs) {
            const plan = doc.data() as SbPlans;
            remAppPlans.push(plan);
          }
          setSbPlans(remAppPlans);
        }
      });

    return () => {
      listener();
    };
  }, [state.gameId]);

  return {
    sbplans,
  };

  //   console.log("packages", packages[0]);
};
