import { Task } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

export type fetchingState = "PENDING" | "DONE" | "LOADING" | "FAILED";

export const useReelTasks = (
  badgeId?: string
): { tasks: Task[]; loading: fetchingState } => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<fetchingState>("PENDING");

  useEffect(() => {
    const getTasks = async () => {
      if (badgeId) {
        setLoading("LOADING");

        try {
          // const keyStr = `${badgeId}_0`;

          const docs = await firestore()
            .collection("tasks")
            .where("badgeIds", "array-contains", badgeId)
            // .where("badgeDays", "array-contains", keyStr)
            .where("preview", "==", true)
            .get();

          const remTasks: Task[] = [];

          for (const doc of docs.docs) {
            const remoteTask = doc.data() as Task;
            remTasks.push(remoteTask);
          }

          const sorted = remTasks.sort((a, b) =>
            a.priority && b.priority ? a.priority - b.priority : 0
          );

          setTasks(sorted);
          setLoading("DONE");
        } catch (e: any) {
          console.log("error in fetching recipe", e);
          setLoading("FAILED");
          crashlytics().recordError(e);
        } finally {
          setLoading("DONE");
        }
      }
    };

    getTasks();
  }, [badgeId]);

  return {
    tasks,
    loading,
  };
};
