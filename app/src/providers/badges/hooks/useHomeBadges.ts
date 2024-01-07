import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Badge } from "@models/Prizes/Prizes";
import crashlytics from "@react-native-firebase/crashlytics";

export const useHomeBadges = (
  gameId?: string,
  rounds?: string[],
  showAllCards?: boolean,
  allRounds?: string[]
) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  const [swipedBadge, setSwipedBadge] = useState<number>(-1);

  useEffect(() => {
    try {
      if (gameId && rounds?.length) {
        let q: FirebaseFirestoreTypes.Query | undefined = undefined;
        if (showAllCards && allRounds) {
          q = firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("badges")
            .where("rounds", "array-contains-any", allRounds);
        } else {
          q = firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("badges")
            .where("rounds", "array-contains-any", rounds);
        }
        //   .orderBy("priority", "asc");

        if (q) {
          const unsub = q.onSnapshot((snapshot) => {
            if (snapshot) {
              const rbadges: Badge[] = [];
              for (const doc of snapshot.docs) {
                if (doc) {
                  rbadges.push(doc.data() as Badge);
                }
              }

              setBadges(rbadges);
              setSwipedBadge(rbadges.length ? 0 : -1);
              setTimeout(() => setFetching(true), 200);
            } else {
              setBadges([]);
              setSwipedBadge(-1);
              setTimeout(() => setFetching(true), 200);
            }
          });

          return () => {
            if (unsub) {
              setFetching(false);
              unsub();
            }
          };
        }
      } else {
        setBadges([]);
        setSwipedBadge(-1);
        setTimeout(() => setFetching(true), 200);
      }
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error", error);
    }
  }, [gameId, rounds, showAllCards, allRounds]);

  return {
    badges,
    fetched,
    swipedBadge,
    setSwipedBadge,
  };
};
