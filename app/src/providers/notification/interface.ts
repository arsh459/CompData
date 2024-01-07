import { notificationListType } from "@hooks/notification/useUserNotifications";
import { NotificationToSave } from "@models/notifee/interface";

export type NotificationProps = {
  children?: React.ReactNode;
};

export interface NotificationContextInterface {
  notification: notificationListType[];
  extraData: number;
  onNext: () => Promise<void>;
  init?: boolean;
  updateSingleNotification: (
    day: string,
    notifyObj: NotificationToSave
  ) => void;
}
