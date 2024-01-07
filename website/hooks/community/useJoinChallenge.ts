import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  where,
  onSnapshot,
  query,
  collection,
  orderBy,
  limit,
} from "firebase/firestore";
import { EventInterface } from "@models/Event/Event";

export const useJoinChallenge = (eventId?: string, nums?: number) => {
  const [childEvents, saveChildEvents] = useState<EventInterface[]>([]);
  const [numToFetch, setToFetch] = useState<number>(nums ? nums : 99);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);
  // console.log("childEvents", childEvents);

  useEffect(() => {
    if (eventId) {
      const q = query(
        collection(db, "sbEvents"),
        where("parentId", "==", eventId),
        orderBy("updatedOn", "desc"),
        limit(numToFetch)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const remoteEvents: EventInterface[] = [];
        for (const doc of snapshot.docs) {
          const childEvent = doc.data() as EventInterface;
          remoteEvents.push(childEvent);
        }

        setNextMembersExist(remoteEvents.length === numToFetch);
        saveChildEvents(remoteEvents);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [eventId, numToFetch]);

  const onNext = () => {
    // console.log("here");
    setToFetch((prev) => prev + 6);
  };

  return {
    childEvents,
    onNext,
    nextExists,
  };
};
