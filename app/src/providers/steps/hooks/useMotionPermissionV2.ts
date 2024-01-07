// import { Pedometer } from "expo-sensors";
import { updatePermissionDoc } from "@models/User/createUtils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  setUserMotionPermission,
  weEventTrack,
} from "@utils/analytics/webengage/userLog";
// import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  PermissionStatus,
} from "react-native-permissions";
import {
  needsPermission,
  updateIOSPermission,
} from "../../../hooks/steps/useMotionPermission";

// const canSend = async () => {
//   return await DeviceInfo.isEmulator();
// };

// import { Platform } from "react-native";

export const useMotionPermissionV2 = () => {
  const [permission, setPermissionStatus] = useState<PermissionStatus>(
    RESULTS.DENIED
  );

  const { user } = useUserContext();
  const { state } = useAuthContext();

  useEffect(() => {
    const getPermission = async () => {
      try {
        // const isEmulator = await canSend();
        // if (isEmulator) {
        //   setPermissionStatus("unavailable");
        // } else

        if (Platform.OS === "ios") {
          //   const permissionStatus = await Pedometer.getPermissionsAsync();
          const result = await check(PERMISSIONS.IOS.MOTION);
          if (result === "granted" && state.uid) {
            updateIOSPermission(state.uid, true);

            weEventTrack("steps_iosSuccess", {});
          }

          // save to mixpanel
          setUserMotionPermission(result);
          setPermissionStatus(result);
        } else {
          setPermissionStatus(RESULTS.GRANTED);
          // if (needsPermission()) {
          //   const result = await check(
          //     PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION
          //   );

          //   switch (result) {
          //     case RESULTS.GRANTED:
          //       setPermissionStatus(RESULTS.GRANTED);
          //       break;
          //   }
          // } else {
          //   await Pedometer.requestPermissionsAsync();
          //   setPermissionStatus(RESULTS.GRANTED);
          // }
        }
      } catch (error: any) {
        crashlytics().recordError(error);
      }
    };

    getPermission();
  }, [user?.permissionUpdate, state.uid]);

  const requestPermission = async () => {
    // const isEmulator = await canSend();
    // if (isEmulator) {
    //   setPermissionStatus("unavailable");
    // } else

    if (Platform.OS === "ios") {
      const iosRes = await request(PERMISSIONS.IOS.MOTION);
      // const response = await Pedometer.requestPermissionsAsync();

      // if permission is given
      if (iosRes === "granted" && state.uid) {
        updateIOSPermission(state.uid, true);
      }

      setPermissionStatus(iosRes);
      state.uid && updatePermissionDoc(state.uid);

      // save to mixpanel
      setUserMotionPermission(iosRes);
    } else {
      if (needsPermission()) {
        const result = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
        setPermissionStatus(result);
        state.uid && updatePermissionDoc(state.uid);

        // switch (result) {
        //   case RESULTS.GRANTED:
        //     setPermissionStatus(Pedometer.PermissionStatus.GRANTED);
        //     break;
        //   case RESULTS.DENIED:
        //     setPermissionStatus(Pedometer.PermissionStatus.DENIED);
        //     break;
        //   case RESULTS.UNAVAILABLE:
        //     setPermissionStatus("unavailable");
        //     break;
        //   case RESULTS.BLOCKED:
        //     setPermissionStatus(Pedometer.PermissionStatus.DENIED);
        //     break;
        // }
      } else {
        setPermissionStatus(RESULTS.GRANTED);
      }
    }
    //   const permissionsStatuses = await PedometerDetails.requestPermission();

    //   if (
    //     typeof permissionsStatuses === "string" &&
    //     permissionsStatuses === "granted"
    //   ) {
    //     setPermissionStatus(Pedometer.PermissionStatus.GRANTED);
    //   } else if (
    //     typeof permissionsStatuses === "string" &&
    //     permissionsStatuses === "blocked"
    //   ) {
    //     setPermissionStatus(Pedometer.PermissionStatus.DENIED);
    //   }
    // }
  };

  return {
    permission,
    requestPermission,
  };
};
