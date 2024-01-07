import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { CoachRank } from "@models/Activities/Activity";

export const useCoachRank = (eventId?: string, uid?: string) => {
  const [myCoachRank, setMyCoachRank] = useState<CoachRank>();

  useEffect(() => {
    if (eventId && uid) {
      const ref = doc(
        doc(db, "sbEvents", eventId),
        "coachRanks",
        `rank-${uid}`
      );

      const unsubscribe = onSnapshot(ref, (doc) => {
        const rank = doc.data() as CoachRank;
        setMyCoachRank(rank);
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [eventId, uid]);

  return {
    myCoachRank,
  };
};
