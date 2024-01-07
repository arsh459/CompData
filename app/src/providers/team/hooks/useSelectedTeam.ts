import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
// import { doc, onSnapshot } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";

export const useSelectedTeam = (selectedEventId?: string) => {
  const [team, setSelectedEvent] = useState<EventInterface>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (selectedEventId) {
        const unsub = firestore()
          .collection("sbEvents")
          .doc(selectedEventId)
          .onSnapshot(
            // doc(db, "sbEvents", selectedEventId),
            (doc) => {
              if (doc) {
                const data = doc.data() as EventInterface | undefined;
                if (data) {
                  setSelectedEvent(data);
                }

                setLoading(false);
              }
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
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [selectedEventId]);

  return {
    team,
    loading,
  };
};
