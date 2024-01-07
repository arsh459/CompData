import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Task } from "@models/Tasks/Task";

export const useTask = (taskId?: string) => {
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    const getTask = async () => {
      if (taskId) {
        const badgeDoc = await firestore()
          .collection("tasks")
          .doc(taskId)
          .get();

        if (badgeDoc.data()) {
          setTask(badgeDoc.data() as Task);
        }
      }
    };

    getTask();
  }, [taskId]);

  return { task };
};
