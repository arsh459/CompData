import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { Activity } from "@models/Activities/Activity";
import {
  // doc,
  onSnapshot,
  // collection,
  query,
  //   limit,
  //   where,
  //   orderBy,
  where,
  collectionGroup,
} from "firebase/firestore";

export const useTickets = (uid?: string) => {
  const [tickets, setTickets] = useState<Activity[]>([]);
  useEffect(() => {
    if (uid) {
      const ref = collectionGroup(db, "activities");
      const q = query(ref, where("reviewRequestedBy", "array-contains", uid));
      const unsubscribe = onSnapshot(q, (docs) => {
        // const remoteActivitiesObj: { [day: string]: Activity } = {};
        const remoteActivities: Activity[] = [];

        for (const doc of docs.docs) {
          const activity = doc.data() as Activity;
          remoteActivities.push(activity);
        }

        // console.log("remoteActivitiesObj", remoteActivitiesObj);

        setTickets(remoteActivities);
      });

      return () => {
        unsubscribe();
        setTickets([]);
      };
    }
  }, [uid]);

  return {
    tickets,
  };
};
