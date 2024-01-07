import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Badge } from "@models/Prizes/Prizes";
import crashlytics from "@react-native-firebase/crashlytics";

export const useSprintBadges = (gameId?: string, sprintId?: string) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [teamBadges, setTeamBadges] = useState<Badge[]>([]);

  useEffect(() => {
    try {
      if (gameId && sprintId) {
        const q = firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges")
          .where("sprints", "array-contains", sprintId);
        //   .orderBy("priority", "asc");

        if (q) {
          const unsub = q.onSnapshot((snapshot) => {
            if (snapshot) {
              const rbadges: Badge[] = [];
              const rTeamBadges: Badge[] = [];
              for (const doc of snapshot.docs) {
                const tmpBadge = doc.data() as Badge;

                if (tmpBadge.isTeamBadge) {
                  rTeamBadges.push(tmpBadge);
                } else {
                  rbadges.push(tmpBadge);
                }
              }

              setBadges(rbadges);
              setTeamBadges(rTeamBadges);
            }
          });

          return () => {
            if (unsub) {
              unsub();
            }
          };
        }
      }
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error", error);
    }
  }, [gameId, sprintId]);

  return {
    badges,
    teamBadges,
  };
};
