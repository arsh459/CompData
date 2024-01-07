import { Task } from "@models/Tasks/Task";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export const useBadgeDayTasks = (badgeId?: string, day?: number) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (badgeId && typeof day === "number") {
      const keyStr = `${badgeId}_${day}`;

      const ref = firestore()
        .collection("tasks")
        .where("badgeDays", "array-contains", keyStr);

      const unsub = ref.onSnapshot((docs) => {
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

          const sorted = remTasks.sort((a, b) =>
            a.badgeDayPriority && b.badgeDayPriority
              ? a.badgeDayPriority[keyStr] - b.badgeDayPriority[keyStr]
              : 0
          );
          setTasks(sorted);
        }
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [badgeId, day]);

  return {
    tasks,
  };
};
