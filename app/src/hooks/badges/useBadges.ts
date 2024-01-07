import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { Badge, frequencyTypes } from "@models/Prizes/Prizes";

export const useBadges = (gameId?: string, frequency?: frequencyTypes) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (gameId) {
      let q: FirebaseFirestoreTypes.Query | undefined = undefined;
      if (frequency) {
        q = firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges")
          .where("frequency", "==", frequency)
          .orderBy("priority", "asc");

        // query(
        //   collection(doc(db, "sbEvents", gameId), "badges"),
        //   where("frequency", "==", frequency),
        //   orderBy("priority", "asc")
        // );
      } else {
        q = firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges")
          .orderBy("priority", "asc");

        // q = query(
        //   collection(doc(db, "sbEvents", gameId), "badges"),
        //   orderBy("priority", "asc")
        // );
      }

      if (q) {
        const unsub = q.onSnapshot((snapshot) => {
          const rbadges: Badge[] = [];
          for (const doc of snapshot.docs) {
            if (doc) {
              rbadges.push(doc.data() as Badge);
            }
          }

          setBadges(rbadges);
          setTimeout(() => setFetching(true), 200);
        });

        return () => {
          if (unsub) {
            setFetching(false);
            unsub();
          }
        };
      }
    }
  }, [gameId, frequency]);

  return {
    badges,
    fetched,
  };
};
