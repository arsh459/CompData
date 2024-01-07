import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@config/firebase";
// import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { LiveClass } from "@models/Workouts/LiveClass";

export const useSeriesLive = (id?: string, liveId?: string) => {
  const [live, setLive] = useState<LiveClass>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (id && liveId) {
        const unsub = onSnapshot(
          doc(doc(db, "workouts", id), "lives", liveId),
          (doc) => {
            setLive(doc.data() as LiveClass);
            setLoading(false);
          }
        );

        return () => {
          if (unsub) {
            unsub();
            setLive(undefined);
            setLoading(false);
          }
        };
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [id, liveId]);

  return {
    live,
    loading,
  };
};
