import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useMealStore } from "../store/useMealStore";
import { shallow } from "zustand/shallow";
import { Task } from "@models/Tasks/Task";

export const useTaskUpdate = (taskId: string) => {
  const setTask = useMealStore((state) => state.setTask, shallow);

  useEffect(() => {
    const listener = firestore()
      .collection("tasks")
      .doc(taskId)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setTask(doc.data() as Task);
        }
      });

    return () => {
      listener();
    };
  }, [taskId]);
};
