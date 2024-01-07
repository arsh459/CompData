// import { useEffect } from "react";
import notifee, { EventType } from "@notifee/react-native";
import {
  getNotifeeDNData,
  parseEventDetail,
} from "@providers/notification/utils";
import { useDNContext } from "@providers/dnLinks/DNProvider";
// import { NotificationAuthStatus } from "@hooks/notification/useNotificationPermissions";
import { useEffect } from "react";
// import { PermissionStatus } from "react-native-permissions";
import { trackNotification } from "./trackNotification";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { saveNotification } from "@models/notifee/methods";

export const useNotificationEvent = () =>
  // permissionStatus: PermissionStatus | "unknown",
  // regPermissionStatus: NotificationAuthStatus
  {
    const { setDNResult } = useDNContext();
    // const { state } = useAuthContext();

    // useEffect(() => {
    //   // check if permissi
    //   if (permissionStatus === "GRANTED" && regPermissionStatus === "GRANTED") {

    //   }
    // }, [permissionStatus, regPermissionStatus, state.uid]);
    useEffect(() => {
      const handleInitNotificationAndroid = async () => {
        const initialNotification = await notifee.getInitialNotification();
        if (initialNotification?.notification.data) {
          const notData = initialNotification.notification.data;
          console.log("not", notData);

          // const remoteObj = parseEventDetail();
          // if (remoteObj) {
          // const dnData = getNotifeeDNData(remoteObj);
          // if (dnData) {
          // setDNResult(dnData);
          // }
          // }
        }
      };

      handleInitNotificationAndroid();
    }, []);

    useEffect(
      () => {
        // check if permission
        // if (permissionStatus === "granted" && regPermissionStatus === "GRANTED") {
        const unsubscribe = notifee.onForegroundEvent(({ detail, type }) => {
          const remoteObj = parseEventDetail(detail);
          if (remoteObj) {
            trackNotification(type, remoteObj.title);

            if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
              if (remoteObj) {
                const dnData = getNotifeeDNData(remoteObj);

                if (dnData) {
                  setDNResult(dnData);
                }
              }

              notifee.decrementBadgeCount();
            }
          }
        });

        return () => {
          unsubscribe();
        };
        // }
      },
      [
        // permissionStatus, regPermissionStatus
      ]
    );
  };
