import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { onSnapshot, collection, query, limit } from "firebase/firestore";
import { Story } from "@models/Stories/interface";

// {[activityId: string]: {post?: Post, task?: Task}}

export const useAllStories = (num: number) => {
  const [allStories, setStories] = useState<Story[]>();
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  // console.log("t", allStories?.length);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "stories"),
        limit(numToFetch ? numToFetch : 100)
      );

      const unsubscribe = onSnapshot(q, (allStories) => {
        const remoteActivities: Story[] = [];

        for (const doc of allStories.docs) {
          const activity = doc.data() as Story;
          remoteActivities.push(activity);
        }

        setNextMembersExist(remoteActivities.length === numToFetch);

        setStories(remoteActivities);
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
    allStories,
  };
};
