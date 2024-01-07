import { useEffect, useState } from "react";
// import { db } from "@config/firebase";
// import { doc, onSnapshot } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import { UserRank } from "@models/Activity/Activity";

export const useUserRank = (eventId?: string, uid?: string) => {
  const [myUserRank, setMyUserRank] = useState<UserRank>();

  useEffect(() => {
    if (eventId && uid) {
      const ref = firestore()
        .collection("sbEvents")
        .doc(eventId)
        .collection("userRanks")
        .doc(`rank-${uid}`);
      // const ref = doc(doc(db, "sbEvents", eventId), "userRanks", `rank-${uid}`);

      const unsubscribe = ref.onSnapshot((doc) => {
        if (doc) {
          const rank = doc.data() as UserRank;
          setMyUserRank(rank);
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
    myUserRank,
  };
};
