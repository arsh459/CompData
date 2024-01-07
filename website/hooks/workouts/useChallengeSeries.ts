import { useEffect, useState } from "react";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { db } from "@config/firebase";
import { WorkoutSeries } from "@models/Workouts/Series";
import { useDaySeriesWorkout } from "./useDaySeriesWorkout";
import { useDaySeriesNutrition } from "./useDaySeriesNutrition";
import { useDaySeriesLives } from "./useDaySeriesLives";

export const useChallengeSeries = (eventId?: string, dayNumber?: number) => {
  const [eventSeries, setEventSeries] = useState<WorkoutSeries[]>([]);
  const [eventSeriesIds, setEventSeriesIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (eventId) {
        const q = query(
          collection(db, "workouts"),
          where("eventIds", "array-contains", eventId)
        );

        const unsub = onSnapshot(q, (docs) => {
          const remSeries: WorkoutSeries[] = [];
          const remSeriesIds: string[] = [];
          for (const series of docs.docs) {
            const ser = series.data() as WorkoutSeries;
            remSeries.push(ser);
            remSeriesIds.push(ser.id);
          }

          setEventSeries(remSeries);
          setEventSeriesIds(remSeriesIds);

          setLoading(false);
        });

        return () => {
          if (unsub) {
            unsub();
            setEventSeries([]);
            setEventSeriesIds([]);
            setLoading(false);
          }
        };
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [eventId]);

  const { dayActs } = useDaySeriesWorkout(
    eventSeriesIds,
    "exercises",
    dayNumber
  );
  const { dayNutrition } = useDaySeriesNutrition(eventSeriesIds, dayNumber);
  const { dayLives } = useDaySeriesLives(eventSeriesIds, dayNumber);

  return {
    eventSeries,
    loading,
    dayActs,
    dayNutrition,
    dayLives,
  };
};
