import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import { firebase } from "@react-native-firebase/app-check";
import * as Sentry from "@sentry/react-native";
import { useAttestStore } from "./attestStore";
import { shallow } from "zustand/shallow";
import { DEBUG_APPCHECK_AND, DEBUG_APPCHECK_IOS } from "react-native-dotenv";

export const useAttest = () => {
  const { setAttest, retry } = useAttestStore(
    (state) => ({ setAttest: state.setAttest, retry: state.retry }),
    shallow
  );

  useEffect(() => {
    const configureAppCheckRN = async () => {
      weEventTrack("tryingAttest", {});
      const rnfbProvider = firebase
        .appCheck()
        .newReactNativeFirebaseAppCheckProvider();
      rnfbProvider.configure({
        android: {
          provider: __DEV__ ? "debug" : "playIntegrity",
          debugToken: DEBUG_APPCHECK_AND,
        },
        apple: {
          provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
          debugToken: DEBUG_APPCHECK_IOS,
        },
      });

      firebase.appCheck().initializeAppCheck({
        provider: rnfbProvider,
        isTokenAutoRefreshEnabled: true,
      });

      const { token } = await firebase.appCheck().getToken(true);
      if (token.length > 0) {
        weEventTrack("attestSuccess", {});
        setAttest("done");
      } else {
        weEventTrack("attestFail", {});
        setAttest("failed");
      }
    };

    configureAppCheckRN().catch((e) => {
      weEventTrack("attestFail", {});
      setAttest("failed");
      crashlytics().recordError(e);
      Sentry.captureException(e);
    });
  }, [retry]);
};
