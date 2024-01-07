import { db } from "@config/firebase";
import { Task } from "@models/Tasks/Task";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useRecommendationTasks = (
  badgeId?: string,
  badgeDay?: number,
  manual?: boolean,
  restDay?: boolean
) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!manual && badgeId && typeof badgeDay === "number" && !restDay) {
      const keyStr = `${badgeId}_${badgeDay}`;
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("badgeDays", "array-contains", keyStr));

      const unsub = onSnapshot(q, (snapshot) => {
        const remTasks: Task[] = [];

        snapshot.forEach((doc) => {
          const remoteTask = doc.data() as Task;

          if (remoteTask.taskType !== "steps" && !remoteTask.preview) {
            remTasks.push(remoteTask);
          }
        });

        const sorted = remTasks.sort((a, b) =>
          a.badgeDayPriority && b.badgeDayPriority
            ? a.badgeDayPriority[keyStr] - b.badgeDayPriority[keyStr]
            : 0
        );
        setTasks(sorted);
      });

      return () => {
        setTasks([]);
        unsub();
      };
    }
  }, [badgeId, badgeDay, manual, restDay]);

  return {
    tasks,
  };
};
