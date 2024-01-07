import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { onSnapshot, query, collectionGroup } from "firebase/firestore";
import { CheckIn } from "@models/HealthCheckins/interface";

// {[activityId: string]: {post?: Post, task?: Task}}

export const useHealthCheckins = (num: number) => {
  const [allHealthCheckins, setHealthCheckins] = useState<CheckIn[]>();
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  // console.log("t", allHealthCheckins?.length);

  useEffect(() => {
    try {
      // const q = query(
      //   collection(db, "stories"),
      //   limit(numToFetch ? numToFetch : 100)
      // );
      const q = query(collectionGroup(db, "healthCheckins"));
      const unsubscribe = onSnapshot(q, (allHealthCheckins) => {
        const remoteActivities: CheckIn[] = [];

        for (const doc of allHealthCheckins.docs) {
          const activity = doc.data() as CheckIn;
          remoteActivities.push(activity);
        }

        setNextMembersExist(remoteActivities.length === numToFetch);

        setHealthCheckins(remoteActivities);
      });

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log("error", error);
    }
  }, [numToFetch]);

  const onNext = () => {
    // console.log("here");
    setToFetch((prev) => (prev ? prev + 10 : prev));
  };

  return {
    onNext,
    nextExists,
    allHealthCheckins,
  };
};
