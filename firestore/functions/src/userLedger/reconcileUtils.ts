import * as admin from "firebase-admin";
import { updateActiveCustomers } from "../models/LeaderBoard/Methods";
import { userLedger } from "./interface";

export const reconcileReferrerStats = async (uid: string) => {
  const documents = await getAllUserReferrals(uid);

  const currentActive = documents.length;
  await updateActiveCustomers(uid, currentActive);
};

export const getAllUserReferrals = async (uid: string) => {
  const documents = await admin
    .firestore()
    .collection("userLedger")
    .where("referrerId", "==", uid)
    .where("expiresOn", ">=", new Date().getTime())
    .get();

  const referrals: userLedger[] = [];
  return documents.docs.reduce((acc, item) => {
    acc.push(item.data() as userLedger);
    return acc;
  }, referrals);
};
