import * as admin from "firebase-admin";
import {
  ProgressCollectionType,
  dailyEnergyObj,
  dailyMoodObj,
  dailyWeightObj,
} from "./interface";

export const getLastKPI = async (
  uid: string,
  collectionName: ProgressCollectionType,
) => {
  const stepDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection(collectionName)
    .orderBy("unix", "desc")
    .limit(1)
    .get();

  if (stepDocs.docs.length) {
    if (collectionName === "dailyWeight") {
      return stepDocs.docs[0].data() as dailyWeightObj;
    } else if (collectionName === "dailyEnergy") {
      return stepDocs.docs[0].data() as dailyEnergyObj;
    } else {
      return stepDocs.docs[0].data() as dailyMoodObj;
    }
  }

  return undefined;
};

export const getKPIObjsInRange = async (
  uid: string,
  collectionName: ProgressCollectionType,
  start: number,
  end: number,
) => {
  const stepDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection(collectionName)
    .where("unix", ">=", start)
    .where("unix", "<=", end)
    .orderBy("unix", "asc")
    .get();

  if (collectionName === "dailyWeight") {
    const remDocs: dailyWeightObj[] = [];
    for (const doc of stepDocs.docs) {
      remDocs.push(doc.data() as dailyWeightObj);
    }
    return remDocs;
  } else if (collectionName === "dailyEnergy") {
    const remDocs: dailyEnergyObj[] = [];
    for (const doc of stepDocs.docs) {
      remDocs.push(doc.data() as dailyEnergyObj);
    }
    return remDocs;
  } else {
    const remDocs: dailyMoodObj[] = [];
    for (const doc of stepDocs.docs) {
      remDocs.push(doc.data() as dailyMoodObj);
    }

    return remDocs;
  }
};
