import { useEffect, useState } from "react";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { db } from "@config/firebase";
import { WorkoutSeries } from "@models/Workouts/Series";
import { useDaySeriesWorkout } from "../useDaySeriesWorkout";

export const useGlobalSeriesLives = (seriesAccess?: "GLOBAL") => {
  const [eventSeries, setEventSeries] = useState<WorkoutSeries[]>([]);
  const [eventSeriesIds, setEventSeriesIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (seriesAccess === "GLOBAL") {
      const q = query(
        collection(db, "workouts"),
        where("seriesAccess", "==", "GLOBAL")
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
    }
  }, [seriesAccess]);

  const remLives = useDaySeriesWorkout(eventSeriesIds, "lives");
  const remWorkouts = useDaySeriesWorkout(eventSeriesIds, "exercises");
  const remNutrition = useDaySeriesWorkout(eventSeriesIds, "nutrition");

  return {
    globalSeries: eventSeries,
    globalLives: remLives.dayActs,
    globalWorkouts: remWorkouts.dayActs,
    globalNutrition: remNutrition.dayActs,
    loading,
  };
};
