// import { NotificationAuthStatus } from "@hooks/notification/useNotificationPermissions";
import { PermissionStatus } from "react-native-permissions";
// import { notificationListType } from "@hooks/notification/useUserNotifications";
// import { TeamRequest } from "@models/Notifications/interface";

export type NotificationPermissionProps = {
  children?: React.ReactNode;
};

export interface NotificationPermissionContextInterface {
  permissionStatus: PermissionStatus | "unknown";
  // regPermissionStatus: NotificationAuthStatus;
  requestPermission: () => Promise<void>;
}
