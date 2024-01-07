import { createReminder, saveReminderInDB } from "../createUtils";

export const saveSingleReminder = async (
  isUrgent: boolean,
  communityId: string,
  postId: string,
  meetingTime: number,
  eventId: string,
  time: number,
  cohortId?: string,
  authorId?: string,
) => {
  const reminderObj = createReminder(
    isUrgent,
    "live_session",
    communityId,
    time,
    eventId,
    cohortId,
    postId,
    authorId,
    meetingTime,
  );

  await saveReminderInDB(reminderObj);
};

export const saveLiveSessionReminder = async (
  communityId: string,
  postId: string,
  meetingTime: number,
  eventId: string,
  cohortId?: string,
  authorId?: string,
) => {
  const now = Date.now();
  const meeting_minus_15 = meetingTime - 15 * 60 * 1000;
  const meeting_minus_2 = meetingTime - 2 * 60 * 1000;

  // meeting is close, just send one now
  if (now > meeting_minus_15) {
    await saveSingleReminder(
      false,
      communityId,
      postId,
      meetingTime,
      eventId,
      now,
      cohortId,
      authorId,
    );
  } else {
    await saveSingleReminder(
      false,
      communityId,
      postId,
      meetingTime,
      eventId,
      now,
      cohortId,
      authorId,
    );

    await saveSingleReminder(
      false,
      communityId,
      postId,
      meetingTime,
      eventId,
      meeting_minus_2,
      cohortId,
      authorId,
    );
  }
};
