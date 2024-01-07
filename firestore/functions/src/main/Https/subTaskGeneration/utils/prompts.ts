import { gptPrompts, gptTaskType } from "../../../../models/Room/Room";
import * as admin from "firebase-admin";

export const fetchPrompt = async (type: gptTaskType) => {
  let response = await admin
    .firestore()
    .collection("gptPrompts")
    .where("type", "==", type)
    .get();
  if (response) {
    const remotePrompts: gptPrompts[] = [];
    for (const doc of response.docs) {
      remotePrompts.push(doc.data() as gptPrompts);
    }
    return remotePrompts[0];
  }
  return undefined;
};
