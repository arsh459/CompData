import firestore from "@react-native-firebase/firestore";
import { PeriodDates } from "./PeriodCalenderEdit";
import { periodDateType } from "@models/User/User";
import axios from "axios";
import crashlytics from "@react-native-firebase/crashlytics";
import { BACKEND_URL } from "react-native-dotenv";

export const refreshPeriodTrackerData = async (uid: string) => {
  await axios({
    url: `${BACKEND_URL}/refreshPeriod`,
    method: "POST",
    data: {
      uid,
    },
    params: {
      uid,
    },
  });
};

export const savePeriodInRemote = async (
  uid: string,
  periodDates: string[]
) => {
  await axios({
    url: `${BACKEND_URL}/periodTracker`,
    method: "POST",
    data: {
      uid,
      newPeriodDates: periodDates,
    },
    params: {
      uid,
      newPeriodDates: periodDates,
    },
  });
};

export const savePeriodDates = async (
  periodDates: PeriodDates,
  uid?: string
) => {
  const userDocRef = firestore().collection("users").doc(uid);

  try {
    await userDocRef.update({ periodDates });
  } catch (error: any) {
    console.error("Error saving period dates:", error);
    crashlytics().recordError(error);
    throw new Error("Error saving period dates");
  }
};

export const getPeriodType = (
  localPeriod: periodDateType | undefined,
  serverPeriod: periodDateType | undefined
): periodDateType => {
  if (localPeriod) {
    return localPeriod;
  } else if (serverPeriod) {
    return serverPeriod;
  } else {
    return "UNKNOWN";
  }
};
