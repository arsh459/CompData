import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  onSnapshot,
  collection,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { SbPlans } from "@models/SbPlans/interface";

export const useAllSbPlans = (num: number) => {
  const [allSbPlans, setAllSbPlans] = useState<SbPlans[]>();
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  // console.log("t", allSbPlans?.length);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "sbplans"),
        orderBy("priority", "asc"),
        limit(numToFetch ? numToFetch : 100)
      );

      const unsubscribe = onSnapshot(q, (allSbPlans) => {
        const remoteSbPlans: SbPlans[] = [];

        for (const doc of allSbPlans.docs) {
          const activity = doc.data() as SbPlans;
          remoteSbPlans.push(activity);
        }

        setNextMembersExist(remoteSbPlans.length === numToFetch);

        setAllSbPlans(remoteSbPlans);
      });

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log("error", error);
    }
  }, [numToFetch]);

  const onNext = () => {
    // console.log("here");
    setToFetch((prev) => (prev ? prev + 10 : prev));
  };

  return {
    onNext,
    nextExists,
    allSbPlans,
  };
};
