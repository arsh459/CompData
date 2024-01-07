import { createLeaderboardTaskQueue } from "../../../models/LeaderboardUpdateTask/create";
import * as admin from "firebase-admin";
import { getLevelByNumber } from "../../../models/Level/getRelevantLevel";

export const addLederboardTaskFunc = async (
  uid: string,
  fp: number,
  lvl: number,
  createdOn: number,
) => {
  const lvlObj = await getLevelByNumber(lvl);
  if (lvlObj) {
    const newDoc = createLeaderboardTaskQueue(uid, fp, lvlObj?.id, createdOn);
    await admin.firestore().collection("taskQueue").doc(newDoc.id).set(newDoc);
  }
};
