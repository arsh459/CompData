import { firestore } from "firebase-admin";
import { toSaurav, toSwapnil } from "../../constants/email/contacts";
import {
  // onNewSignUpEmail,
  onNewSocialBoat,
  // onSignUpD2Email,
  // onSignUpD3Email,
} from "../../main/FirestoreTriggers/utils/sendgrid";
import { UserInterface } from "./User";

export const getUsersForEmail = async (
  time: number,
  key: "unixWelcomeEmail" | "unixDay2Email" | "unixDay3Email",
) => {
  const users = await firestore()
    .collection("users")
    .where(key, "<=", time)
    .get();

  const uInterfaces: UserInterface[] = [];
  for (const user of users.docs) {
    uInterfaces.push(user.data() as UserInterface);
  }

  return uInterfaces;
};

export const addEmailStatus = async (
  uid: string,
  time: number,
  key: "unixWelcomeEmail" | "unixDay2Email" | "unixDay3Email",
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [key]: time,
    });
};

export const updateEmailStatus = async (
  uid: string,
  key: "unixWelcomeEmail" | "unixDay2Email" | "unixDay3Email",
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [key]: firestore.FieldValue.delete(),
    });
};

export const sendEmails = async (
  key: "unixWelcomeEmail" | "unixDay2Email" | "unixDay3Email",
  users: UserInterface[],
) => {
  for (const user of users) {
    try {
      if (key === "unixWelcomeEmail" && user.email) {
        // await onNewSignUpEmail(user.email, user.name);
        await updateEmailStatus(user.uid, "unixWelcomeEmail");
        await onNewSocialBoat(toSwapnil, user.name, user.phone, user.email);
        await onNewSocialBoat(toSaurav, user.name, user.phone, user.email);
      } else if (key === "unixDay2Email" && user.email) {
        // await onSignUpD2Email(user.email, user.name);
        await updateEmailStatus(user.uid, "unixDay2Email");
      } else if (key === "unixDay3Email" && user.email) {
        // await onSignUpD3Email(user.email, user.name);
        await updateEmailStatus(user.uid, "unixDay3Email");
      }
    } catch (error) {
      console.log("error in email", error);
    }
  }
};
