import { useEffect, useState } from "react";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { useAuthContext } from "@providers/auth/AuthProvider";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  onMessageReceived,
  updateMixpanelUser,
  updateUserTokens,
} from "@utils/notifications/uttils";
import { NotificationAuthStatus } from "./useNotificationPermissions";
import { getMixpanelDistinctId } from "@utils/analytics/webengage/userLog";

// import notifee from "@notifee/react-native";

export const useRegisterDeviceToken = () => {
  const { state } = useAuthContext();

  const [regPermissionStatus, setPermissionStatus] =
    useState<NotificationAuthStatus>("UNKNOWN");

  useEffect(() => {
    // permission check
    const registerDevice = async (uid?: string) => {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          try {
            await messaging().registerDeviceForRemoteMessages();
          } catch (error: any) {
            console.log("error when trying to register ", error);
            crashlytics().recordError(error);
          }
        }

        try {
          const token = await messaging().getToken();

          if (uid) {
            await updateUserTokens(uid, token);
          } else {
            const id = await getMixpanelDistinctId();
            await updateMixpanelUser(id, token);
          }

          setPermissionStatus("GRANTED");
        } catch (error: any) {
          console.log("fetching token failed", error);
          crashlytics().recordError(error);
        }

        const onMessageReceivedClosure = async (
          message: FirebaseMessagingTypes.RemoteMessage
        ) => {
          onMessageReceived(message);
        };

        messaging().onMessage(onMessageReceivedClosure);
      } catch (error: any) {
        console.log("Error in device register: ", error);
        crashlytics().recordError(error);
      }
    };

    if (state.uid) {
      registerDevice(state.uid);
    }
  }, [state.uid]);

  return {
    regPermissionStatus,
  };
};
