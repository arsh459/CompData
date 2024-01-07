import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

import { SbPlans } from "@models/AppSubscription/AppSubscription";

export const useSbPlan = (id?: string) => {
  const [sbplan, setSbPlan] = useState<SbPlans>();
  useEffect(() => {
    if (id) {
      const listener = firestore()
        .collection("sbplans")
        .doc(id)
        // .where("pinned", "==", true)
        // .where("gameId", "==", state.gameId)
        .onSnapshot((doc) => {
          if (doc.data()) {
            setSbPlan(doc.data() as SbPlans);
          }
        });

      return () => {
        listener();
      };
    } else {
      setSbPlan(undefined);
    }
  }, [id]);

  return {
    sbplan,
  };

  //   console.log("packages", packages[0]);
};
