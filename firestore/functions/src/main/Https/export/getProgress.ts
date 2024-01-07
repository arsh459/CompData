import { Activity } from "../../../models/Activity/Activity";
import {
  getEnergyDaysAfter,
  getMoodDaysAfter,
  getSleepDaysAfter,
  getWeightDaysAfter,
} from "../../../models/User/roadmap";
import * as admin from "firebase-admin";

export const getUserProgressValue = async (
  uid: string,
  start: number,
  end: number,
) => {
  const moods = await getMoodDaysAfter(uid, start, end);
  const energy = await getEnergyDaysAfter(uid, start, end);
  const sleep = await getSleepDaysAfter(uid, start, end);
  const weight = await getWeightDaysAfter(uid, start);

  return {
    moods,
    energy,
    sleep,
    weight,
  };
};

export const getNonZeroActivities = async (uid: string, start: number) => {
  const acts = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", start)
    .where("canFetch", "==", true)
    .get();

  const activitiesInDB: Activity[] = [];
  for (const actDoc of acts.docs) {
    const act = actDoc.data() as Activity;
    activitiesInDB.push(act);
  }

  return activitiesInDB;
};
