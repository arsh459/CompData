import { useCameraPermissionV3 } from "@hooks/permissions/useCameraPermissionsV3";
import { ReactNode } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
import PermissionStatusComp from "./PermissionStatusComp";

interface Props {
  children: ReactNode;
}

const PermissionNutritionWrapper: React.FC<Props> = ({ children }) => {
  const { permissionStatus } = useCameraPermissionV3();
  return permissionStatus === "granted" || permissionStatus === "limited" ? (
    <>{children}</>
  ) : permissionStatus === "denied" ? (
    <PermissionStatusComp
      title="Allow camera Permisions"
      cta="Allow Permissions"
      subTitle="In order to track via your camera you need to allow permissions in the settings"
    />
  ) : permissionStatus === "blocked" ? (
    <PermissionStatusComp
      title="Allow camera Permisions"
      cta="Open Settings"
      subTitle="In order to track via your camera you need to allow permissions in the settings"
    />
  ) : permissionStatus === "unavailable" || permissionStatus === "unknown" ? (
    <PermissionStatusComp
      title="Allow camera Permisions"
      cta="Open Settings"
      subTitle="Your device is not able to access the camera"
      disable={true}
    />
  ) : (
    <PermissionStatusComp
      title="Allow camera Permisions"
      cta="Open Settings"
      subTitle="Your device is not able to access the camera"
      disable={true}
    />
  );
};

export default PermissionNutritionWrapper;
