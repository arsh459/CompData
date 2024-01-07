import { WorkoutActivity } from "@models/Workouts/WorkoutActivity";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot, query, where, collection } from "firebase/firestore";

export const useWorkoutTaskStream = (taskId?: string, uid?: string) => {
  const [userStream, setUserStream] = useState<WorkoutActivity>();
  const [loading, setLoading] = useState<boolean>(false);

  // console.log("t", taskId, uid);

  useEffect(() => {
    if (taskId && uid) {
      const now = new Date();

      setLoading(true);
      const taskRef = doc(db, "tasks", taskId);
      const q = query(
        collection(taskRef, "streams"),
        where(
          "date",
          "==",
          `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
        ),
        where("uid", "==", uid)
      );

      const unsub = onSnapshot(q, (docs) => {
        if (docs.docs.length > 0) {
          // console.log("zhHH");
          const remote = docs.docs[0].data() as WorkoutActivity;
          setUserStream(remote);
        } else {
          // setUserStream(undefined);
        }

        setLoading(false);
      });

      return () => {
        unsub();
        setLoading(false);
        // setUserStream(undefined);
      };
    } else {
      // setUserStream(undefined);
    }
  }, [taskId, uid]);

  return {
    userStream,
    loading,
    setLoading,
  };
};
