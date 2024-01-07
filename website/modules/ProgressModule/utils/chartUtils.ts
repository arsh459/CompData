import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@config/firebase";
import { addDailyProgress, updateDailyProgress } from "./progressUtils";
import { format, startOfDay } from "date-fns";
import {
  ProgressCollectionType,
  graphDataInterface,
  selectedFpSectionType,
  typePropTypes,
} from "../interface";

export const getChartDataForView = (
  selectedView: selectedFpSectionType,
  allTimeData: graphDataInterface[],
  monthlyData: graphDataInterface[],
  weeklyData: graphDataInterface[]
) => {
  switch (selectedView) {
    case "All Time":
      return allTimeData;
    case "Monthly":
      return monthlyData;
    case "Weekly":
      return weeklyData;
    default:
      return null;
  }
};

export const get = async (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  value: number,
  uid?: string
) => {
  if (typeof value !== "number" || !uid || !type || !collectionName) {
    console.log("Invalid value or uid");
    return;
  }

  const currentDate = new Date();
  const date = format(currentDate, "yyyy-MM-dd");
  const unixStartDay = startOfDay(currentDate).getTime();
  const unixUpdateTime = currentDate.getTime();

  try {
    //   const querySnapshot = await firestore()
    //     .collection("users")
    //     .doc(uid)
    //     .collection(collectionName)
    //     .where("date", "==", date)
    //     .get();
    const collectionRef = collection(db, `users/${uid}/${collectionName}`);
    const q = query(collectionRef, where("date", "==", date));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDailyProgress(
        uid,
        date,
        unixStartDay,
        type,
        value,
        collectionName
      );
    } else {
      await updateDailyProgress(
        querySnapshot.docs[0].ref,
        type,
        value,
        unixUpdateTime
      );
    }
  } catch (error: any) {
    console.log(error);
  }
};

export const saveToFirebase = async (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  value: number,
  uid: string,
  selectedDate?: Date
) => {
  if (typeof value !== "number" || !uid || !type || !collectionName) {
    console.log("Invalid value or uid");
    return;
  }

  const currentDate = selectedDate ? new Date(selectedDate) : new Date();
  const date = format(currentDate, "yyyy-MM-dd");
  const unixStartDay = startOfDay(currentDate).getTime();
  const unixUpdateTime = currentDate.getTime();

  try {
    const collectionRef = collection(db, `users/${uid}/${collectionName}`);
    const q = query(collectionRef, where("date", "==", date));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      await addDailyProgress(
        uid,
        date,
        unixStartDay,
        type,
        value,
        collectionName
      );
    } else {
      const docRef = querySnapshot.docs[0].ref;
      await updateDailyProgress(docRef, type, value, unixUpdateTime);
    }
  } catch (error) {
    console.error(error);
  }
};
