import { useIsForeground } from "@hooks/utils/useIsForeground";
import { setUserNotificationPermission } from "@utils/analytics/webengage/userLog";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
// import messaging, {
//   FirebaseMessagingTypes,
// } from "@react-native-firebase/messaging";
// import { Platform } from "react-native";
import {
  checkNotifications,
  openSettings,
  PermissionStatus,
  requestNotifications,
} from "react-native-permissions";

export type NotificationAuthStatus = "UNKNOWN" | "GRANTED" | "DISABLED";

// const getStatusFromAuthoriation = (
//   permission: FirebaseMessagingTypes.AuthorizationStatus
// ): { st: NotificationAuthStatus; stBool: boolean } => {
//   if (
//     permission === messaging.AuthorizationStatus.AUTHORIZED ||
//     permission === messaging.AuthorizationStatus.PROVISIONAL
//   ) {
//     return { st: "GRANTED", stBool: true };
//   }

//   return { st: "DISABLED", stBool: false };
// };

export const useNotificationPermissions = () => {
  const [permissionStatus, setPermissionStatus] = useState<
    PermissionStatus | "unknown"
  >("unknown");

  const { appStateVisible } = useIsForeground();

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const permission = await checkNotifications();
        setPermissionStatus(permission.status);

        // update to mixpanel
        setUserNotificationPermission(permission.status);
        // if (permission.status)
        //   // const permission = await messaging().hasPermission();

        //   const { st } = getStatusFromAuthoriation(permission);
        // setPermissionStatus(st);
      } catch (error: any) {
        console.log("Error in notification permissions: ", error);
        crashlytics().recordError(error);
      }
    };

    if (appStateVisible === "active") {
      checkPermissions();
    }
  }, [appStateVisible]);

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     try {
  //       const permission = await messaging().hasPermission();

  //       let initResult = getStatusFromAuthoriation(permission);

  //       if (!initResult.stBool && !preventInitialAsking) {
  //         const newPerm = await messaging().requestPermission();
  //         const { st } = getStatusFromAuthoriation(newPerm);

  //         setPermissionStatus(st);
  //       } else {
  //         setPermissionStatus(initResult.st);
  //       }
  //     } catch (error: any) {
  //       console.log("Error in notification permissions: ", error);
  //     }
  //   };

  //   if (Platform.OS === "ios") {
  //     getPermissions();
  //   }
  // }, []);

  const requestPermission = async () => {
    // if (permissionStatus === "UNKNOWN" && preventInitialAsking) {
    if (permissionStatus === "blocked") {
      await openSettings().catch((e) => {
        console.log("cannot open settings");
        crashlytics().recordError(e);
      });
    } else {
      const newStatus = await requestNotifications(["alert", "badge", "sound"]);
      setPermissionStatus(newStatus.status);
      setUserNotificationPermission(newStatus.status);
    }

    // const newPerm = await messaging().requestPermission();
    // const { st } = getStatusFromAuthoriation(newPerm);

    // setPermissionStatus(st);
    // }
  };

  return {
    permissionStatus,
    requestPermission,
  };
};
