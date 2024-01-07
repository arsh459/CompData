import { WorkoutActivity } from "@models/Workouts/WorkoutActivity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const useWorkoutTaskStreamById = (
  taskId?: string,
  streamId?: string
) => {
  const [userStream, setUserStream] = useState<WorkoutActivity>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (taskId && streamId) {
      setLoading(true);
      const taskRef = doc(db, "tasks", taskId);
      const streamRef = doc(taskRef, "streams", streamId);

      const unsub = onSnapshot(streamRef, (doc) => {
        setUserStream(doc.data() as WorkoutActivity);
        setLoading(false);
      });

      return () => {
        unsub();
        setLoading(false);
      };
    }
  }, [taskId, streamId]);

  return {
    userStream,
    loading,
    setLoading,
  };
};
