import { createContext, useContext } from "react";
// import notifee, { EventType } from "@notifee/react-native";
// import { useRegisterDeviceToken } from "@hooks/notification/useRegisterDeviceForRemoteMessages";
import { useNotificationPermissions } from "@hooks/notification/useNotificationPermissions";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useJoinRequestsForOwner } from "@hooks/joinRequests/useJoinRequests";
// import { useUserNotifications } from "@hooks/notification/useUserNotifications";
import {
  NotificationPermissionContextInterface,
  NotificationPermissionProps,
} from "./interface";
// import { useNotificationEvent } from "./hooks/useNotificationEvent";
// import { useUnseenNotifications } from "@hooks/notification/useUnseenNotifications";

const NotificationPermissionContext = createContext<
  NotificationPermissionContextInterface | undefined
>(undefined);

function NotificationPermissionProvider({
  children,
}: NotificationPermissionProps) {
  // const { state } = useAuthContext();
  const { permissionStatus, requestPermission } = useNotificationPermissions();

  /** Add in bell */
  // const { remoteRequests } = useJoinRequestsForOwner(state.gameId, state.uid); // remove for latest
  // const { notification, extraData, onNext } = useUserNotifications();

  // remove with usercontext
  // const { unseenNotification, onSeenNotification } = useUnseenNotifications();

  const value = {
    permissionStatus,
    // regPermissionStatus,
    requestPermission,
  };
  return (
    <NotificationPermissionContext.Provider value={value}>
      {children}
    </NotificationPermissionContext.Provider>
  );
}

function useNotificationPermissionContext() {
  const context = useContext(NotificationPermissionContext);

  if (context === undefined) {
    throw new Error(
      "useNotificationPermissionContext must be used within NotificationPermissionProvider"
    );
  }

  return context;
}

export { NotificationPermissionProvider, useNotificationPermissionContext };
