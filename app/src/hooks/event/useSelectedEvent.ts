import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
// import { db } from "@config/firebase";
import crashlytics from "@react-native-firebase/crashlytics";

import firestore from "@react-native-firebase/firestore";

export type eventVisibility = "community" | "preview" | "unknown";

export const useSelectedEvent = (
  // allEvents: EventInterface[],
  selectedEventId?: string
) => {
  const [selectedEvent, setSelectedEvent] = useState<EventInterface>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (selectedEventId) {
        const unsub = firestore()
          .collection("sbEvents")
          .doc(selectedEventId)
          .onSnapshot((doc) => {
            if (doc) {
              // const unsub = onSnapshot(
              //   doc(db, "sbEvents", selectedEventId),
              //   (doc) => {

              const data = doc.data() as EventInterface | undefined;
              // if event exists;
              if (data) {
                setSelectedEvent(data);
              }

              setLoading(false);
            }
          });

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
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [selectedEventId]);

  return {
    selectedEvent,
    loading,
  };
};
