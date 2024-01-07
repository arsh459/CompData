import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  query,
  where,
  collection,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { Activity } from "@models/Activities/Activity";

export const useParentActivities = (
  fetch: boolean,
  //   weekStartsUnix: number | undefined,
  taskIds?: string[],
  uid?: string
) => {
  const [userActivities, setUserActs] = useState<Activity[]>([]);

  useEffect(() => {
    const getParentTaskActivities = async () => {
      if (fetch && taskIds && uid) {
        const now = new Date().getTime();
        const now_7 = now - 7 * 24 * 60 * 60 * 1000;

        const userRef = doc(db, "users", uid);
        // frequency based check
        const acts: Activity[] = [];
        for (const taskId of taskIds) {
          const q = query(
            collection(userRef, "activities"),
            where("createdOn", ">=", now_7),
            where("taskId", "==", taskId),
            orderBy("createdOn", "desc")
          );

          const remoteDocs = await getDocs(q);
          for (const doc of remoteDocs.docs) {
            acts.push(doc.data() as Activity);
          }
        }

        setUserActs(acts);
      } else {
        // setUserStream(undefined);
      }
    };

    getParentTaskActivities();
  }, [taskIds, uid, fetch]);

  return {
    userActivities,
  };
};
