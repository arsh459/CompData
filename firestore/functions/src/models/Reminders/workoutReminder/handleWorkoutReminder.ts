import { trackNotificationSend } from "../../../main/FirestoreTriggers/onUserUpdate/updateFPConv";
import { sendNotification } from "../../../utils/notifications";
import { getTemplateNotificationByBadgeIdDay } from "../../Notifications/Methods";
import { parseNotifeeData } from "../../Notifications/createNotification";
import { updateNotificationUserDB } from "../../Notifications/updateNotificationUserDB";
import { getUserById } from "../../User/Methods";

export const handleWorkoutReminderNotification = async (
  uid: string,
  badgeId: string,
  badgeDay: number,
) => {
  const user = await getUserById(uid);

  // can push notification
  if (user?.tokens?.length) {
    // get notification Id

    const notificationTemplate = await getTemplateNotificationByBadgeIdDay(
      badgeId,
      0,
      // badgeDay,
    );

    if (notificationTemplate?.pushParams) {
      const parsedNotData = parseNotifeeData(
        notificationTemplate?.pushParams,
        uid,
      );

      const status = await sendNotification(uid, parsedNotData);

      await updateNotificationUserDB(uid, parsedNotData);

      if (status) {
        // push mixpanel event
        await trackNotificationSend(
          uid,
          notificationTemplate.id,
          notificationTemplate.templateName,
          parsedNotData.title,
        );
      }

      return true;
    }
  }

  return false;
};
