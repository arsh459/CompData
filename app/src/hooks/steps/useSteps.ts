import { saveStepActivities } from "@models/Activity/createUtils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { refreshTypes } from "@providers/GoogleFit/hooks/useGoogleFit";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import { format } from "date-fns";
import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";
// import { useMotionPermission } from "./useMotionPermission";
// import { useMotionPermissionV2 } from "../../providers/steps/hooks/useMotionPermissionV2";
// import PedometerDetails from "react-native-pedometer-details";

export interface sevenDaySteps {
  [day: string]: number;
}

export const useSteps = () => {
  const { state } = useAuthContext();
  const [refreshIOS, updateRefreshIOS] = useState<refreshTypes>("REQUESTED");
  const [refreshCt, updateRefreshCt] = useState<number>(0);

  // const [refresh, setRefresh] = useState<number>(0);
  // const []
  const onRefreshIOS = () => {
    updateRefreshCt((p) => p + 1);
    updateRefreshIOS("REQUESTED");
  };

  // const refreshSteps = () => setRefresh((p) => p + 1);

  const { permission } = useStepsPermissionContext();
  // console.log("permission", permission);

  useEffect(() => {
    const getStepCount = async () => {
      if (state.uid && permission === Pedometer.PermissionStatus.GRANTED) {
        const now = new Date();
        const nowStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0,
          0,
          0
        );
        const nowStartUnix = nowStart.getTime();

        let dSt = nowStartUnix - 6 * 24 * 60 * 60 * 1000;

        const steps: sevenDaySteps = {};
        for (let i: number = 0; i < 7; i++) {
          const tDay = new Date(dSt);
          const dayStart = new Date(
            tDay.getFullYear(),
            tDay.getMonth(),
            tDay.getDate(),
            0,
            0,
            0,
            0
          );
          const dayStartUnix = dayStart.getTime();
          const dayEnd = new Date(dayStartUnix + 24 * 60 * 60 * 1000);

          try {
            const ct = await Pedometer.getStepCountAsync(
              // new Date(time - 7 * 24 * 60 * 60 * 1000),
              dayStart,
              dayEnd
            );

            steps[format(dayStart, "yyyy-MM-dd")] = ct.steps;
          } catch (error: any) {
            crashlytics().recordError(error);
          }

          dSt = dayEnd.getTime();
        }

        if (Object.keys(steps).length) {
          await saveStepActivities(state.uid, steps);
          // updateRefreshIOS("DONE");
          setTimeout(() => updateRefreshIOS("DONE"), 1000);
        } else {
          setTimeout(() => updateRefreshIOS("DONE"), 1000);
        }
      }
    };

    if (Platform.OS === "ios") {
      getStepCount();
    }
  }, [state.uid, refreshCt, permission]);

  return {
    refreshIOS,
    onRefreshIOS,
  };
};
