import * as admin from "firebase-admin";
import { loggedSymptomDB, symptomTypes, sympyomType } from "./symptoms";
import { periodDateType } from "./User";

export const updateSymptomOnRefresh = async (
  uid: string,
  id: string,
  phase: periodDateType,
  cycleId: string,
  day?: number,
  phaseProgress?: number,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("loggedSymptoms")
    .doc(id)
    .update({
      phase,
      cycleId,
      ...(typeof day === "number" ? { day } : {}),
      ...(typeof phaseProgress === "number" ? { phaseProgress } : {}),
    });
};

export const getHeavyFlow = async (uid: string, cycleId: string) => {
  const phaseSymptomsDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("loggedSymptoms")
    .where("cycleId", "==", cycleId)
    .where("symptomId", "==", "heavyFlow")
    .limit(1)
    .get();

  if (phaseSymptomsDocs.docs.length) {
    phaseSymptomsDocs.docs[0].data() as loggedSymptomDB;
  }

  return undefined;
};

export const getPhaseSymptoms = async (uid: string, phase: periodDateType) => {
  const phaseSymptomsDocs = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("loggedSymptoms")
    .where("phase", "==", phase)
    .get();

  const loggedSymps: loggedSymptomDB[] = [];
  for (const phaseSymptom of phaseSymptomsDocs.docs) {
    loggedSymps.push(phaseSymptom.data() as loggedSymptomDB);
  }

  return loggedSymps;
};

export const getMarkedSymptoms = async (uid: string) => {
  const lastSymptomDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("loggedSymptoms")
    .where("resolutionStatus", "==", "MARKED")
    .orderBy("createdOn", "desc")
    .limit(3)
    .get();

  const symps: loggedSymptomDB[] = [];
  for (const doc of lastSymptomDoc.docs) {
    symps.push(doc.data() as loggedSymptomDB);
  }

  console.log("Marked symptoms", symps.length);

  return symps;
};

export const hasMarkedSymptoms = async (uid: string, type: sympyomType) => {
  const lastSymptomDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("loggedSymptoms")
    .where("resolutionStatus", "==", "MARKED")
    .limit(1)
    .get();

  const symps: loggedSymptomDB[] = [];
  for (const doc of lastSymptomDoc.docs) {
    const symptom = doc.data() as loggedSymptomDB;
    if (symptomTypes[symptom.symptomId] === type) {
      symps.push(symptom);
    }
  }

  console.group("marked symptoms", symps.length);

  return symps.length ? true : false;
};

export const getCycleSymptoms = async (uid: string, cycleId: string) => {
  const lastSymptomDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("loggedSymptoms")
    .where("cycleId", "==", cycleId)
    .get();

  const symps: loggedSymptomDB[] = [];
  for (const doc of lastSymptomDoc.docs) {
    symps.push(doc.data() as loggedSymptomDB);
  }

  console.group("marked symptoms", symps.length);

  return symps;
};
