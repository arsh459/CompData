import * as admin from "firebase-admin";

import { UserInterface } from "../../../models/User/User";
export const fetchUser = async (userId: string) => {
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  if (!userDoc) {
    return undefined;
  }

  const user = userDoc.data() as UserInterface;
  return user;
};
