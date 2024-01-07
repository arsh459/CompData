import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  Query,
  query,
  where,
} from "firebase/firestore";
import { Badge, frequencyTypes } from "@models/Prizes/PrizeV2";

export const useBadges = (gameId: string, frequency?: frequencyTypes) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (gameId) {
      let q: Query | undefined = undefined;
      if (frequency) {
        q = query(
          collection(doc(db, "sbEvents", gameId), "badges"),
          where("frequency", "==", frequency)
          // orderBy("priority", "asc")
        );
      } else {
        q = query(
          collection(doc(db, "sbEvents", gameId), "badges"),
          // orderBy("priority", "asc")
          orderBy("name", "asc")
        );
      }

      if (q) {
        const unsub = onSnapshot(q, (snapshot) => {
          const rbadges: Badge[] = [];
          for (const doc of snapshot.docs) {
            rbadges.push(doc.data() as Badge);
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
