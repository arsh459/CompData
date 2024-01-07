import { WorkoutActivitySelfie } from "@models/Workouts/WorkoutActivity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

export const useTaskImage = (taskId?: string, streamId?: string) => {
  const [selfie, setSelfie] = useState<WorkoutActivitySelfie>();
  const [loading, setLoading] = useState<boolean>(false);

  // console.log("taskId", taskId, streamId);

  useEffect(() => {
    try {
      if (taskId && streamId) {
        setLoading(true);
        const taskRef = doc(db, "tasks", taskId);
        const selfieRef = doc(taskRef, "streams", streamId);
        const privateCol = collection(selfieRef, "private");

        // console.log("here");

        const unsub = onSnapshot(privateCol, (privateCol) => {
          if (privateCol.docs && privateCol.docs.length) {
            setSelfie(privateCol.docs[0].data() as WorkoutActivitySelfie);
          }

          setLoading(false);
        });

        return () => {
          unsub();
          setLoading(false);
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [taskId, streamId]);

  return {
    selfie,
    loading,
  };
};
