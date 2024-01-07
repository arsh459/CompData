import { db } from "@config/firebase";
import { Task } from "@models/Tasks/Task";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useBadgeDayTasks = (badgeId: string, day: number) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (badgeId && typeof day === "number") {
      const keyStr = `${badgeId}_${day}`;

      const ref = query(
        collection(db, "tasks"),
        where("badgeDays", "array-contains", keyStr)

        // where("preview", "==", false)
      );

      onSnapshot(ref, (docs) => {
        const remTasks: Task[] = [];
        if (docs.docs) {
          if (docs)
            for (const doc of docs.docs) {
              const remoteTask = doc.data() as Task;

              if (
                remoteTask.taskType !== "steps" &&
                remoteTask.taskType !== "nutrition" &&
                !remoteTask.preview
              ) {
                remTasks.push(remoteTask);
              }
            }

          // const d = selectedDay;

          const sorted = remTasks.sort((a, b) =>
            a.badgeDayPriority && b.badgeDayPriority
              ? a.badgeDayPriority[keyStr] - b.badgeDayPriority[keyStr]
              : 0
          );
          setTasks(sorted);
        }
      });
    }
  }, [badgeId, day]);

  return {
    tasks,
  };
};
