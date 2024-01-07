import * as admin from "firebase-admin";
import { NotifeeData } from "./interface";

export const updateNotificationUserDB = async (
  uid: string,
  notifeeData: NotifeeData,
) => {
  await admin
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection("notifee")
    .doc(notifeeData.id)
    .set(notifeeData);

  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ unreadPushNotifications: true });
};
