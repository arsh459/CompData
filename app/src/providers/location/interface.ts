import { LocationPermissionResponse } from "expo-location";
import { locationDp } from "./hooks/useLocationValues";

export type LocationContextProps = {
  children: React.ReactNode;
};

export interface LocationContextInterface {
  status: LocationPermissionResponse | null;
  requestPermission: () => Promise<LocationPermissionResponse>;
  openSettings: () => Promise<void>;
  secondsElapsed: number;
  locResponse: locationDp;
  onStart: () => void;
  onFinish: () => void;
  onPause: () => void;
  onRemoveSubscription: () => void;
}
