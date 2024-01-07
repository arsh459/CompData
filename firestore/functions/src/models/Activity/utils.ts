import * as admin from "firebase-admin";
import { Activity } from "./Activity";

export const getUserTodayNutritionActivities = async (
  uid: string,
  start: number,
  end: number,
) => {
  const userActivities = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", start)
    .where("createdOn", "<=", end)
    .where("source", "==", "nutrition")
    .get();

  const acts: Activity[] = [];
  for (const act of userActivities.docs) {
    acts.push(act.data() as Activity);
  }

  return acts;
};
