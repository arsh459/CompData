import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Badge } from "@models/Prizes/Prizes";
import { UserInterface } from "@models/User/User";

export const useTeamBadges = (gameId?: string, enrolledUserUIDs?: string[]) => {
  const [teamBadges, setTeamBadges] = useState<Badge[]>([]);
  useEffect(() => {
    const getRemoteBadge = async () => {
      if (gameId && enrolledUserUIDs?.length) {
        const remoteBadges: Badge[] = [];
        const userRef = firestore().collection("users");
        const badgesRef = firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges");

        const relativeBadges: string[] = [];
        const indepBadges: string[] = [];
        const otherBadges: string[] = [];
        for (const uid of enrolledUserUIDs) {
          const userDoc = await userRef.doc(uid).get();
          const user = userDoc.data() as UserInterface | undefined;
          relativeBadges.push(
            ...(user?.relativeBadgesWon ? user?.relativeBadgesWon : [])
          );
          indepBadges.push(
            ...(user?.independentBadgesWon ? user?.independentBadgesWon : [])
          );
          otherBadges.push(
            ...(user?.otherBadgesWon ? user?.otherBadgesWon : [])
          );
        }

        for (const badgeId of [
          ...relativeBadges,
          ...indepBadges,
          ...otherBadges,
        ]) {
          const remoteDoc = await badgesRef.doc(badgeId).get();
          if (remoteDoc.exists) {
            const badge = remoteDoc.data() as Badge;
            remoteBadges.push(badge);
          }
        }

        setTeamBadges(remoteBadges);
      }
    };

    getRemoteBadge();
  }, [gameId, enrolledUserUIDs]);

  return {
    teamBadges,
  };
};
