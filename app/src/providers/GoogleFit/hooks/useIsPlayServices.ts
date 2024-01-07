import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AppPresentStates } from "./useIsAppInstalled";
import { Platform } from "react-native";

export const useIsPlayServices = () => {
  const [playServicesStatus, setPlayServicesStatus] =
    useState<AppPresentStates>("UNKNOWN");

  useEffect(() => {
    const checkPlayServices = async () => {
      const response = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: false,
      });
      setPlayServicesStatus(response ? "PRESENT" : "ABSENT");
    };

    if (Platform.OS === "android") {
      checkPlayServices();
    }
  }, []);

  const requestPlayServices = async () => {
    const response = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    setPlayServicesStatus(response ? "PRESENT" : "ABSENT");
  };

  return {
    playServicesStatus,
    requestPlayServices,
  };
};
