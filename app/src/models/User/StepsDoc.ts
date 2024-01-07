import { format } from "date-fns";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import firestore from "@react-native-firebase/firestore";

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
  unix: number
): StepsDoc => {
  return {
    uid,
    steps,
    date,
    updatedOn: Date.now(),
    id: uuidv4(),
    unix,
  };
};

export type coordsType = { latitude: number; longitude: number };
export const createZeroethStepDoc = async (uid: string) => {
  const now = new Date();

  const dayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );

  const formattedString = format(dayStart, "yyyy-MM-dd");

  const todaySteps = await firestore()
    .collection("users")
    .doc(uid)
    .collection("steps")
    .where("date", "==", formattedString)
    .get();

  if (!todaySteps.docs.length) {
    const newDoc = createNewDoc(uid, 0, formattedString, now.getTime());
    await firestore()
      .collection("users")
      .doc(uid)
      .collection("steps")
      .doc(newDoc.id)
      .set(newDoc);
  }
};
