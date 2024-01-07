import { useEffect, useState } from "react";
import { View } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { openSettings } from "react-native-permissions";
import Loading from "@components/loading/Loading";
import { useIsForeground } from "@hooks/utils/useIsForeground";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import PermissionButton from "@modules/CameraAIScan/PermissionButton";
import { nutritionCameraPermissionData } from "@modules/CameraAIScan/utils";
import CameraAIScan from "@modules/CameraAIScan";

interface Props {
  children: React.ReactNode;
}

const PermissionWrapper: React.FC<Props> = ({ children }) => {
  const { appStateVisible } = useIsForeground();
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraPermission, setCameraPermission] =
    useState<ImagePicker.PermissionStatus>();
  const [mediaLibraryPermission, setMediaLibraryPermission] =
    useState<ImagePicker.PermissionStatus>();

  useEffect(() => {
    const helperFunc = async () => {
      setLoading(true);
      setCameraPermission((await Camera.getCameraPermissionsAsync()).status);
      setMediaLibraryPermission(
        (await ImagePicker.getMediaLibraryPermissionsAsync()).status
      );
      setLoading(false);
    };

    if (appStateVisible === "active") {
      helperFunc();
    }
  }, [appStateVisible]);

  const requestCameraPermission = async () => {
    setLoading(true);
    setCameraPermission((await Camera.requestCameraPermissionsAsync()).status);
    setLoading(false);

    weEventTrack("nutrition_requestPermission", {});
  };

  const requestMediaLibraryPermission = async () => {
    setLoading(true);
    setCameraPermission(
      (await ImagePicker.requestMediaLibraryPermissionsAsync()).status
    );
    setLoading(false);

    weEventTrack("nutrition_requestLibraryPermission", {});
  };

  const goToSettings = () => {
    openSettings();

    weEventTrack("nutrition_goToSettings", {});
  };

  return (
    <View className="flex-1 flrx justify-center items-center bg-[#100F1A]">
      {cameraPermission === ImagePicker.PermissionStatus.GRANTED &&
      mediaLibraryPermission === ImagePicker.PermissionStatus.GRANTED ? (
        children
      ) : cameraPermission === ImagePicker.PermissionStatus.DENIED ? (
        <CameraAIScan contentData={nutritionCameraPermissionData}>
          <PermissionButton
            ctaPress1={() => {}}
            ctaPress2={goToSettings}
            ctaText2="Give camera Permissions"
          />
        </CameraAIScan>
      ) : cameraPermission === ImagePicker.PermissionStatus.UNDETERMINED ? (
        <CameraAIScan contentData={nutritionCameraPermissionData}>
          <PermissionButton
            ctaPress1={() => {}}
            ctaPress2={requestCameraPermission}
            ctaText2="Give camera Permissions"
          />
        </CameraAIScan>
      ) : mediaLibraryPermission === ImagePicker.PermissionStatus.DENIED ? (
        <CameraAIScan contentData={nutritionCameraPermissionData}>
          <PermissionButton
            ctaPress1={() => {}}
            ctaPress2={goToSettings}
            ctaText2="Give media Permissions"
          />
        </CameraAIScan>
      ) : mediaLibraryPermission ===
        ImagePicker.PermissionStatus.UNDETERMINED ? (
        <CameraAIScan contentData={nutritionCameraPermissionData}>
          <PermissionButton
            ctaPress1={() => {}}
            ctaPress2={requestMediaLibraryPermission}
            ctaText2="Give media Permissions"
          />
        </CameraAIScan>
      ) : loading ? (
        <Loading />
      ) : null}
    </View>
  );
};

export default PermissionWrapper;
