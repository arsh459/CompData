import { sevenDaySteps } from "@hooks/steps/useSteps";
// import { getTimesForSteps } from "@hooks/steps/utils";
import { saveStepActivities } from "@models/Activity/createUtils";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
// import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
// import { useGoogleFitPermissions } from "./useGoogleFitPermissions";

export type refreshTypes = "REQUESTED" | "DONE";

export const useGoogleFit = () => {
  const { state } = useAuthContext();

  // const { googleAuthStatus } = useStepsPermissionContext();
  const [refresh, updateRefresh] = useState<refreshTypes>("DONE");
  const [refreshCt, updateRefreshCt] = useState<number>(0);

  const onRefreshFit = () => {
    updateRefresh("REQUESTED");
    updateRefreshCt((p) => p + 1);
  };

  useEffect(() => {
    const getGFitSteps = async () => {
      // await GoogleFit.checkIsAuthorized();
      // const authStatus = GoogleFit.isAuthorized;
      const authStatus = false;

      if (authStatus && state.uid) {
        // const timeSteps = getTimesForSteps(1);
        // const nowStartUnix = nowStart.getTime();
        // let dSt = nowStartUnix - 6 * 24 * 60 * 60 * 1000;

        const steps: sevenDaySteps = {};
        // for (const step of timeSteps) {
        //   try {
        //     const response = await GoogleFit.getDailyStepCountSamples({
        //       startDate: step[0].toISOString(),
        //       endDate: step[1].toISOString(),
        //       bucketUnit: BucketUnit.DAY,
        //       bucketInterval: 1,
        //     });

        //     let stepsCt: number = 0;
        //     for (const resp of response) {
        //       for (const raw of resp.rawSteps) {
        //         if (
        //           raw.originDataSourceId &&
        //           !raw.originDataSourceId.includes("user_input")
        //         ) {

        //           stepsCt += raw.steps;
        //         }
        //       }
        //     }

        //     steps[format(step[0], "yyyy-MM-dd")] = stepsCt;
        //   } catch (error: any) {
        //   }
        // }

        // update refresh
        updateRefresh("DONE");

        if (Object.keys(steps).length) {
          saveStepActivities(state.uid, steps);
        }
      }
    };

    // getGFitSteps();

    if (Platform.OS === "android") {
      const timer = setTimeout(() => getGFitSteps(), 4000);
      // const interval = setInterval(() => getGFitSteps(), 5 * 60 * 1000);

      return () => {
        clearTimeout(timer);
        // clearInterval(interval);
      };
    }
  }, [refreshCt]);

  return {
    refresh,
    onRefreshFit,
  };
};
