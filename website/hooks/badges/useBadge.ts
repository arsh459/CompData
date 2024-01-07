import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Badge } from "@models/Prizes/PrizeV2";
import { createNewBadge } from "@models/Prizes/createUtils";

export const useBadge = (gameId: string, prizeId?: string) => {
  const [badge, setBadge] = useState<Badge>();

  useEffect(() => {
    const getRemoteBadge = async () => {
      if (prizeId && gameId) {
        const ref = doc(doc(db, "sbEvents", gameId), "badges", prizeId);

        const remBadge = await getDoc(ref);

        const remoteBadge = remBadge.data() as Badge | undefined;

        if (remoteBadge) {
          setBadge(remoteBadge);
        } else {
          setBadge(createNewBadge());
        }
      } else {
        setBadge(createNewBadge());
      }
    };

    getRemoteBadge();
  }, [gameId, prizeId]);

  return {
    badge,
    setBadge,
  };
};
