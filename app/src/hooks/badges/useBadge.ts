import { useEffect, useState } from "react";
import { Badge } from "@models/Prizes/Prizes";
import firestore from "@react-native-firebase/firestore";

export const useBadge = (gameId?: string, badgeId?: string) => {
  const [badge, setBadge] = useState<Badge>();

  useEffect(() => {
    const getBadge = async () => {
      if (gameId && badgeId) {
        const badgeDoc = await firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges")
          .doc(badgeId)
          .get();

        if (badgeDoc.data()) {
          setBadge(badgeDoc.data() as Badge);
        }
      }
    };

    getBadge();
  }, [gameId, badgeId]);

  return { badge };
};
