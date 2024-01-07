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

export const usePreviousActivitiesV2 = (
  fetch: boolean,
  //   weekStartsUnix: number | undefined,
  taskId?: string,
  uid?: string
) => {
  const [userActivities, setUserActs] = useState<Activity[]>([]);

  useEffect(() => {
    if (fetch && taskId && uid) {
      const now = new Date().getTime();
      const now_7 = now - 7 * 24 * 60 * 60 * 1000;

      const userRef = doc(db, "users", uid);
      // frequency based check
      const q = query(
        collection(userRef, "activities"),
        where("createdOn", ">=", now_7),
        where("taskId", "==", taskId),
        orderBy("createdOn", "desc")
      );

      const unsub = onSnapshot(q, (docs) => {
        const acts: Activity[] = [];
        for (const doc of docs.docs) {
          const remoteDoc = doc.data() as Activity;
          if (remoteDoc.postRef) {
            acts.push(remoteDoc);
          }
        }

        setUserActs(acts);
      });

      return () => {
        unsub();

        // setUserStream(undefined);
      };
    } else {
      // setUserStream(undefined);
    }
  }, [taskId, uid, fetch]);

  return {
    userActivities,
  };
};
