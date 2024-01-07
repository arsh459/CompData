import { useState, useEffect } from "react";
// import { Alert } from "react-native";
import notifee from "@notifee/react-native";

const useBatterySaverStatus = () => {
  const [isBatterySaverOn, setIsBatterySaverOn] = useState(false);

  useEffect(() => {
    const checkBatterySaverStatus = async () => {
      const batteryOptimizationEnabled =
        await notifee.isBatteryOptimizationEnabled();
      setIsBatterySaverOn(batteryOptimizationEnabled);
    };
    checkBatterySaverStatus();
  }, []);

  const promptDisableBatteryOptimization = async () => {
    await notifee.openBatteryOptimizationSettings();
    // Alert.alert(
    //   "Restrictions Detected",
    //   "To ensure notifications are delivered, please disable battery optimization for the app.",
    //   [
    //     {
    //       text: "OK, open settings",
    //       onPress: async () => await notifee.openBatteryOptimizationSettings(),
    //     },
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel",
    //     },
    //   ],
    //   { cancelable: false }
    // );
  };

  return { isBatterySaverOn, promptDisableBatteryOptimization };
};

export default useBatterySaverStatus;
