import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { Prize } from "@models/Prizes/Prize";

export const usePrizesOfCommunity = (uid?: string) => {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [numToFetch, setToFetch] = useState<number>(6);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  useEffect(() => {
    if (uid) {
      const ref = collection(db, "prizes");
      const q = query(
        ref,
        where("earnedInCommunityId", "==", uid),
        orderBy("priority", "asc"),
        orderBy("rank", "asc"),
        limit(numToFetch)
      );

      const unsubscribe = onSnapshot(q, (docs) => {
        const remotePrizes: Prize[] = [];
        for (const rem of docs.docs) {
          remotePrizes.push(rem.data() as Prize);
        }

        setNextMembersExist(remotePrizes.length === numToFetch);
        setPrizes(remotePrizes);
      });

      return () => {
        if (unsubscribe) {
          setPrizes([]);
          unsubscribe();
        }
      };
    }
  }, [uid, numToFetch]);

  const onNext = () => {
    // console.log("here");
    setToFetch((prev) => prev + 10);
  };

  return {
    prizes,
    nextExists,
    onNext,
  };
};
