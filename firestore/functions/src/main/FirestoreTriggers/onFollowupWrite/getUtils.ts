import * as admin from "firebase-admin";
import { userFollowup } from "../../../models/User/User";

export const getAllFollowups = async (uid: string) => {
  const allDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("followups")
    .orderBy("followupTime", "asc")
    .get();

  const follows: userFollowup[] = [];
  for (const doc of allDocs.docs) {
    follows.push(doc.data() as userFollowup);
  }

  return follows;
};

export const getLatestFollowup = async (uid: string) => {
  const allDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("followups")
    .orderBy("followupTime", "desc")
    .limit(1)
    .get();

  if (allDocs.docs.length) {
    return allDocs.docs[0].data() as userFollowup;
  }

  return undefined;
};
