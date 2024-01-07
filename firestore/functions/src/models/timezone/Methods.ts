import * as admin from "firebase-admin";
import { timezoneObj } from "./interface";

export const getTimezones = async () => {
  const docs = await admin.firestore().collection("timezones").get();
  if (docs.docs.length) {
    return docs.docs[0].data() as timezoneObj;
  }

  return undefined;
};

export const addTimezone = async (tz: string) => {
  await admin
    .firestore()
    .collection("timezones")
    .doc("tzdb")
    .update({ timezones: admin.firestore.FieldValue.arrayUnion(tz) });
};
