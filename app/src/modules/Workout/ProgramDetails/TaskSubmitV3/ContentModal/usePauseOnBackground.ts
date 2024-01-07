import { useIsForeground } from "@hooks/utils/useIsForeground";
import { useEffect } from "react";
import { useWorkoutVideoStore } from "../utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";

export const usePauseOnBackground = () => {
  const { appStateVisible } = useIsForeground();
  const handleAppBackground = useWorkoutVideoStore(
    (state) => state.onBackRequest,
    shallow
  );

  // console.log("appStateVisible", appStateVisible);

  useEffect(() => {
    if (appStateVisible === "background" || appStateVisible === "inactive") {
      handleAppBackground();
    }
  }, [appStateVisible]);
};
