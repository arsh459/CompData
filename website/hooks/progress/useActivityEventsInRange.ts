import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@config/firebase";
import { Event } from "react-big-calendar";
import { Activity } from "@models/Activities/Activity";
import { selectedFpSectionType } from "@modules/ProgressModule/PointsMain/utils";
import { getSubTaskEvents } from "./getSubTaskEvents";

export interface DayStepDoc {
  id: string;
  date: string;
  uid: string;
  steps: number;
  updatedOn: number;
  unix: number;
}

export const useActivityInRange = (
  uid: string,
  start: number,
  end: number,
  selectedView: selectedFpSectionType
) => {
  // const { state } = useAuthContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const { game } = useGameContext();

  useEffect(() => {
    if (uid) {
      setLoading(true);
      const listener = onSnapshot(
        query(
          collection(doc(db, "users", uid), "activities"),
          where("createdOn", ">=", start),
          where("createdOn", "<=", end)
        ),
        async (docs) => {
          const dayEvents: Event[] = [];
          for (const doc of docs.docs) {
            const dayEvent = doc.data() as Activity;

            if (dayEvent.calories && dayEvent.createdOn) {
              const fp = Math.round(dayEvent.calories / 300);

              let go: boolean = false;
              if (selectedView === "All") {
                go = true;
              } else if (
                selectedView === "Diet" &&
                dayEvent.source === "nutrition"
              ) {
                go = true;
              } else if (
                selectedView === "Workout" &&
                !dayEvent.stepsActive &&
                dayEvent.source === "task"
              ) {
                go = true;
              } else if (selectedView === "Steps" && dayEvent.stepsActive) {
                go = true;
              }

              if (go && dayEvent.source !== "nutrition") {
                let title: string = dayEvent.activityName
                  ? `${fp}fp ${dayEvent.activityName}`
                  : "no name";

                dayEvents.push({
                  title: title,
                  start: new Date(dayEvent.createdOn),
                  end: new Date(dayEvent.createdOn + 30 * 60 * 1000),
                });
              } else if (go) {
                const newEvents = await getSubTaskEvents(dayEvent);

                dayEvents.push(...newEvents);
              }
            }
          }

          setLoading(false);
          setEvents(dayEvents);
        }
      );

      return () => {
        listener();
      };
    }
  }, [uid, start, end, selectedView]);

  return {
    events,
    loading,
    selectedView,
  };
};
