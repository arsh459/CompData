import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";
import { ANDROID_PURCHASES, IOS_PURCHASES } from "react-native-dotenv";
import { useAuthContext } from "@providers/auth/AuthProvider";
import crashlytics from "@react-native-firebase/crashlytics";

export const usePurchases = () => {
  const { state } = useAuthContext();
  const [loaded, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const configurePurchases = async () => {
      // Purchases.setDebugLogsEnabled(true);
      // Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);

      try {
        if (Platform.OS === "android" && state.uid && ANDROID_PURCHASES) {
          Purchases.configure({
            apiKey: ANDROID_PURCHASES,
            appUserID: state.uid,
          });

          console.log("purchases configured");
          setLoading(true);
        } else if (Platform.OS === "ios" && state.uid && IOS_PURCHASES) {
          Purchases.configure({ apiKey: IOS_PURCHASES, appUserID: state.uid });
          console.log("purchases configured");
          setLoading(true);
        }
      } catch (error: any) {
        console.log("Error in purchases initialisation", error);
        setLoading(true);
        crashlytics().recordError(error);
      }
    };

    configurePurchases();
  }, [state.uid, ANDROID_PURCHASES, IOS_PURCHASES]);

  return {
    loaded,
  };
};
