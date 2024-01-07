import { Task } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
export const fetchTaskById = async (taskId: string) => {
  let taskDoc = await firestore().collection("tasks").doc(taskId).get();

  if (taskDoc.data()) {
    return taskDoc.data() as Task;
  }

  return undefined;
};
