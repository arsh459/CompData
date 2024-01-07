import { createContext, useContext } from "react";
// import notifee, { EventType } from "@notifee/react-native";
import { NotificationContextInterface, NotificationProps } from "./interface";
// import { useNotificationPermissionContext } from "@providers/notificationPermissions/NotificationPermissionProvider";
import { useUserNotifications } from "@hooks/notification/useUserNotifications";
// import { getNotifeeDNData, parseEventDetail } from "./utils";
// import { useDNContext } from "@providers/dnLinks/DNProvider";

const NotificationContext = createContext<
  NotificationContextInterface | undefined
>(undefined);

function NotificationProvider({ children }: NotificationProps) {
  const { notification, extraData, onNext, updateSingleNotification, init } =
    useUserNotifications();

  const value = {
    notification,
    extraData,
    onNext,
    init,
    updateSingleNotification,
  };
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within NotificationProvider"
    );
  }

  return context;
}

export { NotificationProvider, useNotificationContext };
