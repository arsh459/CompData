import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { Platform } from "react-native";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import { refreshTypes } from "./useGoogleFit";
import crashlytics from "@react-native-firebase/crashlytics";
// import { useStun } from "@hooks/stun/useStun";

// export type refreshStatus = "REFRESHING" | "DONE";

export const useGoogleFitV2 = () => {
  const [refresh, updateRefresh] = useState<refreshTypes>("DONE");
  const [refreshCt, updateRefreshCt] = useState<number>(0);

  const { state } = useAuthContext();
  const { gFitAuth } = useStepsPermissionContext();

  // const [tmpState, setTmpState] = useState({});

  // useStun();

  useEffect(() => {
    const callAPI = async () => {
      if (gFitAuth === "SUCCESS" && state.uid && Platform.OS === "android") {
        try {
          await axios({
            url: "https://asia-south1-holidaying-prod.cloudfunctions.net/googleFit",
            method: "post",
            data: {
              uid: state.uid,
            },
            headers: {
              "Content-Type": "application/json",
            },
          });

          // const resp2 = axios.post(
          //   "https://asia-south1-holidaying-prod.cloudfunctions.net/googleFit",
          //   { uid: state.uid }

          // setTmpState(res.data);

          updateRefresh("DONE");
        } catch (error: any) {
          crashlytics().recordError(error);
          updateRefresh("DONE");
        }
      }
    };

    setTimeout(() => callAPI(), 2000);

    // setTimeout(async () => {
    //   await callAPI();
    // }, 2000);
    return () => {
      // clearTimeout(timer);
      // updateRefresh("DONE");
    };
  }, [refreshCt, state.uid, gFitAuth]);

  const onRefreshFit = () => {
    updateRefresh("REQUESTED");
    updateRefreshCt((p) => p + 1);
  };

  return {
    refresh,
    onRefreshFit,
  };
};
