import { useForegroundPermissions } from "expo-location";

export const useLocationPermission = () => {
  const [status, requestPermission] = useForegroundPermissions({});

  return {
    status,
    requestPermission,
  };
};
