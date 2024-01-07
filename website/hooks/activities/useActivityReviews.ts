import { ReviewMessage } from "@models/Activities/Activity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  orderBy,
  query,
} from "firebase/firestore";

export const useActivityReviews = (uid?: string, activityId?: string) => {
  //   const [activities, setActivities] = useState<number[]>([]);
  //   const [total, setTotal] = useState<number>(0);
  const [messages, setMessages] = useState<ReviewMessage[]>([]);
  //   const [everyday, setEveryday] = useState<boolean>(false);

  //   console.log("uid", uid, after);

  useEffect(() => {
    if (uid && activityId) {
      const ref = collection(
        doc(doc(db, "users", uid), "activities", activityId),
        "activityReviews"
      );

      const q = query(ref, orderBy("createdOn", "desc"));

      const unsubscribe = onSnapshot(q, (docs) => {
        const msgs: ReviewMessage[] = [];
        for (const doc of docs.docs) {
          const msg = doc.data() as ReviewMessage;
          msgs.push(msg);
        }

        setMessages(msgs);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, activityId]);

  //   console.log("activities", activities);

  return {
    messages,
  };
};
