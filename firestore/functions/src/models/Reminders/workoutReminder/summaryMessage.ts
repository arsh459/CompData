import { trackNotificationSend } from "../../../main/FirestoreTriggers/onUserUpdate/updateFPConv";
import { sendNotification } from "../../../utils/notifications";
import { getTemplateNotificationForSummary } from "../../Notifications/Methods";
import { parseNotifeeData } from "../../Notifications/createNotification";
import { updateNotificationUserDB } from "../../Notifications/updateNotificationUserDB";
import { getUserById } from "../../User/Methods";

export const handleSummaryNotification = async (
  uid: string,
  date: string,
  // badgeId: string,
  // badgeDay: number,
) => {
  const user = await getUserById(uid);

  // can push notification
  if (user?.tokens?.length) {
    // get notification Id

    const notificationTemplate = await getTemplateNotificationForSummary(
      uid,
      date,
    );

    // console.log("notificationTemplate", notificationTemplate);

    if (notificationTemplate?.pushParams) {
      const parsedNotData = parseNotifeeData(
        notificationTemplate?.pushParams,
        uid,
      );

      // console.log("parsedNotData", parsedNotData);

      const status = await sendNotification(uid, parsedNotData);

      // console.log("status", status);

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
