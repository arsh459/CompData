import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { format } from "date-fns";

export const useLastActivities = (uid?: string) => {
  const [activities, setActivities] = useState<{ [dt: string]: Activity[] }>(
    {}
  );
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const [numVisible, setNumVisible] = useState<number>(5);
  //   console.log("numVisible", activities);

  useEffect(() => {
    if (uid && numVisible) {
      const q = query(
        collection(doc(db, "users", uid), "activities"),
        orderBy("createdOn", "desc"),
        limit(numVisible)
      );

      const unsubscribe = onSnapshot(q, (docs) => {
        const remoteActivitiesObj: { [day: string]: Activity[] } = {};
        const actList: Activity[] = [];

        for (const doc of docs.docs) {
          const activity = doc.data() as Activity;

          // console.log("ac", activity);

          if (activity.createdOn) {
            const dateString = format(
              new Date(activity.createdOn),
              "dd/MM/yyyy"
            );

            actList.push({ ...activity, id: doc.id });

            if (!remoteActivitiesObj[dateString]) {
              remoteActivitiesObj[dateString] = [{ ...activity, id: doc.id }];
            } else {
              remoteActivitiesObj[dateString].push({
                ...activity,
                id: doc.id,
              });
            }
          }
        }

        // console.log("remoteActivitiesObj", remoteActivitiesObj);

        setActivities(remoteActivitiesObj);
        setActivityList(actList);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, numVisible]);

  const onNext = () => {
    setNumVisible((prev) => prev + 5);
  };

  return {
    activities,
    onNext,
    activityList,
  };
};
