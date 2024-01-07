import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Badge } from "@models/Prizes/Prizes";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useProfileContext } from "@providers/profile/ProfileProvider";

export const useUserBadgesV2 = () => {
  const { state } = useAuthContext();
  const { profile: user } = useProfileContext();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const getRemoteBadge = async () => {
      const remoteBadges: Badge[] = [];

      const badgesRef = firestore()
        .collection("sbEvents")
        .doc(state.gameId)
        .collection("badges");

      const badgeIds = [
        ...(user?.relativeBadgesWon ? user?.relativeBadgesWon : []),
        ...(user?.independentBadgesWon ? user?.independentBadgesWon : []),
        ...(user?.otherBadgesWon ? user?.otherBadgesWon : []),
      ];

      for (const badgeId of badgeIds) {
        const remoteDoc = await badgesRef.doc(badgeId).get();
        if (remoteDoc.exists) {
          const badge = remoteDoc.data() as Badge;
          remoteBadges.push(badge);
        }
      }

      setBadges(remoteBadges);
    };

    getRemoteBadge();
  }, [
    state.gameId,
    user?.relativeBadgesWon,
    user?.independentBadgesWon,
    user?.otherBadgesWon,
  ]);

  return {
    badges,
  };
};
