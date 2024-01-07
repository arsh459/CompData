import * as admin from "firebase-admin";
import { Task } from "../../../../../models/Task/Task";

export const updateTasksInDb = async (tasks: Task[]) => {
  let i: number = 0;

  let newBatch = admin.firestore().batch();

  for (const task of tasks) {
    newBatch.update(admin.firestore().collection("tasks").doc(task.id), {
      ...task,
    });

    if (i > 398) {
      await newBatch.commit();

      // create a new batch
      newBatch = admin.firestore().batch();
      i = 0;
    }

    i++;
  }

  await newBatch.commit();
};
