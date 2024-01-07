import firestore from "@react-native-firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import crashlytics from "@react-native-firebase/crashlytics";

export const saveError = async (
  uid?: string,
  message?: unknown,
  componentName?: string,
  screenName?: string
) => {
  const id = uuidv4();
  try {
    await firestore()
      .collection("errors")
      .doc(id)
      .set({
        uid: uid ? uid : "UNKNONWN",
        time: Date.now(),
        componentName: componentName ? componentName : "UNKNONWN",
        screenName: screenName ? screenName : "UNKNONWN",
        message: message ? message : "UNKNONWN",
      });
  } catch (error: any) {
    crashlytics().recordError(error);
  }
};
