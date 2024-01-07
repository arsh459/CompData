import { useEffect, useState } from "react";
import {
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { Workout } from "@models/Workouts/Workout";

export const useSeriesWorkouts = (id?: string) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      if (id) {
        const q = query(
          collection(doc(db, "workouts", id), "exercises"),
          orderBy("day", "asc")
        );

        const unsub = onSnapshot(q, (docs) => {
          const remoteWorkouts: Workout[] = [];
          for (const doc of docs.docs) {
            // console.log("doc", doc.data());
            remoteWorkouts.push(doc.data() as Workout);
          }

          setWorkouts(remoteWorkouts);
          setLoading(false);
        });

        return () => {
          if (unsub) {
            unsub();
            setWorkouts([]);
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
    workouts,
    loading,
  };
};
