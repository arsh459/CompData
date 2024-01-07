// import { useGoogleFitPermissions } from "@providers/GoogleFit/hooks/useGoogleFitPermissions";
import { useGoogleOAuth } from "@providers/GoogleFit/hooks/useGoogleOAuth";
import { useIsAppInstalled } from "@providers/GoogleFit/hooks/useIsAppInstalled";
import { useIsPlayServices } from "@providers/GoogleFit/hooks/useIsPlayServices";
import { createContext, useContext } from "react";
import { useMotionPermissionV2 } from "./hooks/useMotionPermissionV2";
import {
  StepsPermissionContextInterface,
  StepsPermissionContextProps,
} from "./interface";

const StepsPermissionContext = createContext<
  StepsPermissionContextInterface | undefined
>(undefined);

function StepsPermissionProvider({ children }: StepsPermissionContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  const { permission, requestPermission } = useMotionPermissionV2();
  // const {
  //   googleAuthStatus,
  //   authorizeRequest,
  //   isGoogleFitPresent,
  //   sendToDownloadGoogleFit,
  // } = useGoogleFitPermissions();
  const { appPresentStatus, sendToDownload, openFit } = useIsAppInstalled(
    "com.google.android.apps.fitness"
  );
  const { playServicesStatus, requestPlayServices } = useIsPlayServices();

  const { requestSignIn, onIncompleteRequest, onGoogleSignOut, gFitAuth } =
    useGoogleOAuth();

  const value = {
    permission,
    requestPermission,
    requestSignIn,
    onIncompleteRequest,
    onGoogleSignOut,
    gFitAuth,
    appPresentStatus,
    sendToDownload,
    playServicesStatus,
    requestPlayServices,
    openFit,
  };

  return (
    <StepsPermissionContext.Provider value={value}>
      {children}
    </StepsPermissionContext.Provider>
  );
}

function useStepsPermissionContext() {
  const context = useContext(StepsPermissionContext);

  if (context === undefined) {
    throw new Error(
      "useStepsPermissionContext must be used within StepsPermissionProvider"
    );
  }

  return context;
}

export { StepsPermissionProvider, useStepsPermissionContext };
