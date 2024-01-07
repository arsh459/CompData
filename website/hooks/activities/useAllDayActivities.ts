import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { format } from "date-fns";

export const useAllDayActivities = (uid: string) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [day, setDay] = useState<string>("");

  useEffect(() => {
    const nowUnix = Date.now();
    const nowDateObj = new Date(nowUnix);

    const rangeStart = nowDateObj.setHours(0, 0, 0);
    // const rangeEnd = rangeStart + 24 * 60 * 60 * 1000;

    setDay(format(nowDateObj, "yyyy-MM-dd"));

    if (rangeStart && uid) {
      const q = query(
        collection(doc(db, "users", uid), "activities"),
        where("createdOn", ">=", rangeStart),
        // where("createdOn", "<=", rangeEnd),
        orderBy("createdOn", "asc")
      );

      const unsubscribe = onSnapshot(q, (docs) => {
        const remoteActivitiesObj: Activity[] = [];

        for (const doc of docs.docs) {
          const activity = doc.data() as Activity;

          if (activity.createdOn) {
            remoteActivitiesObj.push(activity);
          }
        }

        setActivities(remoteActivitiesObj);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid]);

  return {
    day,
    activities,
  };
};
