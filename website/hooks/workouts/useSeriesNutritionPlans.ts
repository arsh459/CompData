import { useEffect, useState } from "react";
import {
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@config/firebase";
// import { Workout } from "@models/Workouts/Workout";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";

export const useSeriesNutritionPlans = (id?: string) => {
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (id) {
        const q = query(
          collection(doc(db, "workouts", id), "nutrition"),
          orderBy("day", "asc")
        );

        const unsub = onSnapshot(q, (docs) => {
          const remotePlans: NutritionPlan[] = [];
          for (const doc of docs.docs) {
            // console.log("doc", doc.data());
            remotePlans.push(doc.data() as NutritionPlan);
          }

          setNutritionPlans(remotePlans);
          setLoading(false);
        });

        return () => {
          if (unsub) {
            unsub();
            setNutritionPlans([]);
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
    nutritionPlans,
    loading,
  };
};
