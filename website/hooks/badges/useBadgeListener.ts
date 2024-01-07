import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Badge } from "@models/Prizes/PrizeV2";
// import { createNewBadge } from "@models/Prizes/createUtils";

export const useBadgeListener = (gameId: string, prizeId?: string) => {
  const [badge, setBadge] = useState<Badge>();

  useEffect(() => {
    if (prizeId && gameId) {
      const ref = doc(doc(db, "sbEvents", gameId), "badges", prizeId);

      const list = onSnapshot(ref, (doc) => {
        const remoteBadge = doc.data() as Badge | undefined;
        if (remoteBadge) {
          setBadge(remoteBadge);
        }

        //   else {
        //     setBadge(createNewBadge());
        //   }
      });

      return () => {
        console.log("remove list");
        list();
      };
    }
  }, [gameId, prizeId]);

  return {
    badge,
    setBadge,
  };
};
