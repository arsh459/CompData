import { Task } from "@models/Tasks/Task";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "@config/firebase";
import { v4 as uuidv4 } from "uuid";

export const createNewTask = (uid: string): Task => {
  const now = Date.now();
  return {
    id: uuidv4(),
    createdOn: now,
    updatedOn: now,
  };
};

export const saveNewTask = async (task: Task) => {
  try {
    const now = Date.now();
    const taskRef = doc(db, "tasks", task.id);
    await setDoc(taskRef, { ...task, updatedOn: now });
  } catch (error) {
    console.log("error", error);
  }
};
