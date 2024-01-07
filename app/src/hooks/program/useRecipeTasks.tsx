import { Task } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

export const useRecipeTasks = (): { tasks: Task[]; loading: boolean } => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);

      try {
        const docs = await firestore()
          .collection("tasks")
          .where("recipeBy", "!=", "")
          .where("taskType", "==", "nutrition")
          .get();

        const remTasks: Task[] = [];

        for (const doc of docs.docs) {
          const remoteTask = doc.data() as Task;
          remTasks.push(remoteTask);
        }

        setTasks(remTasks);
      } catch (e: any) {
        console.log("error in fetching recipe", e);
        crashlytics().recordError(e);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  return {
    tasks,
    loading,
  };
};
