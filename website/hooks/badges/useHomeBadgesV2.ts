import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { Badge } from "@models/Prizes/PrizeV2";

export const useHomeBadgesV2 = (gameId?: string) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (gameId) {
        const q = query(
          collection(doc(db, "sbEvents", gameId), "badges"),
          where("pinned", "==", true),
          orderBy("priority", "asc")
        );

        const unsub = onSnapshot(q, (snapshot) => {
          if (snapshot) {
            const rbadges: Badge[] = [];
            for (const doc of snapshot.docs) {
              if (doc) {
                rbadges.push(doc.data() as Badge);
              }
            }

            setBadges(rbadges);
            setFetched(true);
          } else {
            setBadges([]);
            setFetched(true);
          }
        });

        return () => {
          if (unsub) {
            setFetched(false);
            unsub();
          }
        };
      } else {
        setBadges([]);
        setFetched(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [gameId]);

  return {
    badges,
    fetched,
  };
};