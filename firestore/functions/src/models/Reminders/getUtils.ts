import { firestore } from "firebase-admin";
import { Reminder, ReminderProgress, TaskState } from "./Reminder";

export const getAllPendingTasks = async (state?: "PENDING" | "URGENT") => {
  const reminderDocs = await firestore()
    .collection("reminders")
    .where("state", "==", state)
    // .where("state", "==", state ? state : "PENDING")
    .get();

  const reminders: Reminder[] = [];
  for (const item of reminderDocs.docs) {
    reminders.push(item.data() as Reminder);
  }

  return reminders;
};

export const getRemindersForUserTemplate = async (
  uid: string,
  templateId: string,
) => {
  const reminderDocs = await firestore()
    .collection("reminders")
    .where("authorId", "==", uid)
    .where("templateId", "==", templateId)
    // .where("state", "==", "URGENT")
    .get();

  const reminders: Reminder[] = [];
  for (const item of reminderDocs.docs) {
    if (item.exists) {
      const reminder = item.data() as Reminder;
      // if (
      // !reminder.scheduledAt || // no schedule
      // (reminder.scheduledAt && time > reminder.scheduledAt) // schedule is past
      // ) {
      reminders.push(reminder);
      // }
    }
  }

  return reminders;
};

export const getTasksByStateAndTime = async (
  time: number,
  state: "PENDING" | "URGENT",
) => {
  const reminderDocs = await firestore()
    .collection("reminders")
    .where("state", "==", state ? state : "PENDING")
    .where("scheduledAt", "<=", time)
    .get();

  const reminders: Reminder[] = [];
  for (const item of reminderDocs.docs) {
    if (item.exists) {
      const reminder = item.data() as Reminder;
      // if (
      // !reminder.scheduledAt || // no schedule
      // (reminder.scheduledAt && time > reminder.scheduledAt) // schedule is past
      // ) {
      reminders.push(reminder);
      // }
    }
  }

  return reminders;
};

export const getPendingTasks = async (
  time: number,
  state?: "PENDING" | "URGENT",
) => {
  const reminderDocs = await firestore()
    .collection("reminders")
    .where("state", "==", state ? state : "PENDING")
    .get();

  const reminders: Reminder[] = [];
  for (const item of reminderDocs.docs) {
    if (item.exists) {
      const reminder = item.data() as Reminder;
      if (
        !reminder.scheduledAt || // no schedule
        (reminder.scheduledAt && time > reminder.scheduledAt) // schedule is past
      ) {
        reminders.push(reminder);
      }
    }
  }

  return reminders;
};

export const getProgressForTask = async (
  id: string,
): Promise<ReminderProgress> => {
  const progressForRemider = await firestore()
    .collection("reminders")
    .doc(id)
    .collection("progress")
    .doc("progress")
    .get();

  if (progressForRemider.exists) {
    return progressForRemider.data() as ReminderProgress;
  }

  return {};
};

export const updateUIDForReminder = async (id: string, uid: string) => {
  await firestore()
    .collection("reminders")
    .doc(id)
    .collection("progress")
    .doc("progress")
    .set({ [uid]: true }, { merge: true });
};

export const getUrgentTasks = async () => {
  const reminderDocs = await firestore()
    .collection("reminders")
    .where("state", "==", "URGENT")
    .get();

  const reminders: Reminder[] = [];
  for (const item of reminderDocs.docs) {
    if (item.exists) {
      reminders.push(item.data() as Reminder);
    }
  }

  return reminders;
};

export const updateTaskListState = async (
  tasks: Reminder[],
  newState: TaskState,
) => {
  await Promise.all(tasks.map((item) => updateTaskState(item, newState)));
};

export const updateTaskState = async (task: Reminder, newState: TaskState) => {
  await firestore().collection("reminders").doc(task.id).update({
    state: newState,
  });
};

export const updateReminderTaskState = async (
  reminderId: string,
  newState: TaskState,
) => {
  await firestore().collection("reminders").doc(reminderId).update({
    state: newState,
  });
};
