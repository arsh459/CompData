import * as admin from "firebase-admin";
import { LeaderboardUpdateTask } from "./LeaderboardUpdateTask";

export const getQueue = async (): Promise<LeaderboardUpdateTask[]> => {
  const tasks: LeaderboardUpdateTask[] = [];
  const q = await admin
    .firestore()
    .collection("taskQueue")
    .where("status", "==", "pending")
    .orderBy("timestamp", "asc")
    .get();

  for (const doc of q.docs) {
    tasks.push(doc.data() as LeaderboardUpdateTask);
  }

  return tasks;
};
