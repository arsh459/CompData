import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  limit,
  //   where,
  orderBy,
} from "firebase/firestore";

export const useActivities = (
  uid?: string,
  num?: number,
  sortBy?: "asc" | "desc"
) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);
  //   const [total, setTotal] = useState<number>(0);
  //   const [everyday, setEveryday] = useState<boolean>(false);

  //   console.log("uid", uid, after);

  useEffect(() => {
    if (uid) {
      try {
        const q = query(
          collection(doc(db, "users", uid), "activities"),
          // where("createdOn", ">=", after),
          orderBy("createdOn", sortBy ? sortBy : "asc"),
          limit(numToFetch ? numToFetch : 100)
        );
        const unsubscribe = onSnapshot(q, (docs) => {
          // const remoteActivitiesObj: { [day: string]: Activity } = {};
          const remoteActivities: Activity[] = [];

          for (const doc of docs.docs) {
            const activity = doc.data() as Activity;
            remoteActivities.push(activity);
          }

          // console.log("remoteActivitiesObj", remoteActivitiesObj);

          setNextMembersExist(remoteActivities.length === numToFetch);
          setActivities(remoteActivities);
        });

        return () => {
          unsubscribe();
          setActivities([]);
        };
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [uid, numToFetch, sortBy]);

  const onNext = () => {
    // console.log("here");
    setToFetch((prev) => (prev ? prev + 10 : prev));
  };

  //   console.log("activities", activities);

  return {
    activities,
    onNext,
    nextExists,
  };
};
