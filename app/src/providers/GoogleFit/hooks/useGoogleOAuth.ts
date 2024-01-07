import {
  createGoogleFitOAuth,
  updateGoogleFitAuth,
} from "@models/User/googleFit";
import { createZeroethStepDoc } from "@models/User/StepsDoc";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  setUserGAuthAccess,
  weEventTrack,
} from "@utils/analytics/webengage/userLog";

export const evaluateStatus = (scopes?: string[]): GFitAuthorization => {
  if (scopes && scopes.includes(fitnessScope)) {
    return "SUCCESS";
  } else if (scopes) {
    return "INCOMPLETE";
  } else if (!scopes) {
    return "NOT_PRESENT";
  } else {
    return "UNKNOWN";
  }
};

export const fitnessScope =
  "https://www.googleapis.com/auth/fitness.activity.read";

GoogleSignin.configure({
  scopes: [fitnessScope],
  offlineAccess: true,
  webClientId:
    "930903298444-67eer0239o6rd3gs0sng11quc9s0tu19.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
});

/**
 *
 * store in db current token
 * keep polling google
 * if access fails, ask for access on front end again
 *
 *
 *
 *
 */

export type GFitAuthorization =
  | "UNKNOWN"
  | "ONGOING"
  | "SUCCESS"
  | "INCOMPLETE"
  | "NOT_PRESENT";

export const removeGoogleFitScope = async (uid: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [`googleFit.scopes`]: [],
    });
};

export const useGoogleOAuth = () => {
  const { state } = useAuthContext();
  const { user } = useUserContext();

  const [gFitAuth, setGFitAuth] = useState<GFitAuthorization>("UNKNOWN");

  useEffect(() => {
    const checkAuth = async () => {
      if (Platform.OS === "android" && user?.uid) {
        // const res = await GoogleSignin.isSignedIn();
        const scopeStatus = evaluateStatus(user?.googleFit?.scopes);

        // save in mixpanel
        setUserGAuthAccess(scopeStatus);

        setGFitAuth(scopeStatus);
      }
    };

    checkAuth();
  }, [user?.googleFit?.scopes, user?.uid]);

  const onGoogleSignOut = async () => {
    try {
      user?.uid && (await removeGoogleFitScope(user?.uid));
      await GoogleSignin.signOut();

      // save in mixpanel
      setUserGAuthAccess("NOT_PRESENT");
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error here");
    }
  };

  const onIncompleteRequest = async () => {
    if (gFitAuth === "INCOMPLETE") {
      // disconnect
      await GoogleSignin.signOut();
      await requestSignIn();
    }
  };

  const requestSignIn = async () => {
    try {
      if (state.uid) {
        //   await GoogleSignin.signOut();
        setGFitAuth("ONGOING");
        const userInfo = await GoogleSignin.signIn({
          loginHint: "Please give access to read fitness data",
        });

        //const tokens = await GoogleSignin.getTokens();

        const gUser = createGoogleFitOAuth(
          userInfo.scopes ? userInfo.scopes : [],
          userInfo.serverAuthCode,
          userInfo.idToken,
          userInfo.user
        );

        const fitStatus = evaluateStatus(userInfo.scopes);

        if (fitStatus === "SUCCESS") {
          weEventTrack("steps_gfitSuccess", {});
        }

        setUserGAuthAccess(fitStatus);

        await createZeroethStepDoc(state.uid);
        await updateGoogleFitAuth(state.uid, gUser);
      }
    } catch (error: any) {
      crashlytics().recordError(error);
      const fitStatusInFail = evaluateStatus(user?.googleFit?.scopes);

      setGFitAuth(fitStatusInFail);

      setUserGAuthAccess(fitStatusInFail);
    }
  };

  return {
    requestSignIn,
    onIncompleteRequest,
    onGoogleSignOut,
    gFitAuth,
  };
};
