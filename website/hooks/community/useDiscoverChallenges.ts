import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  query,
  collection,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";

export const useDiscoverChallenges = () => {
  const [challenges, setChallenges] = useState<EventInterface[]>([]);

  useEffect(() => {
    try {
      const unsub = onSnapshot(
        query(
          collection(db, "sbEvents"),
          where("eventType", "==", "challenge"),
          orderBy("updatedOn", "desc")
        ),
        (snapshot) => {
          const remoteChallenges: EventInterface[] = [];
          for (const doc of snapshot.docs) {
            const remoteEvent = doc.data() as EventInterface;
            if (!remoteEvent.parentId) {
              remoteChallenges.push(remoteEvent);
            }
          }

          setChallenges(remoteChallenges);
        }
      );

      return () => {
        if (unsub) {
          unsub();
        }
      };
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return {
    challenges,
  };
};
