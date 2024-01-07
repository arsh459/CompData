import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Badge } from "@models/Prizes/Prizes";

export const useUserBadges = (
  gameId: string,
  independentBadges?: string[],
  relativeBadges?: string[]
) => {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const getRemoteBadge = async () => {
      const remoteBadges: Badge[] = [];

      const badgesRef = firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("badges");

      if (independentBadges && independentBadges.length) {
        const badges = await badgesRef
          .where("id", "in", independentBadges)
          .get();

        for (const badge of badges.docs) {
          if (badge) {
            remoteBadges.push(badge.data() as Badge);
          }
        }
      }

      if (relativeBadges && relativeBadges.length) {
        const badges = await badgesRef.where("id", "in", relativeBadges).get();

        for (const badge of badges.docs) {
          if (badge) {
            remoteBadges.push(badge.data() as Badge);
          }
        }
      }

      setBadges(remoteBadges);
    };

    getRemoteBadge();
  }, [gameId, independentBadges, relativeBadges]);

  return {
    badges,
  };
};
