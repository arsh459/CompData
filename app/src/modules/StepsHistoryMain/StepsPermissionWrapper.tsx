// import { useMotionPermission } from "@hooks/steps/useMotionPermission";

// import { Pedometer } from "expo-sensors";
// import StartButton from "@modules/HomeScreen/NewHome/StartButton";
// import {
// googleFitPermissionImg,
// trackingStepsPermissionImg,
// } from "@constants/imageKitURL";
// import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
// import RequestPermission from "@modules/Workout/ProgramDetails/TaskSubmitV2/RequestPermission";
import { Platform, View } from "react-native";
// import { openSettings, RESULTS } from "react-native-permissions";
// import PermissionTaker from "./PermissionTaker";
import IOSPermissionHandler from "./IOSPermissionHandler";
import AndroidPermissionWrapper from "./AndroidPermissionWrapper";

interface Props {
  children: React.ReactNode;
}

const StepsPermissionWrapper: React.FC<Props> = ({ children }) => {
  return (
    <View className="bg-black flex-1">
      {Platform.OS === "android" ? (
        <AndroidPermissionWrapper>{children}</AndroidPermissionWrapper>
      ) : (
        <IOSPermissionHandler>{children}</IOSPermissionHandler>
      )}
    </View>
  );
};

export default StepsPermissionWrapper;
