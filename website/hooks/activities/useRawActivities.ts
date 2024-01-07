// import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  // limit,
  // Query,
  //   where,
  // orderBy,
} from "firebase/firestore";
import { FirestoreTerra } from "@models/Terra/TerraUser";
import { NOISE_CANCELLATION_TH } from "@constants/gameStats";

export const useRawActivities = (
  uid?: string,
  activityId?: string,
  viewState?: boolean
  // lim?: number
) => {
  const [rawActivities, setRawActivities] = useState<FirestoreTerra[]>([]);
  const [actSum, setActSum] = useState<number>(0);
  const [countedSum, setCountedSum] = useState<number>(0);
  //   const [total, setTotal] = useState<number>(0);
  //   const [everyday, setEveryday] = useState<boolean>(false);

  // console.log("here", lim);

  useEffect(() => {
    if (uid && activityId && viewState) {
      try {
        const q = query(
          collection(
            doc(collection(doc(db, "users", uid), "activities"), activityId),
            "raw"
          ),
          orderBy("createdOnUnix", "asc")
        );

        // console.log("q", q);

        const unsubscribe = onSnapshot(q, (docs) => {
          // const remoteActivitiesObj: { [day: string]: Activity } = {};
          const remoteActivities: FirestoreTerra[] = [];

          let totalActSum: number = 0;
          let countedSum: number = 0;
          for (const doc of docs.docs) {
            const activity = doc.data() as FirestoreTerra;

            totalActSum += activity?.calories_data?.net_activity_calories
              ? activity.calories_data.net_activity_calories
              : 0;

            if (
              activity?.calories_data?.net_activity_calories &&
              activity?.calories_data?.net_activity_calories >
                NOISE_CANCELLATION_TH
            ) {
              countedSum += activity?.calories_data?.net_activity_calories;
            }

            remoteActivities.push(activity);
          }

          setActSum(Math.round(totalActSum));
          setCountedSum(Math.round(countedSum));

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
  }, [uid, activityId, viewState]);

  //   console.log("activities", activities);

  return {
    rawActivities,
    actSum,
    countedSum,
  };
};
