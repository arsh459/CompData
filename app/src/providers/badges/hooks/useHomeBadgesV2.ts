import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,
import { Badge } from "@models/Prizes/Prizes";
import crashlytics from "@react-native-firebase/crashlytics";

export const useHomeBadgesV2 = (
  gameId?: string
  //   rounds?: string[],
  //   showAllCards?: boolean,
  //   allRounds?: string[]
) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  //   const [swipedBadge, setSwipedBadge] = useState<number>(-1);

  useEffect(() => {
    try {
      if (gameId) {
        // let q: FirebaseFirestoreTypes.Query | undefined = undefined;
        const q = firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges")
          .where("pinned", "==", true)
          .orderBy("priority", "asc");

        //   .orderBy("priority", "asc");

        // q.get();

        const unsub = q.onSnapshot((snapshot) => {
          if (snapshot) {
            const rbadges: Badge[] = [];
            for (const doc of snapshot.docs) {
              if (doc) {
                rbadges.push(doc.data() as Badge);
              }
            }

            setBadges(rbadges);
            // setSwipedBadge(rbadges.length ? 0 : -1);
            setFetching(true);
          } else {
            setBadges([]);
            // setSwipedBadge(-1);
            setFetching(true);
          }
        });

        return () => {
          if (unsub) {
            setFetching(false);
            unsub();
          }
        };
      } else {
        setBadges([]);
        setFetching(true);
      }
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error", error);
    }
  }, [
    gameId,

    // rounds, showAllCards, allRounds
  ]);

  return {
    badges,
    fetched,
    // swipedBadge,
    // setSwipedBadge,
  };
};
