import { dailyRewardConfiguration } from "@models/Rounds/interface";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useConfigContext } from "@providers/Config/ConfigProvider";

export const useAnyDailyReward = () => {
  const [dailyRewardConfig, setDailyRewardConfiguration] =
    useState<dailyRewardConfiguration>();

  const { config } = useConfigContext();

  useEffect(() => {
    if (config?.dailyRewardId) {
      const listener = firestore()
        .collection("dailyRewardConfiguration")
        .doc(config.dailyRewardId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setDailyRewardConfiguration(doc.data() as dailyRewardConfiguration);
          }
        });

      return () => {
        listener();
      };
    }
  }, [config?.dailyRewardId]);

  return {
    dailyRewardConfig,
  };
};
