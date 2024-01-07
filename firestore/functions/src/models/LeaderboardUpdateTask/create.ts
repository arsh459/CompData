import { v4 as uuidv4 } from "uuid";
import * as admin from "firebase-admin";
import { LeaderboardUpdateTask } from "./LeaderboardUpdateTask";

export const createLeaderboardTaskQueue = (
  uid: string,
  fp: number,
  levelId: string,
  createdOn: number,
): LeaderboardUpdateTask => {
  return {
    uid,
    fp,
    levelId,
    id: uuidv4(),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    status: "pending",
    incTime: createdOn,
  };
};

export const markTaskFailed = async (id: string) => {
  await admin
    .firestore()
    .collection("taskQueue")
    .doc(id)
    .update({ status: "error" });
};
