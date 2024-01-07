import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@config/firebase";
import { Workout } from "@models/Workouts/Workout";

export const useSeriesWorkout = (id?: string, workoutId?: string) => {
  const [workout, setWorkout] = useState<Workout>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (id && workoutId) {
        const unsub = onSnapshot(
          doc(doc(db, "workouts", id), "exercises", workoutId),
          (doc) => {
            setWorkout(doc.data() as Workout);
            setLoading(false);
          }
        );

        return () => {
          if (unsub) {
            unsub();
            setWorkout(undefined);
            setLoading(false);
          }
        };
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [id, workoutId]);

  return {
    workout,
    loading,
  };
};
