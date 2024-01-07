import { useEffect, useState } from "react";
// import {
//   doc,
//   onSnapshot,
//   query,
//   where,
//   collection,
//   orderBy,
// } from "firebase/firestore";
import { Activity } from "@models/Activity/Activity";
// import { db } from "@config/firebase";

import firestore from "@react-native-firebase/firestore";

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

      const userRef = firestore().collection("users").doc(uid);
      // const userRef = doc(db, "users", uid);
      // frequency based check
      const q = userRef
        .collection("activities")
        .where("createdOn", ">=", beforeTime)
        .where("taskId", "==", taskId)
        .orderBy("createdOn", "desc");

      // query(
      //   collection(userRef, "activities"),
      //   where("createdOn", ">=", beforeTime),
      //   where("taskId", "==", taskId),
      //   orderBy("createdOn", "desc")
      // );

      const unsub = q.onSnapshot((docs) => {
        const acts: Activity[] = [];
        if (docs)
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
