import { Activity } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const useActivityById = (uid?: string, activityId?: string) => {
  //   const [activities, setActivities] = useState<number[]>([]);
  //   const [total, setTotal] = useState<number>(0);
  const [act, setAct] = useState<Activity>();
  //   const [everyday, setEveryday] = useState<boolean>(false);

  //   console.log("uid", uid, after);

  useEffect(() => {
    if (uid && activityId) {
      const ref = doc(doc(db, "users", uid), "activities", activityId);

      //   console.log("q", q);
      const unsubscribe = onSnapshot(ref, (doc) => {
        const activity = doc.data() as Activity;
        setAct(activity);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, activityId]);

  //   console.log("activities", activities);

  return {
    act,
  };
};
