import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import {
  dailyReward,
  // dailyRewardConfiguration,
} from "@models/Rounds/interface";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export const useDailyReward = (date?: string) => {
  // const [progress, setProgress] = useState<number>(0);
  // const [numTier, setNumTier] = useState<number>(0);
  const [reward, setReward] = useState<dailyReward>();
  const [loading, setLoading] = useState<boolean>(true);

  const { userId, setDailyReward } = useUserStore(
    (state) => ({
      userId: state.user?.uid,
      setDailyReward: state.setDailyReward,
    }),
    shallow
  );

  useEffect(() => {
    if (userId && date) {
      const listener = firestore()
        .collection("users")
        .doc(userId)
        .collection("dailyReward")
        .where("date", "==", date)
        .onSnapshot((docs) => {
          if (docs.docs.length) {
            const todayReward = docs.docs[0].data() as dailyReward;
            setReward(todayReward);
            setDailyReward(todayReward);

            // if (todayReward?.dailyRewardId) {
            // const rewardConfigRef = firestore()
            //   .collection("dailyRewardConfiguration")
            //   .doc(todayReward.dailyRewardId);
            // const configDoc = await rewardConfigRef.get();
            // if (!configDoc.exists) {
            //   // Configuration not found, set progress to 0
            //   setProgress(0);
            //   return;
            // }
            // const configData = configDoc.data() as
            // | dailyRewardConfiguration
            // | undefined;
            // Calculate today's progress
            // if (configData) {
            //   const todaysPtData = configData?.ptsArray[todayReward.day];
            //   if (todaysPtData?.tier !== numTier)
            //     setNumTier(todaysPtData?.tier);
            //   const todayProgress = todayReward.fp / todaysPtData.fp;
            //   setProgress(todayProgress);
            // }
            // }
          }

          setLoading(false);
        });

      return () => {
        listener();
      };
    }

    // // Fetch the user's daily reward progress
    // const fetchDailyRewardProgress = async () => {

    //   try {

    //     // Fetch the user's daily reward data for today
    //     const userDailyRewardRef = firestore().collection(
    //       `users/${userId}/dailyReward`
    //     );
    //     const querySnapshot = await userDailyRewardRef
    //       .where("date", "==", todayDate)
    //       .get();

    //     if (querySnapshot.empty) {
    //       // No data found for today, set progress to 0
    //       setProgress(0);
    //       return;
    //     }

    //     const todayReward = querySnapshot.docs[0].data() as dailyReward;

    //     // Find the corresponding configuration entry based on 'dailyRewardId'

    //   } catch (error) {
    //     console.error("Error fetching today's progress:", error);
    //   }
    // };

    // if (userId) {
    //   fetchDailyRewardProgress();
    // }
  }, [userId, date]);

  return {
    reward,
    loading,
  };
  // return { rewardProgress: progress, numTier, todayReward: reward };
};
