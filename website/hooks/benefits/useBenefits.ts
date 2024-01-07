import { useEffect, useState } from "react";

import { db } from "config/firebase";
import {
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { SBPrizeV2 } from "@models/Prizes/Prize";

// import { db } from "@config/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { createNewBadge } from "@models/Prizes/createUtils";

export const useBenefits = (gameId: string) => {
  const [benefits, setBenefits] = useState<SBPrizeV2[]>([]);

  useEffect(() => {
    if (gameId) {
      const ref = query(
        collection(doc(db, "sbEvents", gameId), "benefits"),
        orderBy("priority", "asc")
      );

      const unsub = onSnapshot(ref, (query) => {
        if (query.docs) {
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
