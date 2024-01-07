import { NotifeeData } from "./interface";
import firestore from "@react-native-firebase/firestore";

export const saveNotification = async (
  uid: string,
  notifeeData: NotifeeData
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("notifee")
    .doc(notifeeData.id)
    .set(notifeeData, { merge: true });
};
