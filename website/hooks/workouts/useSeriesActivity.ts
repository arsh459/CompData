import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@config/firebase";
import { Workout } from "@models/Workouts/Workout";
import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";

export const useSeriesActivity = (
  id?: string,
  workoutId?: string,
  key?: "lives" | "exercises" | "nutrition"
) => {
  const [workoutRt, setWorkout] = useState<
    Workout | LiveClass | NutritionPlan
  >();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (id && workoutId) {
        const unsub = onSnapshot(
          doc(doc(db, "workouts", id), key ? key : "exercises", workoutId),
          (doc) => {
            setWorkout(
              key === "lives"
                ? (doc.data() as LiveClass)
                : key === "nutrition"
                ? (doc.data() as NutritionPlan)
                : (doc.data() as Workout)
            );
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
  }, [id, workoutId, key]);

  return {
    workoutRt,
    loading,
  };
};
