// import { GoogleAuthStatus } from "@providers/GoogleFit/hooks/useGoogleFitPermissions";
import { GFitAuthorization } from "@providers/GoogleFit/hooks/useGoogleOAuth";
import { AppPresentStates } from "@providers/GoogleFit/hooks/useIsAppInstalled";
import { PermissionStatus } from "react-native-permissions";

export type StepsPermissionContextProps = {
  children: React.ReactNode;
};

export interface StepsPermissionContextInterface {
  permission: PermissionStatus;
  requestPermission: () => Promise<void>;
  requestSignIn: () => Promise<void>;
  onIncompleteRequest: () => Promise<void>;
  onGoogleSignOut: () => Promise<void>;
  gFitAuth: GFitAuthorization;
  appPresentStatus: AppPresentStates;
  playServicesStatus: AppPresentStates;
  requestPlayServices: () => Promise<void>;
  openFit: () => void;
  // googleAuthStatus: GoogleAuthStatus;
  // authorizeRequest: () => Promise<void>;
  // isGoogleFitPresent: GoogleAuthStatus;
  sendToDownload: () => void;
}
