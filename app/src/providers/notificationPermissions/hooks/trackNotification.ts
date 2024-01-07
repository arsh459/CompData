import { EventType } from "@notifee/react-native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export const trackNotification = (type: EventType, title: string) => {
  if (type === EventType.ACTION_PRESS) {
    weEventTrack("notification_actionPress", { title });
  } else if (type === EventType.APP_BLOCKED) {
    weEventTrack("notification_blocked", { title });
  } else if (type === EventType.CHANNEL_BLOCKED) {
    weEventTrack("notification_channel_blocked", { title });
  } else if (type === EventType.DELIVERED) {
    weEventTrack("notification_delivered", { title });
  } else if (type === EventType.DISMISSED) {
    weEventTrack("notification_dismissed", { title });
  } else if (type === EventType.FG_ALREADY_EXIST) {
    weEventTrack("notification_fg_exists", { title });
  } else if (type === EventType.PRESS) {
    weEventTrack("notification_press", { title });
  } else if (type === EventType.TRIGGER_NOTIFICATION_CREATED) {
    weEventTrack("notification_trigger_created", { title });
  } else if (type === EventType.UNKNOWN) {
    weEventTrack("notification_unknown_action", { title });
  }
};
