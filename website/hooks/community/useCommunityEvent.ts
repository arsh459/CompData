import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export type eventVisibility = "community" | "preview" | "unknown";

export const useCommunityEvent = (
  // allEvents: EventInterface[],
  selectedEventId?: string
) => {
  const [selectedEvent, setSelectedEvent] = useState<EventInterface>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (selectedEventId) {
        const unsub = onSnapshot(
          doc(db, "sbEvents", selectedEventId),
          (doc) => {
            const data = doc.data() as EventInterface | undefined;
            // console.log("data", data);
            // if event exists;
            if (data) {
              setSelectedEvent(data);
            }

            setLoading(false);
          }
        );

        return () => {
          if (unsub) {
            unsub();
            setSelectedEvent(undefined);
            setLoading(false);
          }
        };
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [selectedEventId]);

  return {
    selectedEvent,
    loading,
  };
};
