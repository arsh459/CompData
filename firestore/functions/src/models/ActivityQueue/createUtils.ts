import { ActivityQueueItem } from "./ActivityQueue";
import { v4 as uuidv4 } from "uuid";
import * as admin from "firebase-admin";

export const createActivityTaskObject = (
  activityId: string,
  uid: string,
  nowCalories: number,
  previousCalories: number,
  unix: number,
  gameId: string,
): ActivityQueueItem => {
  return {
    state: "PENDING",
    createdOn: Date.now(),
    action: "UPDATE_ACTIVITY",
    id: uuidv4(),
    activityId,
    uid,
    nowCalories,
    previousCalories,
    effectiveUnix: unix,
    gameId,
  };
};

export const getQueueTaskObjects = async () => {
  const pendingTasks = await admin
    .firestore()
    .collection("queue")
    .where("state", "==", "PENDING")
    .orderBy("createdOn", "asc")
    .get();

  const tasks: ActivityQueueItem[] = [];
  for (const pendingTask of pendingTasks.docs) {
    tasks.push(pendingTask.data() as ActivityQueueItem);
  }

  console.log("TASKS:", tasks.length);

  return tasks;
};

export const updateQueueTaskObjects = async (
  tasks: ActivityQueueItem[],
  value: "PENDING" | "SUCCESS",
) => {
  for (const task of tasks) {
    await admin
      .firestore()
      .collection("queue")
      .doc(task.id)
      .update({ state: value });
  }
};
