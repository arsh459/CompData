import { TemplateNotification } from "../../../models/Notifications/interface";
import { MixpanelMemberFirstore } from "../../Https/mixpanel/interface";
import { sendUserNotification } from "./sendUserNotification";

export const batchPromiseNotifications = async (
  members: MixpanelMemberFirstore[],
  template: TemplateNotification,
) => {
  const promises = [];
  for (const member of members) {
    const promise = sendUserNotification(member, template);

    promises.push(promise);
  }

  await Promise.all(promises);
};
