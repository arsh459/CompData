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

export const useActivitiesBetween = (
  uid?: string,
  rangeStart?: number,
  rangeEnd?: number
) => {
  //   const [activities, setActivities] = useState<number[]>([]);
  //   const [total, setTotal] = useState<number>(0);
  const [activities, setActivities] = useState<{ [dt: string]: Activity[] }>(
    {}
  );
  //   const [everyday, setEveryday] = useState<boolean>(false);

  //   console.log("uid", uid, after);

  useEffect(() => {
    if (rangeStart && rangeEnd && uid) {
      const q = query(
        collection(doc(db, "users", uid), "activities"),
        where("createdOn", ">=", rangeStart),
        where("createdOn", "<=", rangeEnd),
        orderBy("createdOn", "asc")
      );

      //   console.log("q", q);
      const unsubscribe = onSnapshot(q, (docs) => {
        const remoteActivitiesObj: { [day: string]: Activity[] } = {};

        for (const doc of docs.docs) {
          const activity = doc.data() as Activity;
          //   console.log("activity", activity);

          if (activity.createdOn) {
            const dateString = format(
              new Date(activity.createdOn),
              "dd/MM/yyyy"
            );

            if (!remoteActivitiesObj[dateString]) {
              remoteActivitiesObj[dateString] = [{ ...activity, id: doc.id }];
            } else {
              remoteActivitiesObj[dateString].push({ ...activity, id: doc.id });
            }
          }
        }

        setActivities(remoteActivitiesObj);

        // const startDate = new Date(new Date(after).toDateString());
        // let totalCals: number = 0;
        // let everyday: boolean = true;
        // for (let i = 0; i <= 6; i++) {
        //   const nowDateUnix = startDate.getTime() + i * 24 * 60 * 60 * 1000;
        //   const nowDateString = new Date(nowDateUnix).toDateString();

        //   const calCount = remoteActivitiesObj[nowDateString]
        //     ? remoteActivitiesObj[nowDateString]
        //     : 0;

        //   totalCals += calCount;

        //   if (!calCount) {
        //     everyday = false;
        //   }

        //   remoteActivities.push(calCount);
        // }

        // setActivities(remoteActivities);
        // setTotal(totalCals);
        // setEveryday(everyday);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, rangeStart, rangeEnd]);

  //   console.log("activities", activities);

  return {
    activities,
  };
};
