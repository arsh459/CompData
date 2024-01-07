import { Task } from "@models/Tasks/Task";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  onSnapshot,
  //   collection,
  //   query,
  //   limit,
  //   where,
  //   orderBy,
} from "firebase/firestore";

export const useWorkoutTask = (taskId?: string, wait?: boolean) => {
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (taskId && !wait) {
      // console.log("here");
      setLoading(true);
      const unsub = onSnapshot(doc(db, "tasks", taskId), (doc) => {
        setTask(doc.data() as Task);
        setLoading(false);
      });

      return () => {
        unsub();
      };
    }
  }, [taskId, wait]);

  return {
    task,
    loading,
  };
};
