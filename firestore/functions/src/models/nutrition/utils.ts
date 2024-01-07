import * as admin from "firebase-admin";
import { createNewDoc, NutritionsDoc } from "./NutritionDoc";

export const addNutritionActivities = async (
  uid: string,
  day: string,
  kcal: number,
) => {
  const remoteDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("nutrition")
    .where("date", "==", day)
    .get();

  if (remoteDoc.docs.length) {
    const remoteStep = remoteDoc.docs[0].data() as NutritionsDoc;

    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("nutrition")
      .doc(remoteStep.id)
      .update({
        updatedOn: Date.now(),
        kcal,
      });
  } else {
    const createdOn = new Date(`${day} 00:00:00 +5:30`).getTime();
    const newDoc = createNewDoc(uid, kcal, day, createdOn);

    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("nutrition")
      .doc(newDoc.id)
      .set(newDoc);
  }
};
