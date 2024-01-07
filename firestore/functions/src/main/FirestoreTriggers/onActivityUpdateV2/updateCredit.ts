import * as admin from "firebase-admin";
import { getDayStartIST } from "../../PubSub/activityTracker/utils";

export const updateActivityCredit = async (
  uid: string,
  prevFPS: number,
  newFPS: number,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      fpCredit: admin.firestore.FieldValue.increment(-prevFPS + newFPS),
    });

  console.log("NEW WRITE in updateActivityCredit", 1);
};

export const updateStepsActivity = async (uid: string, currentUnix: number) => {
  const nowUnix = getDayStartIST(currentUnix);
  const dayEnd = nowUnix + 24 * 60 * 60 * 1000;

  const stepDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("steps")
    .where("unix", ">=", nowUnix)
    .where("unix", "<=", dayEnd)
    .get();

  for (const stepDoc of stepDocs.docs) {
    await stepDoc.ref.update({ updatedOn: currentUnix });
  }
};
