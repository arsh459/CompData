import { SubTask } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useSubTask = (id: string) => {
  const [subTask, setSubTask] = useState<SubTask>();

  useEffect(() => {
    if (id) {
      const unsubscribe = firestore()
        .collection("subTasks")
        .doc(id)
        .onSnapshot((doc) => {
          if (doc && doc.data()) {
            setSubTask(doc.data() as SubTask);
          }
        });
      return () => {
        unsubscribe();
      };
    }
  }, [id]);

  return {
    subTask,
  };
};
