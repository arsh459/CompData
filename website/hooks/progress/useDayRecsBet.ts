import { useEffect, useState } from "react";
import { collection, doc, query, where, onSnapshot } from "firebase/firestore";
import { dayRecommendation } from "@models/User/User";
import { db } from "@config/firebase";

export const useDayRecsBetween = (
  uid: string,
  type: "workout" | "nutrition",
  badgeId?: string,
  start?: number,
  end?: number
) => {
  const [dateRecs, setDateRecs] = useState<{
    [date: string]: dayRecommendation;
  }>({});

  useEffect(() => {
    if (badgeId && start && end && uid && type) {
      const q = query(
        collection(doc(db, "users", uid), "dayRecommendations"),
        where("type", "==", type),
        where("badgeId", "==", badgeId),
        where("unix", ">=", start),
        where("unix", "<=", end)
      );

      const unsub = onSnapshot(q, (querySnapshot) => {
        const remoteObjs: { [date: string]: dayRecommendation } = {};

        querySnapshot.forEach((doc) => {
          const remoteObj = doc.data() as dayRecommendation;
          if (remoteObj.doneFP) {
            remoteObjs[remoteObj.date] = remoteObj;
          }
        });

        setDateRecs(remoteObjs);
      });

      return () => {
        unsub();
      };
    }
  }, [badgeId, start, end, uid, type]);

  return {
    dateRecs,
  };
};
