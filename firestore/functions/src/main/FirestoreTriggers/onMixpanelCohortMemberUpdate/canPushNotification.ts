import { getUserSendsForToday } from "../../Https/mixpanel/getUtils";
import {
  MAX_NOTIFICATIONS_USER_DAY,
  MIN_NOTIFICATION_DURATION_MS,
} from "../../Https/mixpanel/interface";

export const canPushNotification = async (mixpanel_id: string) => {
  const userSends = await getUserSendsForToday(mixpanel_id);

  // console.log("userSends", userSends);

  if (userSends.length >= MAX_NOTIFICATIONS_USER_DAY) {
    return false;
  }

  const now = Date.now();
  const tp = now - MIN_NOTIFICATION_DURATION_MS;

  // console.log("tp", tp);

  const userSendsAfterTP = userSends.filter((item) => item.sentUnix > tp);

  // console.log("userSendsAfterTP", userSendsAfterTP);

  if (userSendsAfterTP.length >= 1) {
    return false;
  }

  return true;
};
