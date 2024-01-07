import { useEffect, useState } from "react";
// import { db } from "@config/firebase";
// import { doc, onSnapshot } from "firebase/firestore";
import { CoachRank } from "@models/Activity/Activity";

import firestore from "@react-native-firebase/firestore";

export const useCoachRank = (eventId?: string, uid?: string) => {
  const [myCoachRank, setMyCoachRank] = useState<CoachRank>();

  useEffect(() => {
    if (eventId && uid) {
      const ref = firestore()
        .collection("sbEvents")
        .doc(eventId)
        .collection("coachRanks")
        .doc(`rank-${uid}`);
      // const ref = doc(
      //   doc(db, "sbEvents", eventId),
      //   "coachRanks",
      //   `rank-${uid}`
      // );

      const unsubscribe = ref.onSnapshot((doc) => {
        if (doc) {
          const rank = doc.data() as CoachRank;
          setMyCoachRank(rank);
        }
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
