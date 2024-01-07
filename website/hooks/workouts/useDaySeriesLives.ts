import { useEffect, useState } from "react";
import { getDocs, query, where, doc, collection } from "firebase/firestore";
import { db } from "@config/firebase";
// import { Workout } from "@models/Workouts/Workout";
// import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { LiveClass } from "@models/Workouts/LiveClass";

export const useDaySeriesLives = (seriesIds: string[], dayNumber?: number) => {
  const [dayLives, setDayActs] = useState<{
    [serId: string]: LiveClass[];
  }>({});

  useEffect(() => {
    const fetchDayEvents = async () => {
      if (seriesIds.length && typeof dayNumber === "number" && dayNumber >= 0) {
        const remoteEventsForSeries: { [serId: string]: LiveClass[] } = {};

        for (const seriesId of seriesIds) {
          const ref = query(
            collection(doc(db, "workouts", seriesId), "lives"),
            where("day", "==", dayNumber)
          );

          const remoteDocs = await getDocs(ref);

          for (const remoteDoc of remoteDocs.docs) {
            const remDoc = remoteDoc.data() as LiveClass;
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
  }, [seriesIds, dayNumber]);

  return {
    dayLives,
  };
};
