import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";
import Share from "react-native-share";

export type AppPresentStates = "UNKNOWN" | "PRESENT" | "ABSENT";

export const useIsAppInstalled = (packageName: string) => {
  const [appPresentStatus, setAppPresentStatus] =
    useState<AppPresentStates>("UNKNOWN");

  useEffect(() => {
    const checkIfPresent = async () => {
      const res = await Share.isPackageInstalled(packageName);
      if (res.isInstalled) {
        setAppPresentStatus("PRESENT");
      } else {
        setAppPresentStatus("ABSENT");
      }
    };

    if (Platform.OS === "android") {
      checkIfPresent();
    }
  }, [packageName]);

  const sendToDownload = () => {
    try {
      Linking.openURL(`market://details?id=${packageName}`);
    } catch (error: any) {
      crashlytics().recordError(error);
    }
  };

  const openFit = () => {
    if (appPresentStatus) {
      // Linking.sendIntent(packageName);
      sendToDownload();
    } else {
      sendToDownload();
    }
  };

  return {
    appPresentStatus, //: "PRESENT",
    sendToDownload,
    openFit,
  };
};
