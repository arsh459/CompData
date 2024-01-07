import { useEffect, useState } from "react";
import { getDocs, query, where, doc, collection } from "firebase/firestore";
import { db } from "@config/firebase";
// import { Workout } from "@models/Workouts/Workout";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";

export const useDaySeriesNutrition = (
  seriesIds: string[],
  dayNumber?: number
) => {
  const [dayNutrition, setDayActs] = useState<{
    [serId: string]: NutritionPlan[];
  }>({});

  useEffect(() => {
    const fetchDayEvents = async () => {
      if (seriesIds.length && typeof dayNumber === "number" && dayNumber >= 0) {
        const remoteEventsForSeries: { [serId: string]: NutritionPlan[] } = {};

        for (const seriesId of seriesIds) {
          const ref = query(
            collection(doc(db, "workouts", seriesId), "nutrition"),
            where("day", "==", dayNumber)
          );

          const remoteDocs = await getDocs(ref);

          for (const remoteDoc of remoteDocs.docs) {
            const remDoc = remoteDoc.data() as NutritionPlan;
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
    dayNutrition,
  };
};
