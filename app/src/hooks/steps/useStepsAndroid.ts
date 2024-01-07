import { saveStepActivities } from "@models/Activity/createUtils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { format } from "date-fns";
import { Pedometer } from "expo-sensors";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { Platform } from "react-native";
// import { useMotionPermissionV2 } from "../../providers/steps/hooks/useMotionPermissionV2";
// import { startCounter, stopCounter } from "react-native-accurate-step-counter";
import { needsPermission } from "./useMotionPermission";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";

export const useStepsAndroid = (refresh?: number) => {
  const { state } = useAuthContext();
  const { permission } = useStepsPermissionContext();

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      permission === Pedometer.PermissionStatus.GRANTED &&
      state.uid
    ) {
      const today = new Date();
      const uidToSave = state.uid;
      const todayString = format(today, "yyyy-MM-dd");
      const sId = uuidv4();

      // android 10+
      if (!needsPermission()) {
        const sub = Pedometer.watchStepCount((stepResult) => {
          saveStepActivities(
            uidToSave,
            { [todayString]: stepResult.steps },
            sId
          );
        });

        return () => {
          sub.remove();
        };
      } else {
        // android 9 and below
        // const config = {
        //   default_threshold: 15.0,
        //   default_delay: 150000000,
        //   cheatInterval: 3000,
        //   onStepCountChange: (stepCount: number) => {
        //     saveStepActivities(uidToSave, { [todayString]: stepCount }, sId);
        //   },
        //   onCheat: () => {
        //     console.log("cheated");
        //   },
        // };
        // startCounter(config);

        return () => {
          // stopCounter();
        };
      }
    }
  }, [state.uid, permission, refresh]);

  return {
    permission,
  };
};
