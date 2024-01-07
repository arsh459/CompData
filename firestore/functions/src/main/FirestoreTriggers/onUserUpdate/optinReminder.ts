import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
import { UserInterface, optOutStates } from "../../../models/User/User";
import * as admin from "firebase-admin";
import { trackOptInMessage } from "./updateFPConv";

export const handleOptIn = async (userNow: UserInterface) => {
  if (!userNow.optOutSent) {
    await handleUserOptinFlag(userNow.uid, "SCHEDULED");

    const reminder = createReminder(
      false,
      "opt_in_communications",
      undefined,
      Date.now() + 30 * 60 * 1000,
      undefined,
      undefined,
      undefined,
      userNow.uid,
      undefined,
      `opt-in-${userNow.uid}`,
    );

    await saveReminderInDB(reminder);
    await trackOptInMessage(userNow.uid, "opt_in_requested");
  }
};

export const handleUserOptinFlag = async (uid: string, flag: optOutStates) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ optOutSent: flag });
};
