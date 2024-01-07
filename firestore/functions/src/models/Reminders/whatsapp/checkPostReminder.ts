import { firestore } from "firebase-admin";

export const noPendingPostReminder = async (sessionId: string) => {
  const pendingSessionReminders = await firestore()
    .collection("reminders")
    .where("sessionId", "==", sessionId)
    .where("state", "==", "PENDING")
    .get();

  return pendingSessionReminders.docs.length === 0;
};
