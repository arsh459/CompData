import * as admin from "firebase-admin";

export const updatePurchaseDebit = async (
  uid: string,
  prevFPS: number,
  newFPS: number,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      fpDebit: admin.firestore.FieldValue.increment(-prevFPS + newFPS),
    });
};
