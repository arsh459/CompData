// import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  limit,
  //   Query,
  //   where,
  //   orderBy,
} from "firebase/firestore";
import { TerraActivity } from "@models/Terra/TerraUser";

export const useRawActivitiesExist = (uid?: string, activityId?: string) => {
  const [rawActivities, setRawActivities] = useState<TerraActivity[]>([]);
  const [actSum, setActSum] = useState<number>(0);
  //   const [total, setTotal] = useState<number>(0);
  //   const [everyday, setEveryday] = useState<boolean>(false);

  // console.log("here", lim);

  useEffect(() => {
    if (uid && activityId) {
      try {
        const q = query(
          collection(
            doc(collection(doc(db, "users", uid), "activities"), activityId),
            "raw"
          ),
          limit(1)
        );

        const unsubscribe = onSnapshot(q, (docs) => {
          // const remoteActivitiesObj: { [day: string]: Activity } = {};
          const remoteActivities: TerraActivity[] = [];

          let totalActSum: number = 0;
          for (const doc of docs.docs) {
            const activity = doc.data() as TerraActivity;

            totalActSum += activity?.calories_data?.net_activity_calories
              ? activity.calories_data.net_activity_calories
              : 0;
            remoteActivities.push(activity);
          }

          setActSum(Math.round(totalActSum));

          // console.log("remoteActivitiesObj", remoteActivitiesObj);

          setRawActivities(remoteActivities);
        });

        return () => {
          unsubscribe();
          setRawActivities([]);
        };
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setRawActivities([]);
    }
  }, [uid, activityId]);

  //   console.log("activities", activities);

  return {
    rawActivities,
    actSum,
  };
};
