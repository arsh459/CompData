import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "config/firebase";
import { EventKPIs } from "@models/Event/Event";

export const useEventKPIsDoc = (eventId?: string) => {
  const [eventKPIs, setEventKPIs] = useState<EventKPIs>();

  useEffect(() => {
    try {
      if (eventId) {
        const eventRef = doc(db, "sbEvents", eventId);
        const unsubscribe = onSnapshot(
          doc(collection(eventRef, "eventKPIs"), "eventKPIs"),
          (doc) => {
            setEventKPIs(doc.data() as EventKPIs);
          }
        );

        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [eventId]);

  return { eventKPIs };
};
