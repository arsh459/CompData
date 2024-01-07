import { useAuthContext } from "@providers/auth/AuthProvider";
import { useDailyReward } from "./useDailyReward";
import { dayMS } from "@providers/period/periodStore";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDailyRewardCount } from "./useDailyRewardCount";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export type dailyRewardUserState = "claim" | "claimed" | "missed" | "unknown";

export const useDailyRewardProgress = () => {
  // const [dailyRewardState, setDailyRewardState] =
  //   useState<dailyRewardUserState>("unknown");
  // const [todayRewardProgress, setTodayProgress] = useState<number>();

  const { today, todayUnix } = useAuthContext();
  const { reward, loading } = useDailyReward(today);
  const yesterdayObj = useDailyReward(
    format(new Date(todayUnix - dayMS), "yyyy-MM-dd")
  );
  const { dailyRewardCount } = useDailyRewardCount();
  const setDailyRewardStatus = useUserStore(
    (state) => state.setDailyRewardStatus,
    shallow
  );

  useEffect(() => {
    if (
      loading === false &&
      yesterdayObj.loading === false &&
      typeof dailyRewardCount === "number"
    ) {
      if (reward?.fp) {
        // setDailyRewardState("claimed");
        setDailyRewardStatus("claimed");
      } else if (dailyRewardCount === 0) {
        setDailyRewardStatus("claim");
      } else if (!yesterdayObj.reward?.fp) {
        setDailyRewardStatus("missed");
      } else if (yesterdayObj.reward.fp) {
        setDailyRewardStatus("claim");
      }
    }
  }, [
    reward?.fp,
    loading,
    yesterdayObj.loading,
    yesterdayObj.reward?.fp,
    dailyRewardCount,
  ]);

  // return {
  //   // dailyRewardState,
  //   // todayReward: reward,
  // };
};
