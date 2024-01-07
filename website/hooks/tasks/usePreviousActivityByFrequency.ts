import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  onSnapshot,
  query,
  where,
  collection,
  orderBy,
} from "firebase/firestore";
import { Activity } from "@models/Activities/Activity";

export const usePreviousActivityByFrequency = (
  fetch: boolean,
  gameId: string,
  taskId?: string,
  uid?: string,
  frequency?: "anytime" | "daily" | "weekly",
  weekStartsUnix?: number
) => {
  const [userActivities, setUserActs] = useState<Activity[]>([]);

  useEffect(() => {
    if (fetch && taskId && uid) {
      const now = new Date();
      const dayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      ).getTime();

      let beforeTime: number;
      if (frequency === "weekly" && weekStartsUnix) {
        beforeTime = weekStartsUnix;
      } else {
        beforeTime = dayStart;
      }

      // console.log("t", taskId);

      const userRef = doc(db, "users", uid);
      // frequency based check
      const q = query(
        collection(userRef, "activities"),
        where("createdOn", ">=", beforeTime),
        where("taskId", "==", taskId),
        orderBy("createdOn", "desc")
      );

      const unsub = onSnapshot(q, (docs) => {
        const acts: Activity[] = [];
        for (const doc of docs.docs) {
          const remoteDoc = doc.data() as Activity;
          if (
            (remoteDoc.postRef &&
              remoteDoc.games?.includes(gameId) &&
              remoteDoc.reviewStatus !== "TRY_AGAIN" &&
              remoteDoc.reviewStatus !== "NEED_MORE_DATA") ||
            remoteDoc.source === "checkin"
          ) {
            acts.push(remoteDoc);
          }
        }

        setUserActs(acts);
      });

      return () => {
        unsub();
      };
    } else {
    }
  }, [taskId, uid, fetch, frequency, weekStartsUnix]);

  return {
    userActivities,
  };
};
