import * as admin from "firebase-admin";

export const handlePeriodSync = async (uid: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ [`waMessageStatus.periodSync`]: true });
};
