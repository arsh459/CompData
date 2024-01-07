import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Camera, PermissionResponse } from "expo-camera";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

export const useCameraPermissionV2 = () => {
  const [permissionStatus, setHasPermission] = useState<PermissionResponse>();
  const [initialCheck, setCheck] = useState<boolean>(false);

  // const [audioPermissionStatus, setAudioPermission] =
  //   useState<PermissionResponse>();

  useEffect(() => {
    const getPermission = async () => {
      try {
        const camera = await Camera.getCameraPermissionsAsync();

        // let audio: PermissionResponse = {
        //   status: "granted" as PermissionStatus,
        //   granted: true,
        //   expires: "never",
        //   canAskAgain: true,
        // };
        // if (Platform.OS === "android") {
        // const audio = await Camera.getMicrophonePermissionsAsync();
        // }

        // setAudioPermission(audio);
        setHasPermission(camera);
        setCheck(true);
      } catch (error: any) {
        console.log("error", error);
        crashlytics().recordError(error);
      }
    };

    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      // if (permissionStatus !== 'granted'){
      const camera = await Camera.requestCameraPermissionsAsync();
      setHasPermission(camera);

      // }

      weEventTrack("workout_clickCameraAccess", {});

      // if (Platform.OS === "android") {
      // const audio = await Camera.requestMicrophonePermissionsAsync();
      // setAudioPermission(audio);
      // }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  };

  return {
    permissionStatus,
    // audioPermissionStatus,
    getPermission,
    initialCheck,
  };
};
