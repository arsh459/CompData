import { Reminder } from "@models/Reminder/Reminder";
import { ParsedUrlQuery } from "querystring";

export const parseVoidQuery = (query: ParsedUrlQuery) => {
  return {
    streamId:
      query.streamId && typeof query.streamId === "string"
        ? query.streamId
        : "",
    taskId:
      query.taskId && typeof query.taskId === "string" ? query.taskId : "",
  };
};

export const saveReminder_server = async (reminder: Reminder) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  await db.collection("reminders").doc(reminder.id).set(reminder);
};
