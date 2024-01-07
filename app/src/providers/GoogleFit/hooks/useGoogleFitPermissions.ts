// import { updatePermissionDoc } from "@models/User/createUtils";
// import { updateGFitAuthorization } from "@models/User/updateUtils";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

// const options: AuthorizeOptions = {
//   scopes: [Scopes.FITNESS_ACTIVITY_READ],
// };

export type GoogleAuthStatus = "UNKNOWN" | "GRANTED" | "DENIED";

export const useGoogleFitPermissions = () => {
  const [googleAuthStatus] = useState<GoogleAuthStatus>("UNKNOWN");
  const [isGoogleFitPresent] = useState<GoogleAuthStatus>("UNKNOWN");

  // const { state } = useAuthContext();
  const { user } = useUserContext();

  useEffect(() => {
    const checkAccess = async () => {
      // await GoogleFit.checkIsAuthorized();
      // const authStatus = GoogleFit.isAuthorized;
      // setAuthStatus(authStatus ? "GRANTED" : "DENIED");
      // check availability
      // GoogleFit.isAvailable((error, result) => {
      //   if (error) {
      //   } else {
      //     setGoogleFitAvailability(result ? "GRANTED" : "DENIED");
      //   }
      // });
    };

    if (Platform.OS === "android") {
      checkAccess();
    }
  }, [user?.permissionUpdate]);

  const authorizeRequest = async () => {
    // const response = await GoogleFit.authorize(options);
    // check availability
    // GoogleFit.isAvailable((error, result) => {
    //   if (error) {
    //   } else {
    //     setGoogleFitAvailability(result ? "GRANTED" : "DENIED");
    //   }
    // });
    // if (response.success) {
    //   setAuthStatus("GRANTED");
    //   // update permission to fetch docs
    //   state.uid && updatePermissionDoc(state.uid);
    // } else {
    //   setAuthStatus("DENIED");
    // }
  };

  const sendToDownloadGoogleFit = () => {
    Linking.openURL("market://details?id=com.google.android.apps.fitness");
  };

  return {
    googleAuthStatus,
    authorizeRequest,
    sendToDownloadGoogleFit,
    isGoogleFitPresent,
  };
};
