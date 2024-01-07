import { Achiever } from "../../../../models/awards/interface";
import * as admin from "firebase-admin";

export const saveAchievers = async (
  uid: string,
  toSave: Achiever[],
  toRemove: string[],
  totalTargets: number,
  completedTargets?: number,
) => {
  const batch = admin.firestore().batch();

  for (const achiever of toSave) {
    batch.set(
      admin.firestore().collection("achievers").doc(achiever.id),
      achiever,
    );
  }

  for (const id of toRemove) {
    batch.delete(admin.firestore().collection("achievers").doc(id));
  }

  batch.update(admin.firestore().collection("users").doc(uid), {
    totalTargets,
    ...(completedTargets ? { completedTargets } : {}),
  });

  await batch.commit();
};
