import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

// import { db } from "@config/firebase";
// import { doc, getDoc } from "firebase/firestore";
import { SBPrizeV2 } from "@models/Prizes/Prizes";
// import { createNewBadge } from "@models/Prizes/createUtils";

export const useBenefits = (gameId: string) => {
  const [benefits, setBenefits] = useState<SBPrizeV2[]>([]);

  useEffect(() => {
    if (gameId) {
      const ref = firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("benefits")
        .orderBy("priority", "asc");

      const unsub = ref.onSnapshot((query) => {
        if (query?.docs) {
          const benefits: SBPrizeV2[] = [];
          for (const doc of query.docs) {
            const ben = doc.data() as SBPrizeV2;
            benefits.push(ben);
          }

          setBenefits(benefits);
        }
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [gameId]);

  return {
    benefits,
  };
};
