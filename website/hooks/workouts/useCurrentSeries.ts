import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@config/firebase";
import { WorkoutSeries } from "@models/Workouts/Series";

export const useCurrentSeries = (id?: string) => {
  const [currentSeries, setCurrentSeries] = useState<WorkoutSeries>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (id) {
        const unsub = onSnapshot(doc(db, "workouts", id), (doc) => {
          setCurrentSeries(doc.data() as WorkoutSeries);

          setLoading(false);
        });

        return () => {
          if (unsub) {
            unsub();
            setCurrentSeries(undefined);
            setLoading(false);
          }
        };
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  return {
    currentSeries,
    loading,
  };
};
