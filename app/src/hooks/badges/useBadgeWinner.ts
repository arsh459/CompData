import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

// import { db } from "@config/firebase";
// import { doc, getDoc } from "firebase/firestore";
import { BadgeWinner } from "@models/Prizes/Prizes";
// import { createNewBadge } from "@models/Prizes/createUtils";

export const useBadgeWinner = (
  gameId: string,
  prizeId: string,
  uid?: string
) => {
  const [badgeWinner, setBadgeWinner] = useState<BadgeWinner>();

  useEffect(() => {
    const getRemoteBadge = async () => {
      if (prizeId && gameId && uid) {
        const ref = firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges")
          .doc(prizeId)
          .collection("winners")
          .doc(uid);

        // const ref = doc(doc(db, "sbEvents", gameId), "badges", prizeId);

        const remBadge = await ref.get();

        const remoteBadge = remBadge.data() as BadgeWinner | undefined;

        if (remoteBadge) {
          setBadgeWinner(remoteBadge);
        } else {
          setBadgeWinner(undefined);
        }
      } else {
        setBadgeWinner(undefined);
      }
    };

    getRemoteBadge();
  }, [gameId, prizeId, uid]);

  return {
    badgeWinner,
  };
};
