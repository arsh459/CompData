import { v4 as uuid } from "uuid";
import * as admin from "firebase-admin";

export interface StepsDoc {
  id: string;
  date: string;
  uid: string;
  steps: number;
  updatedOn: number;

  unix: number;
}

export const createNewDoc = (
  uid: string,
  steps: number,
  date: string,
  unix: number,
  id?: string,
): StepsDoc => {
  return {
    uid,
    steps,
    date,
    updatedOn: Date.now(),
    id: id ? id : uuid(),

    unix,
  };
};

export const getStepDocs = async (uid: string) => {
  const remDocs: StepsDoc[] = [];
  const stepDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("steps")
    .get();

  for (const doc of stepDocs.docs) {
    remDocs.push(doc.data() as StepsDoc);
  }

  return remDocs;
};

export const getStepDocsInRange = async (
  uid: string,
  start: number,
  end: number,
) => {
  const remDocs: StepsDoc[] = [];
  const stepDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("steps")
    .where("unix", ">=", start)
    .where("unix", "<=", end)
    .get();

  for (const doc of stepDocs.docs) {
    remDocs.push(doc.data() as StepsDoc);
  }

  return remDocs;
};
