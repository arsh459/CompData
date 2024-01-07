import { Camera, PermissionResponse, PermissionStatus } from "expo-camera";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";
// import { Camera } from "react-native-vision-camera";
// import {
//   // check,
//   PERMISSIONS,
//   request,
//   // PermissionStatus,
// } from "react-native-permissions";
// import { Camera } from "expo-camera";

export const useCameraPermission = () => {
  const [permissionStatus, setHasPermission] = useState<
    PermissionResponse | "pending"
  >("pending");

  const [audioPermissionStatus, setAudioPermission] = useState<
    PermissionResponse | "pending"
  >("pending");

  useEffect(() => {
    const getPermition = async () => {
      try {
        // const result = await check(PERMISSIONS.ANDROID.CAMERA);

        // let audio: PermissionStatus;
        // if (Platform.OS === 'ios'){
        //    audio = "granted";
        // } else {
        //    audio = await Camera.getMicrophonePermissionsAsync();
        // }

        // setHasPermission(result);

        const camera = await Camera.getCameraPermissionsAsync();

        let audio: PermissionResponse = {
          status: "granted" as PermissionStatus,
          granted: true,
          expires: "never",
          canAskAgain: true,
        };
        if (Platform.OS === "android") {
          audio = await Camera.getMicrophonePermissionsAsync();
        }

        setAudioPermission(audio);
        setHasPermission(camera);
      } catch (error: any) {
        console.log("error", error);
        crashlytics().recordError(error);
      }

      //   const cameraPermissionStatus = await Camera.getCameraPermissionStatus();
      //   setHasPermission(
      //     cameraPermissionStatus === "authorized"
      //       ? "authorized"
      //       : "settings-check"
      //   );
    };

    getPermition();
  }, []);

  const getPermission = async () => {
    try {
      // if (permissionStatus !== 'granted'){
      const camera = await Camera.getCameraPermissionsAsync();
      setHasPermission(camera);
      // }

      if (Platform.OS === "android") {
        const audio = await Camera.getMicrophonePermissionsAsync();
        setAudioPermission(audio);
      }

      //   const newCameraPermission = await Camera.requestCameraPermission();
      //   if (newCameraPermission === "authorized") {
      //     setHasPermission("authorized");
      //   } else {
      //     setHasPermission("denied");
      //   }

      //   setHasPermission(newCameraPermission === "authorized");
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  };

  return {
    permissionStatus,
    audioPermissionStatus,
    getPermission,
  };
};
