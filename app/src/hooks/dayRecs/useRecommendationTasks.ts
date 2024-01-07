import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,
import { Task } from "@models/Tasks/Task";

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
      console.log(keyStr, "keyStr");
      const q = firestore()
        .collection("tasks")
        .where("badgeDays", "array-contains", keyStr);

      const unsub = q.onSnapshot((docs) => {
        const remTasks: Task[] = [];
        if (docs)
          for (const doc of docs.docs) {
            const remoteTask = doc.data() as Task;

            if (remoteTask.taskType !== "steps" && !remoteTask.preview) {
              remTasks.push(remoteTask);
            }
          }
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
