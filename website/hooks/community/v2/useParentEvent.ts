import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { EventInterface } from "@models/Event/Event";

export const useParentEvent = (parentId?: string) => {
  const [selectedEvent, setSelectedEvent] = useState<EventInterface>();
  useEffect(() => {
    if (parentId) {
      const unsub = onSnapshot(doc(db, "sbEvents", parentId), (doc) => {
        const data = doc.data() as EventInterface | undefined;
        // console.log("data", data);
        // if event exists;
        if (data) {
          setSelectedEvent(data);
        }
      });

      return () => {
        unsub();
      };
    }
  }, [parentId]);

  return {
    parentEvent: selectedEvent,
  };
};
