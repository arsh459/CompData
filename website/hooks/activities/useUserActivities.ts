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

export const useUserActivities = (uid?: string, after?: number) => {
  const [activities, setActivities] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [everyday, setEveryday] = useState<boolean>(false);

  console.log("uid", uid, after);

  useEffect(() => {
    if (after && uid) {
      const q = query(
        collection(doc(db, "users", uid), "activities"),
        where("createdOn", ">=", after),
        orderBy("createdOn", "asc")
      );
      const unsubscribe = onSnapshot(q, (docs) => {
        const remoteActivitiesObj: { [day: string]: number } = {};
        const remoteActivities: number[] = [];

        for (const doc of docs.docs) {
          const activity = doc.data() as Activity;
          // console.log("activity", activity.calories);

          if (activity.createdOn) {
            const dateString = new Date(activity.createdOn).toDateString();
            // console.log("dateString", dateString);

            if (remoteActivitiesObj[dateString]) {
              remoteActivitiesObj[dateString] += activity.calories
                ? activity.calories
                : 0;
            } else {
              remoteActivitiesObj[dateString] = activity.calories
                ? activity.calories
                : 0;
            }
          }
        }

        // console.log("remoteActivitiesObj", remoteActivitiesObj);

        const startDate = new Date(new Date(after).toDateString());
        let totalCals: number = 0;
        let everyday: boolean = true;
        for (let i = 0; i <= 6; i++) {
          const nowDateUnix = startDate.getTime() + i * 24 * 60 * 60 * 1000;
          const nowDateString = new Date(nowDateUnix).toDateString();

          const calCount = remoteActivitiesObj[nowDateString]
            ? remoteActivitiesObj[nowDateString]
            : 0;

          //   console.log("nowDateString", nowDateString);
          totalCals += calCount;

          if (!calCount) {
            everyday = false;
          }

          remoteActivities.push(calCount);
        }

        setActivities(remoteActivities);
        setTotal(totalCals);
        setEveryday(everyday);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, after]);

  //   console.log("activities", activities);

  return {
    activities,
    total,
    everyday,
  };
};
