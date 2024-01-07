import { TemplateNotification } from "../../../models/Notifications/interface";
// import { getTemplateNotification } from "../../../models/Notifications/Methods";
// import { savePushSend } from "../../Https/mixpanel/getUtils";
import { MixpanelMemberFirstore } from "../../Https/mixpanel/interface";
// import { canPushNotification } from "./canPushNotification";
// import { mixpanel } from "../../../mixpanel/mixpanel";
import { trackNotificationSend } from "../onUserUpdate/updateFPConv";
import { parseNotifeeData } from "../../../models/Notifications/createNotification";
import { sendNotification } from "../../../utils/notifications";
import { updateNotificationUserDB } from "../../../models/Notifications/updateNotificationUserDB";

export const sendUserNotification = async (
  mixpanelUser: MixpanelMemberFirstore,
  notification: TemplateNotification,
) => {
  // const canPush = await canPushNotification(mixpanelUser.mixpanel_distinct_id);

  // console.log("canPush", canPush);
  // console.log("notification", notification);

  // if (canPush) {
  // send notification
  if (
    notification.channel === "push" &&
    notification.pushParams &&
    mixpanelUser.user_id
  ) {
    const parsedNotData = parseNotifeeData(
      notification.pushParams,
      mixpanelUser.user_id,
    );

    // console.log("parsedNotData", parsedNotData);
    // console.log("mixpanelUser", mixpanelUser.user_id, parsedNotData);
    const status = await sendNotification(mixpanelUser.user_id, parsedNotData);

    // save notification in db
    await updateNotificationUserDB(mixpanelUser.user_id, parsedNotData);

    // save notification send
    // await savePushSend(
    //   mixpanelUser.mixpanel_distinct_id,
    //   mixpanelUser.user_id ? mixpanelUser.user_id : "",
    //   notification.id,
    // );

    if (status) {
      // push mixpanel event
      await trackNotificationSend(
        mixpanelUser.mixpanel_distinct_id,
        notification.id,
        notification.templateName,
        parsedNotData.title,
      );

      return true;
    }
  }

  return false;
  // }
};
