import Loading from "@components/loading/Loading";
import SocialBoat from "@components/SocialBoat";
// import { useGivenOrientation } from "@hooks/orientation/useGivenOrientation";
// import { useCameraPermission } from "@hooks/permissions/useCameraPermission";
import { useCameraPermissionV2 } from "@hooks/permissions/useCameraPermissionsV2";
import { useStun } from "@hooks/stun/useStun";
import Header from "@modules/Header";
import { useTaskContext } from "@providers/task/TaskProvider";
// import { useTaskContext } from "@providers/task/TaskProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { Camera } from "expo-camera";
// import { useNavigation } from "@react-navigation/native";
// import { useState } from "react";
import { Linking, Platform, View } from "react-native";
import CameraPermission, { CameraPermissionContent } from "./CameraPermission";
// import GrantedFlow from "./GrantedFlow";
// import GrantedFlowV2 from "./GrantedFlowV2";
// import GrantedFlow from "./GrantedFlow";
// import GrantedFlowV2 from "./GrantedFlowV2";
// import { Camera, CameraType } from "expo-camera";
// import { useRef, useState } from "react";

interface Props {
  castId?: string;
}

const goToSettings = () => {
  Linking.openSettings();

  weEventTrack("workout_clickGoToSettings", {});
};

const TaskSubmitV2: React.FC<Props> = ({ castId }) => {
  //   const cameraRef = useRef<Camera>(null);

  //   const onStart = () => {
  //     if (cameraRef && cameraRef.current) {
  //       cameraRef.current
  //         .recordAsync({})
  //         .then((res) => console.log(res))
  //         .catch((e) => console.log(e));
  //     }
  //   };

  const { task } = useTaskContext();

  const navigation = useNavigation();

  // on back
  const onBack = () => navigation.goBack();

  //   const [permission, requestPermission] = Camera.useCameraPermissions();

  const {
    permissionStatus,
    // audioPermissionStatus,
    getPermission,
    initialCheck,
  } = useCameraPermissionV2();

  const { servers } = useStun();

  return (
    <View className="flex flex-1 bg-black">
      {permissionStatus?.status !== "granted" ? (
        // && audioPermissionStatus?.status !== "granted"
        <Header
          back={true}
          orientation={castId ? "portrait" : task?.orientation}
          onBack={onBack}
          backIcon="arrow"
          headerColor="#100F1A"
          tone="dark"
          titleNode={
            !castId && task?.orientation === "landscape" ? null : (
              <SocialBoat textColor="#FFFFFF" />
            )
          }
          centerTitle={true}
        />
      ) : null}
      <View className="flex-1 bg-[#100F1A]">
        {!initialCheck || !servers.length ? (
          <View className="flex flex-1 justify-center items-center">
            <Loading width="w-10" height="h-10" />
          </View>
        ) : permissionStatus?.status === "granted" ? (
          // && audioPermissionStatus?.status === "granted"
          <></>
        ) : // <GrantedFlowV3 castId={castId} servers={servers} />
        !permissionStatus?.canAskAgain ? (
          // || !audioPermissionStatus?.canAskAgain
          <CameraPermission
            onPress={goToSettings}
            cta="Go To Settings"
            text={
              Platform.OS === "ios"
                ? "You would have to go to settings in your phone to grant us camera access"
                : "You would have to go to settings in your phone to grant us camera and microphone access"
            }
          >
            <CameraPermissionContent
              text={Platform.OS === "ios" ? "Camera" : "Camera and Microphone"}
            />
          </CameraPermission>
        ) : (
          <CameraPermission onPress={getPermission} cta="Grant Access">
            <CameraPermissionContent
              text={Platform.OS === "ios" ? "Camera" : "Camera and Microphone"}
            />
          </CameraPermission>
        )}
      </View>
    </View>
  );
};

export default TaskSubmitV2;
