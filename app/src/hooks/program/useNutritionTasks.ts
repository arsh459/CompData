import { MealTypes, Task } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

export const useNutritionTasks = (
  badgeId: string | undefined,
  mealType: MealTypes,
  fetch: boolean
  // dishRestriction?:
) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);

      const docs = await firestore()
        .collection("tasks")
        .where("badgeIds", "array-contains", badgeId)
        .where("mealTypes", "==", mealType)
        .get();

      const remTasks: Task[] = [];

      if (docs) {
        for (const doc of docs.docs) {
          const remoteTask = doc.data() as Task;
          if (remoteTask.taskType === "nutrition") {
            remTasks.push(remoteTask);
          }
        }
      }

      // const d = selectedDay;
      // const sortedTasks = remTasks.sort((a, b) =>
      //   a.priorityObj && b.priorityObj ? a.priorityObj[d] - b.priorityObj[d] : 0
      // );

      setTasks(remTasks);
      setLoading(false);
    };

    if (badgeId && mealType && fetch) {
      getTasks().catch((e) => {
        console.log("error in nutrition", e);
        crashlytics().recordError(e);
      });
    }
  }, [mealType, fetch, badgeId]);

  return {
    tasks,
    loading,
  };
};

export default useNutritionTasks;
