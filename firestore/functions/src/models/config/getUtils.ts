import * as admin from "firebase-admin";
import { AppConfiguration } from "./config";

export const getAppConfiguration = async () => {
  const configDoc = await admin.firestore().collection("config").limit(1).get();
  if (configDoc.docs.length) {
    return configDoc.docs[0].data() as AppConfiguration;
  }

  return undefined;
};
