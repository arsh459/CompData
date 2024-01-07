import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@config/firebase";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";

export const useSeriesNutrition = (id?: string, nutritionId?: string) => {
  const [nutrition, setNutrition] = useState<NutritionPlan>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (id && nutritionId) {
        const unsub = onSnapshot(
          doc(doc(db, "workouts", id), "nutrition", nutritionId),
          (doc) => {
            setNutrition(doc.data() as NutritionPlan);
            setLoading(false);
          }
        );

        return () => {
          if (unsub) {
            unsub();
            setNutrition(undefined);
            setLoading(false);
          }
        };
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [id, nutritionId]);

  return {
    nutrition,
    loading,
  };
};
