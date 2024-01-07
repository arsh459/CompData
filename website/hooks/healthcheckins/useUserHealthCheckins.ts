import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { onSnapshot, query, limit, collection, doc } from "firebase/firestore";
import { CheckIn } from "@models/HealthCheckins/interface";

// {[activityId: string]: {post?: Post, task?: Task}}

export const useUserHealthCheckins = (num: number, userId?: string) => {
  const [allHealthCheckins, setHealthCheckins] = useState<CheckIn[]>();
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  // console.log("t", allHealthCheckins?.length);

  useEffect(() => {
    if (userId) {
      try {
        const q = query(
          collection(doc(db, "users", userId), "healthCheckins"),
          limit(numToFetch ? numToFetch : 100)
        );

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
    }
  }, [numToFetch, userId]);

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
