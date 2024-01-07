import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import DeviceInfo from "react-native-device-info";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";

export const updateIOSPermission = (uid: string, ios_steps: boolean) => {
  firestore().collection("users").doc(uid).update({
    ios_steps: ios_steps,
  });
};

export const needsPermission = () => {
  const systemVersion = DeviceInfo.getSystemVersion();

  const sysVerList = systemVersion.split(".");
  if (sysVerList.length && parseInt(sysVerList[0]) > 9) {
    return true;
  }

  return false;
};

// const canSend = async () => {
//   return await DeviceInfo.isEmulator();
// };

// import { Platform } from "react-native";

export const useMotionPermission = () => {
  const [permission, setPermissionStatus] = useState<
    Pedometer.PermissionStatus | "unavailable"
  >(Pedometer.PermissionStatus.UNDETERMINED);

  useEffect(() => {
    const getPermission = async () => {
      try {
        // const isEmulator = await canSend();
        // if (isEmulator) {
        //   setPermissionStatus("unavailable");
        // } else

        if (Platform.OS === "ios") {
          const permissionStatus = await Pedometer.getPermissionsAsync();
          const result = await check(PERMISSIONS.IOS.MOTION);
          console.log("result", result, permissionStatus);

          setPermissionStatus(permissionStatus.status);
        } else {
          if (needsPermission()) {
            const result = await check(
              PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION
            );

            switch (result) {
              case RESULTS.GRANTED:
                setPermissionStatus(Pedometer.PermissionStatus.GRANTED);
                break;

              // case RESULTS.DENIED:
              //   setPermissionStatus(Pedometer.PermissionStatus.DENIED);
              //   break;
              // case RESULTS.BLOCKED:
              //   setPermissionStatus(Pedometer.PermissionStatus.DENIED);
              //   break;
            }
          } else {
            setPermissionStatus(Pedometer.PermissionStatus.GRANTED);
          }
        }
      } catch (error: any) {
        crashlytics().recordError(error);
      }
    };

    getPermission();
  }, []);

  const requestPermission = async () => {
    // const isEmulator = await canSend();
    // if (isEmulator) {
    //   setPermissionStatus("unavailable");
    // } else

    if (Platform.OS === "ios") {
      const iosRes = await request(PERMISSIONS.IOS.MOTION);
      console.log("i", iosRes);
      // const response = await Pedometer.requestPermissionsAsync();
      // setPermissionStatus(response.status);
    } else {
      if (needsPermission()) {
        const result = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);

        switch (result) {
          case RESULTS.GRANTED:
            setPermissionStatus(Pedometer.PermissionStatus.GRANTED);
            break;
          case RESULTS.DENIED:
            setPermissionStatus(Pedometer.PermissionStatus.DENIED);
            break;
          case RESULTS.UNAVAILABLE:
            setPermissionStatus("unavailable");
            break;
          case RESULTS.BLOCKED:
            setPermissionStatus(Pedometer.PermissionStatus.DENIED);
            break;
        }
      } else {
        setPermissionStatus(Pedometer.PermissionStatus.GRANTED);
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
