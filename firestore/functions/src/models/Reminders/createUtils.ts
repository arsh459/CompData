import { Reminder, whatsappTemplates } from "./Reminder";
import { v4 as uuid } from "uuid";
import { firestore } from "firebase-admin";

export const createReminder = (
  isUrgent: boolean,
  template: whatsappTemplates,
  communityId?: string,
  scheduledAt?: number,
  eventId?: string,
  cohortId?: string,
  postId?: string,
  authorId?: string,
  meetingTime?: number,
  id?: string,
  parentPostId?: string,
  childPostId?: string,
  after?: number,
  parentId?: string,
  seriesId?: string,
  streamId?: string,
  workoutType?: "lives" | "exercises",
  liveId?: string,
  activityId?: string,
  taskId?: string,
  paymentId?: string,
  slotId?: string,
  slotBookingId?: string,
  appointmentId?: string,
): Reminder => {
  return {
    id: id ? id : uuid(),
    state: isUrgent ? "URGENT" : "PENDING",
    templateId: template,

    createdOn: Date.now(),
    ...(communityId ? { communityId: communityId } : {}),
    ...(parentPostId ? { parentPostId: parentPostId } : {}),
    ...(childPostId ? { childPostId: childPostId } : {}),
    ...(scheduledAt ? { scheduledAt: scheduledAt } : {}),
    ...(eventId ? { eventId: eventId } : {}),
    ...(cohortId ? { cohortId: cohortId } : {}),
    ...(postId ? { postId: postId } : {}),
    ...(authorId ? { authorId: authorId } : {}),
    ...(meetingTime ? { meetingTime: meetingTime } : {}),
    ...(after ? { after: after } : {}),
    ...(parentId ? { parentId: parentId } : {}),
    ...(taskId ? { taskId: taskId } : {}),
    ...(seriesId ? { seriesId: seriesId } : {}),
    ...(streamId ? { streamId: streamId } : {}),
    ...(workoutType ? { workoutType: workoutType } : {}),
    ...(liveId ? { liveId: liveId } : {}),
    ...(activityId ? { activityId: activityId } : {}),
    ...(paymentId ? { paymentId: paymentId } : {}),
    ...(slotId ? { slotId: slotId } : {}),
    ...(slotBookingId ? { slotBookingId: slotBookingId } : {}),
    ...(appointmentId ? { appointmentId: appointmentId } : {}),
  };
};

export const saveReminderInDB = async (reminder: Reminder) => {
  await firestore().collection("reminders").doc(reminder.id).set(reminder);
};

export const deleteReminderById = async (id: string) => {
  await firestore().collection("reminders").doc(id).delete();
};

export const getReminderByDateAndUID = async (
  uid: string,
  date: string,
  templateId: whatsappTemplates,
) => {
  const remindersForUser = await firestore()
    .collection("reminders")
    .where("date", "==", date)
    .where("state", "==", "URGENT")
    .where("templateId", "==", templateId)
    .where("authorId", "==", uid)
    .get();

  const reminders: Reminder[] = [];
  for (const reminder of remindersForUser.docs) {
    reminders.push(reminder.data() as Reminder);
  }

  return reminders;
};

export const getReminderByActivityId = async (
  activityId: string,
  templateId: whatsappTemplates,
) => {
  const remindersForUser = await firestore()
    .collection("reminders")
    .where("activityId", "==", activityId)
    .where("templateId", "==", templateId)
    .get();

  const reminders: Reminder[] = [];
  for (const reminder of remindersForUser.docs) {
    reminders.push(reminder.data() as Reminder);
  }

  return reminders;
};

export const getSlotReminderForBookingId = async (appointmentId: string) => {
  const remindersForUser = await firestore()
    .collection("reminders")
    .where("appointmentId", "==", appointmentId)
    .where("templateId", "==", "appointment_booking_reminder")
    .get();

  const reminders: Reminder[] = [];
  for (const reminder of remindersForUser.docs) {
    reminders.push(reminder.data() as Reminder);
  }

  return reminders;
};

export const getRemindersForBookingId = async (bookingId: string) => {
  const remindersForUser = await firestore()
    .collection("reminders")
    .where("slotBookingId", "==", bookingId)
    .where("templateId", "==", "slot_booking_reminder")
    .get();

  const reminders: Reminder[] = [];
  for (const reminder of remindersForUser.docs) {
    reminders.push(reminder.data() as Reminder);
  }

  return reminders;
};

export const deleteReminders = async (reminders: Reminder[]) => {
  for (const reminder of reminders) {
    await firestore().collection("reminders").doc(reminder.id).delete();
  }
};

export const saveReminder = async (reminder: Reminder) => {
  await firestore().collection("reminders").doc(reminder.id).set(reminder);
};
