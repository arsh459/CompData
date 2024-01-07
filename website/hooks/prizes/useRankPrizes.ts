import { awardTypes, Prize } from "@models/Prizes/Prize";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  collection,
  where,
  onSnapshot,
  query,
  //   orderBy,
} from "firebase/firestore";

export const useRankPrizes = (
  eventId?: string,
  prizeType?: awardTypes,
  selectedWeek?: string
) => {
  const [prizes, setPrizes] = useState<{ [uid: string]: Prize[] }>({});
  useEffect(() => {
    if (eventId && prizeType) {
      const ref = collection(db, "prizes");

      let q = undefined;
      if (selectedWeek !== "overall" && selectedWeek) {
        q = query(
          ref,
          where("prizeType", "==", prizeType),
          where("parentId", "==", eventId),
          where("week", "==", selectedWeek)
          // orderBy("rank", "asc")
        );
      } else {
        q = query(
          ref,
          where("prizeType", "==", prizeType),
          where("parentId", "==", eventId)
          // orderBy("rank", "asc")
        );
      }

      const unsubscribe = onSnapshot(q, (docs) => {
        const remotePrizes: { [uid: string]: Prize[] } = {};
        for (const rem of docs.docs) {
          const prz = rem.data() as Prize;
          if (remotePrizes[prz.awardedToUID]) {
            remotePrizes[prz.awardedToUID].push(prz);
          } else {
            remotePrizes[prz.awardedToUID] = [prz];
          }
        }

        // console.log("remotePrizes", remotePrizes);

        setPrizes(remotePrizes);
      });

      return () => {
        if (unsubscribe) {
          setPrizes({});
          unsubscribe();
        }
      };
    }
  }, [eventId, prizeType, selectedWeek]);

  return {
    prizes,
  };
};
