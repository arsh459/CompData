import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useMealStore } from "../store/useMealStore";
import { shallow } from "zustand/shallow";
import { SubTask } from "@models/Tasks/Task";

export const useSubTaskUpdate = (subTaskId: string) => {
  const setSubTask = useMealStore((state) => state.setSubTask, shallow);

  useEffect(() => {
    const listener = firestore()
      .collection("subTasks")
      .doc(subTaskId)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setSubTask(doc.data() as SubTask);
        }
      });

    return () => {
      listener();
    };
  }, [subTaskId]);
};
