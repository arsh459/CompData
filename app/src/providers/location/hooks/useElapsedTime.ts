import { useEffect, useState } from "react";
import { locationAppState } from "./useLocationValues";
import BackgroundTimer from "react-native-background-timer";

export const useElapsedTime = (appState: locationAppState) => {
  const [secondsElapsed, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (appState === "RUNNING") {
      const interval = BackgroundTimer.setInterval(() => {
        setSeconds((p) => p + 1);
      }, 1000);

      return () => {
        BackgroundTimer.clearInterval(interval);
      };
    }
  }, [appState]);

  return {
    secondsElapsed,
  };
};
