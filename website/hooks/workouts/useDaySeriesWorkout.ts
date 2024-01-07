import { useEffect, useState } from "react";
import {
  getDocs,
  query,
  where,
  doc,
  collection,
  Query,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { Workout } from "@models/Workouts/Workout";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { LiveClass } from "@models/Workouts/LiveClass";

export const useDaySeriesWorkout = (
  seriesIds: string[],
  key: "exercises" | "nutrition" | "lives",
  dayNumber?: number
) => {
  const [dayActs, setDayActs] = useState<{
    [serId: string]: (Workout | NutritionPlan | LiveClass)[];
  }>({});

  useEffect(() => {
    const fetchDayEvents = async () => {
      if (seriesIds.length) {
        const remoteEventsForSeries: {
          [serId: string]: (Workout | NutritionPlan | LiveClass)[];
        } = {};

        for (const seriesId of seriesIds) {
          let q: Query | undefined = undefined;

          if (typeof dayNumber === "number" && dayNumber >= 0) {
            q = query(
              collection(doc(db, "workouts", seriesId), key),
              where("day", "==", dayNumber)
            );
          } else {
            q = query(collection(doc(db, "workouts", seriesId), key));
          }

          const remoteDocs = await getDocs(q);

          for (const remoteDoc of remoteDocs.docs) {
            let remDoc: Workout | NutritionPlan | LiveClass | undefined =
              undefined;
            if (key === "exercises") {
              remDoc = remoteDoc.data() as Workout;
            } else if (key === "nutrition") {
              remDoc = remoteDoc.data() as NutritionPlan;
            } else {
              remDoc = remoteDoc.data() as LiveClass;
            }

            if (remoteEventsForSeries[seriesId]) {
              remoteEventsForSeries[seriesId].push(remDoc);
            } else {
              remoteEventsForSeries[seriesId] = [remDoc];
            }
          }
        }

        setDayActs(remoteEventsForSeries);
      } else {
        setDayActs({});
      }
    };

    fetchDayEvents();
  }, [seriesIds, dayNumber, key]);

  return {
    dayActs,
  };
};
