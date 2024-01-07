import { dailyReward } from "@models/Rounds/interface";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useDailyRewardConfiguration } from "./useDailyRewardConfiguration";

export interface dailyRewardObjects {
  [day: number]: dailyReward;
}

export const useRoundDailyRewards = (
  uid?: string,
  roundStart?: number,
  roundEnd?: number
) => {
  const { dailyRewardConfig } = useDailyRewardConfiguration();
  const [dailyRewards, setReward] = useState<dailyRewardObjects>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRoundLatest = async () => {
      try {
        if (uid) {
          setLoading(true);
          // const rDt = format(roundEnd, "yyyy-MM-dd");
          // const roundStartUnix = format(roundStart, "yyyy-MM-dd");
          // console.log({ roundEnd: rDt, roundStartUnix });
          const opData: dailyRewardObjects = {};
          const unsubscribe = firestore()
            .collection("users")
            .doc(uid)
            .collection("dailyReward")

            .orderBy("unix", "asc")
            .onSnapshot((querySnapshot) => {
              if (querySnapshot) {
                for (const doc of querySnapshot.docs) {
                  const remoteReward = doc.data() as dailyReward | undefined;
                  if (remoteReward) {
                    opData[remoteReward.day] = remoteReward;

                    // const Unix = format(remoteReward.unix, "yyyy-MM-dd");
                    // console.log({ Unix }, remoteReward.day, "day");
                  }
                }

                setReward(opData);
              }
              // console.log(opData, "this is op");

              setLoading(false);
              return () => {
                unsubscribe();
              };
            });
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    getRoundLatest();
  }, [uid]);

  return { dailyRewards, loading, ptsArr: dailyRewardConfig?.ptsArray };
};
