import { useEffect, useState } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "@config/firebase";
import { WorkoutSeries } from "@models/Workouts/Series";

export const useWorkoutSeries = (uid?: string, seriesId?: string) => {
  const [series, setSeries] = useState<WorkoutSeries[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<
    WorkoutSeries | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (series && seriesId) {
      setSelectedSeries(series.filter((item) => item.id === seriesId)[0]);
    }
  }, [seriesId, series]);

  useEffect(() => {
    try {
      if (uid) {
        const q = query(
          collection(db, "workouts"),
          where("ownerUID", "==", uid)
        );

        const unsub = onSnapshot(q, (docs) => {
          const remoteWorkouts: WorkoutSeries[] = [];
          for (const doc of docs.docs) {
            remoteWorkouts.push(doc.data() as WorkoutSeries);
          }

          setSeries(remoteWorkouts);
          setLoading(false);
        });

        return () => {
          if (unsub) {
            unsub();
            setSeries([]);
            setLoading(false);
          }
        };
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [uid]);

  return {
    series,
    loading,
    selectedSeries,
    setSelectedSeries,
  };
};
