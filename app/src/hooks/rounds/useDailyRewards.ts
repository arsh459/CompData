import {
  dailyReward,
  dailyRewardConfiguration,
} from "@models/Rounds/interface";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { differenceInDays, format, subDays } from "date-fns";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { dayMS } from "@providers/period/periodStore";

export interface dailyRewardObjects {
  [day: number]: dailyReward;
}
export interface rewardData {
  dayDiff?: number;
  dayToUpdate?: number;
  fpToUpdate?: number;
  missed?: boolean;
  todayClaimed?: boolean;
}
export const useDailyRewards = (
  uid?: string,
  dailyRewardConfig?: dailyRewardConfiguration
) => {
  const [dailyReward, setReward] = useState<dailyReward>();
  const [rewardData, setRewardData] = useState<rewardData>({});
  const [loading, setLoading] = useState(false);

  const { today } = useAuthContext();

  // todays day
  const { todaysDay } = useUserStore((state) => {
    const todaysReward = state.dailyRewardObjs[today];

    return {
      todaysDay: todaysReward.day,
    };
  }, shallow);

  //   console.log({ uid });
  const currentDate = new Date();
  useEffect(() => {
    // todays day
    // if (todaysDay) {
    // const startUnix = todayUnix - todaysDay * dayMS;
    // fetch daily rewards in range
    // }

    const getRoundLatest = async () => {
      try {
        if (uid) {
          setLoading(true);
          // const rDt = format(roundEnd, "yyyy-MM-dd");
          // const roundStartUnix = format(roundStart, "yyyy-MM-dd");
          // console.log({ roundEnd: rDt, roundStartUnix });

          let dayDiff;
          let dayToUpdate;

          let fpToUpdate;
          const yesterdayDate = subDays(new Date(), 1); // Calculate yesterday's date
          const formattedYesterday = format(yesterdayDate, "yyyy-MM-dd");
          const formattedToday = format(new Date(), "yyyy-MM-dd");

          const yesterdayDocRef = firestore()
            .collection("users")
            .doc(uid)
            .collection("dailyReward")
            .orderBy("unix", "desc")
            .limit(1);

          const yesterdayDoc = await yesterdayDocRef.get();

          if (!yesterdayDoc.empty) {
            const docToUpdate = yesterdayDoc.docs[0].data() as
              | dailyReward
              | undefined;
            if (docToUpdate) {
              setReward(docToUpdate);
              dayDiff = docToUpdate?.unix
                ? differenceInDays(currentDate, new Date(docToUpdate.unix))
                : undefined;
              dayToUpdate =
                dailyReward &&
                typeof dailyReward?.day === "number" &&
                !dayDiff &&
                typeof dayDiff === "number"
                  ? dailyReward?.day + 1
                  : 0;
              if (dailyRewardConfig?.ptsArray) {
                fpToUpdate = dayDiff
                  ? dailyRewardConfig?.ptsArray[0].fp
                  : dailyRewardConfig.ptsArray[docToUpdate.day + 1].fp;
              }
              const missed =
                docToUpdate.date === formattedToday ||
                docToUpdate.date === formattedYesterday;
              const claimed = docToUpdate.date === formattedToday;
              setRewardData({
                dayDiff,
                dayToUpdate,
                fpToUpdate,
                missed: !missed,
                todayClaimed: claimed,
              });
            }
          }
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };
    if (uid && dailyRewardConfig) {
      getRoundLatest();
    }
  }, [uid, dailyRewardConfig, todaysDay]);

  return { dailyReward, loading, rewardData };
};
