import { createReminder, saveReminderInDB } from "../createUtils";
import { whatsappTemplates } from "../Reminder";

export const savePostReminder = async (
  communityId: string,
  postId: string,
  eventId: string,
  reminderType: whatsappTemplates,
  cohortId?: string,
  authorId?: string,
  parentPostId?: string,
  childPostId?: string,
) => {
  const timeForNotification = Date.now() + 2 * 60 * 1000;
  const reminderObj = createReminder(
    false,
    reminderType,
    communityId,
    timeForNotification,
    eventId,
    cohortId,
    postId,
    authorId,
    undefined,
    undefined,
    parentPostId,
    childPostId,
  );

  await saveReminderInDB(reminderObj);
};
