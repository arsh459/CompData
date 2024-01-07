import { NotifeeData, NotifeePassedData } from "@models/notifee/interface";
import { EventDetail } from "@notifee/react-native";
import { handleDNSNotification } from "@providers/dnLinks/hooks/handleLink";
import { RouteKeys } from "@routes/MainStack";

export const parseEventDetail = (detail: EventDetail) => {
  const notificationData = detail.notification?.data;

  if (typeof notificationData === "object" && notificationData.notifeeData) {
    return notificationData.notifeeData as unknown as NotifeeData;
  }

  return undefined;

  // const toParseString = detail.notification?.data as NotifeePassedData;

  // return toParseString;

  // if (toParseString.notifee) {
  //   return JSON.parse(toParseString.notifee) as NotifeeData;
  // }
};

export const getNotifeeDNData = (notifeeData?: NotifeePassedData) => {
  if (notifeeData) {
    return handleDNSNotification(
      notifeeData.navigateTo as RouteKeys,
      notifeeData.navigateToParams ? notifeeData.navigateToParams : {}
    );
  }
};
