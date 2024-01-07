// import SocialBoat from "@components/SocialBoat";
import { useCameraPermissionV3 } from "@hooks/permissions/useCameraPermissionsV3";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useState } from "react";
import { View } from "react-native";
import PermissionWrapper from "./PermissionWrapper";
// import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
import GrantedFlowV5 from "./GrantedFlowV5";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";

interface Props {
  initDone: boolean;
  // castId?: string;
  // attemptedDate: string;
}

export type aiToggleStatus = "unknown" | "disabled" | "enabled";
export const GREESHA_PCOS = "d3b54de8-ac46-431c-b174-ab3351729413";

const TaskSubmitV3: React.FC<Props> = ({ initDone }) => {
  // const tone = task?.badgeIds?.includes(GREESHA_PCOS) ? "light" : "dark";

  const navigation = useNavigation();

  // on back
  const onBack = () => {
    navigation.goBack();
    weEventTrack("workout_goBeforePermission", {});
  };

  const { permissionStatus, requestPermission } = useCameraPermissionV3();

  // const [aiToggle, setAIToggle] = useState<aiToggleStatus>("unknown");
  const {
    aiToggle,
    setAIToggle,
    // finalOrientation
  } = useWorkoutVideoStore((state) => {
    return {
      aiToggle: state.aiToggle,
      setAIToggle: state.setAIToggle,
      // tone: state.tone,
      // finalOrientation: state.finalOrientation,
    };
  }, shallow);

  const disableAIToggle = () => {
    setAIToggle("disabled");
    weEventTrack("workout_clickWithoutCameraAccess", {});
  };

  const enableAIToggle = () => {
    setAIToggle("enabled");
    weEventTrack("workout_clickWithoutCameraAccess", {});
  };

  // return <GrantedFlowV5 />;
  // console.log("task submit");

  return (
    <View className="flex flex-1 bg-black">
      {aiToggle === "unknown" ? (
        <Header
          back={true}
          // orientation={finalOrientation}
          onBack={onBack}
          backIcon="arrow"
          headerColor="#171624"
          tone="dark"
          // titleNode={
          //   finalOrientation === "landscape" ? null : (
          //     <SocialBoat textColor="#FFFFFF" />
          //   )
          // }
          centerTitle={true}
        />
      ) : null}
      {!initDone ? null : aiToggle === "unknown" &&
        permissionStatus === "denied" ? (
        <PermissionWrapper
          ctaPress1={disableAIToggle}
          ctaPress2={requestPermission}
          ctaText2="Give camera Permissions"
          ctaText1="Proceed without Camera"
        />
      ) : aiToggle === "unknown" &&
        (permissionStatus === "blocked" || permissionStatus === "limited") ? (
        <PermissionWrapper
          ctaPress1={disableAIToggle}
          ctaPress2={requestPermission}
          ctaText2="Give Permissions from Settings"
          ctaText1="Proceed without Camera"
        />
      ) : aiToggle === "unknown" && permissionStatus === "granted" ? (
        <PermissionWrapper
          ctaPress1={disableAIToggle}
          ctaPress2={enableAIToggle}
          ctaText2="Proceed with AI Scan"
          ctaText1="Proceed without Camera"
        />
      ) : aiToggle === "disabled" || aiToggle === "enabled" ? (
        <GrantedFlowV5
        // castId={castId}
        // attemptedDate={attemptedDate}
        // aiToggle={aiToggle}
        // tone={tone}
        />
      ) : (
        <PermissionWrapper
          ctaPress1={disableAIToggle}
          ctaPress2={requestPermission}
          ctaText2="Give camera Permissions"
          ctaText1="Proceed without Camera"
        />
      )}
    </View>
  );
};

export default TaskSubmitV3;
