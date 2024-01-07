import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";

export const useDailyRewardCount = () => {
  const [dailyRewardCount, setDailyRewardCount] = useState<number>();

  const userId = useUserStore((state) => state.user?.uid);

  useEffect(() => {
    const getDailyRewards = async () => {
      const countObj = await firestore()
        .collection("users")
        .doc(userId)
        .collection("dailyReward")
        .count()
        .get();

      const data = countObj.data();
      setDailyRewardCount(data.count);
    };

    userId && getDailyRewards();
  }, [userId]);

  return {
    dailyRewardCount,
  };
};
