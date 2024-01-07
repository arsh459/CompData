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
// import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { LiveClass } from "@models/Workouts/LiveClass";

export const useSeriesLives = (id?: string) => {
  const [lives, setLives] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (id) {
        const q = query(
          collection(doc(db, "workouts", id), "lives"),
          orderBy("day", "asc")
        );

        const unsub = onSnapshot(q, (docs) => {
          const remotePlans: LiveClass[] = [];
          for (const doc of docs.docs) {
            // console.log("doc", doc.data());
            remotePlans.push(doc.data() as LiveClass);
          }

          setLives(remotePlans);
          setLoading(false);
        });

        return () => {
          if (unsub) {
            unsub();
            setLives([]);
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
    lives,
    loading,
  };
};
