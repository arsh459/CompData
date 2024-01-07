// import { useMotionPermission } from "@hooks/steps/useMotionPermission";
// import { PermissionStatus } from "expo-location";
// import { useSteps } from "@hooks/steps/useSteps";
// import RequestPermission from "@modules/Workout/ProgramDetails/TaskSubmitV2/RequestPermission";
// import { useLocationContext } from "@providers/location/LocationProvider";
// import { Pedometer } from "expo-sensors";
import { Platform } from "react-native";
// import { openSettings } from "react-native-permissions";
import AndroidLocPermissionWrapper from "./AndroidLocPermissionWrapper";
import IOSLocPermissionWrapper from "./IOSLocPermissionWrapper";

interface Props {
  children: React.ReactNode;
}

const LocationPermissionWrapper: React.FC<Props> = ({ children }) => {
  return Platform.OS === "android" ? (
    <AndroidLocPermissionWrapper>{children}</AndroidLocPermissionWrapper>
  ) : (
    <IOSLocPermissionWrapper>{children}</IOSLocPermissionWrapper>
  );
};

export default LocationPermissionWrapper;
