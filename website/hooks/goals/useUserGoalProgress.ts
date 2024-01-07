import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { TaskProgress } from "@models/Tasks/Task";
import { Unsubscribe } from "firebase/auth";

export const useUserGoalProgress = (uid: string, taskIds?: string[]) => {
  const [taskProgressObj, setProgress] = useState<{
    [taskId: string]: TaskProgress;
  }>({});
  useEffect(() => {
    if (taskIds) {
      const listeners: Unsubscribe[] = [];
      for (const taskId of taskIds) {
        const taskRef = doc(db, "tasks", taskId);
        const q = doc(taskRef, "taskProgress", uid);

        const l = onSnapshot(q, (doc) => {
          const taskProgress = doc.data() as TaskProgress;
          if (taskProgress)
            setProgress((p) => {
              return {
                ...p,
                [taskId]: taskProgress,
              };
            });
        });

        listeners.push(l);
      }

      return () => {
        for (const listener of listeners) {
          listener();
        }
      };
    }
  }, [taskIds, uid]);

  return {
    taskProgressObj,
  };
};
