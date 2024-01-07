import {
  dailyEnergyObj,
  dailyMoodObj,
  dailySleepObj,
  dailyWeightObj,
} from "@models/User/User";
import { doc, DocumentReference, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { v4 as uuidv4 } from "uuid";
import { ProgressCollectionType, typePropTypes } from "../interface";

export const saveDailyProgress = async (
  uid: string,
  collectionName: "dailyWeight" | "dailyEnergy" | "dailyMood" | "dailySleep",
  progressObj: dailyWeightObj | dailyMoodObj | dailyEnergyObj | dailySleepObj
) => {
  try {
    await setDoc(
      doc(db, `users/${uid}/${collectionName}`, progressObj.id),
      progressObj
    );
  } catch (error) {
    console.error(error);
  }
};

export const addDailyProgress = async (
  uid: string,
  date: string,
  unix: number,
  type: typePropTypes,
  value: number,
  collectionName: ProgressCollectionType
) => {
  try {
    const uniqueId = uuidv4();

    await setDoc(doc(db, `users/${uid}/${collectionName}`, uniqueId), {
      date: date,
      unix: unix,
      [type]: value,
      id: uniqueId,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const updateDailyProgress = async (
  docRef: DocumentReference,
  type: typePropTypes,
  value: number,
  unix: number
) => {
  try {
    await updateDoc(docRef, {
      [type]: value,
      unix,
    });
  } catch (error: any) {
    console.log(error);
  }
};
