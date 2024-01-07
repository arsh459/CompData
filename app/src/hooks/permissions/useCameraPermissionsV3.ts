import { weEventTrack } from "@utils/analytics/webengage/userLog";
import crashlytics from "@react-native-firebase/crashlytics";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import {
  check,
  PERMISSIONS,
  request,
  PermissionStatus,
} from "react-native-permissions";
import { useIsForeground } from "@hooks/utils/useIsForeground";

export const useCameraPermissionV3 = () => {
  const [permissionStatus, setPermissionStatus] = useState<
    PermissionStatus | "unknown"
  >("unknown");
  const [initialCheck, setCheck] = useState<boolean>(false);
  const { appStateVisible } = useIsForeground();

  // const [audioPermissionStatus, setAudioPermission] =
  //   useState<PermissionResponse>();

  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (Platform.OS === "ios") {
          const result = await check(PERMISSIONS.IOS.CAMERA);
          setPermissionStatus(result);
        } else {
          const result = await check(PERMISSIONS.ANDROID.CAMERA);
          setPermissionStatus(result);
        }
        setCheck(true);
      } catch (error: any) {
        console.log("error", error);
        crashlytics().recordError(error);
      }
    };

    if (appStateVisible === "active") {
      checkPermission();
    }
  }, [appStateVisible]);

  const requestPermission = async (): Promise<PermissionStatus | undefined> => {
    try {
      // if (permissionStatus !== 'granted'){
      weEventTrack("workout_clickCameraAccess", {});

      if (Platform.OS === "ios") {
        if (permissionStatus === "denied") {
          const result = await request(PERMISSIONS.IOS.CAMERA);
          setPermissionStatus(result);
          if (result === "granted") {
            weEventTrack("workout_grantedCameraAccess", {});
          }
          return result;
        } else if (
          permissionStatus === "blocked" ||
          permissionStatus === "limited"
        ) {
          // go to settings
          Linking.openSettings();

          weEventTrack("workout_clickGoToSettings", {});

          return permissionStatus;
        }
      } else {
        if (permissionStatus === "denied") {
          const result = await request(PERMISSIONS.ANDROID.CAMERA);
          setPermissionStatus(result);

          if (result === "granted") {
            weEventTrack("workout_grantedCameraAccess", {});
          }

          return result;
        } else if (permissionStatus === "blocked") {
          // go to settings
          Linking.openSettings();

          weEventTrack("workout_clickGoToSettings", {});

          return permissionStatus;
        }
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  };

  return {
    permissionStatus,
    // audioPermissionStatus,
    requestPermission,
    initialCheck,
  };
};
