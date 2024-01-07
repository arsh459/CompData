import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
// import { db } from "@config/firebase";
// import { doc, onSnapshot } from "firebase/firestore";

export type eventVisibility = "community" | "preview" | "unknown";

export const useCommunityEventCache = (
  allEvents: EventInterface[],
  selectedEventId: string
) => {
  const [selectedEvent, setSelectedEvent] = useState<EventInterface>();

  useEffect(() => {
    // console.log("here");
    if (selectedEventId) {
      const filtered = allEvents.filter(
        (event) => event.id === selectedEventId
      );

      // console.log("f", filtered.length);

      if (filtered.length > 0) {
        setSelectedEvent(filtered[0]);

        // setEventViewState("community");
      }
    } else {
      setSelectedEvent(undefined);
    }

    // else if (allEvents.length) {
    //   setSelectedEvent(allEvents[0]);
    // }
  }, [allEvents, selectedEventId]);

  return {
    selectedEvent,
  };
};
