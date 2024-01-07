import { db } from "@config/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { EventInterface } from "@models/Event/Event";

export const useUserEvents = (uid: string) => {
  const [userEvents, setUserEvents] = useState<EventInterface[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  useEffect(() => {
    try {
      if (uid) {
        const q = query(
          collection(db, "sbEvents"),
          where("ownerUID", "==", uid),
          orderBy("updatedOn", "desc")
        );
        const unsub = onSnapshot(q, (querySnapshot) => {
          const remoteEvents: EventInterface[] = [];
          querySnapshot.forEach((doc) => {
            remoteEvents.push(doc.data() as EventInterface);
          });

          setUserEvents(remoteEvents);
          setFetching(false);
        });

        return () => {
          if (unsub) {
            unsub();
          }
        };
      }
    } catch (error) {
      console.log("error in getting events", error);
    }
  }, [uid]);

  return {
    userEvents,
    fetching,
  };
};
