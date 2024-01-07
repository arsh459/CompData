import { View } from "react-native";
import React from "react";
import ClamCardList from "./ClamCardList";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useDailyRewards } from "@hooks/rounds/useDailyRewards";

import DailyRewardHeading from "./DailyRewardHeading";
import { useDailyRewardConfiguration } from "@hooks/rounds/useDailyRewardConfiguration";
interface Props {}
const ClaimMain: React.FC<Props> = ({}) => {
  const { uid } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
    };
  }, shallow);

  const { dailyRewardConfig } = useDailyRewardConfiguration();
  const { dailyReward, rewardData } = useDailyRewards(uid, dailyRewardConfig);
  let data = dailyRewardConfig?.ptsArray;
  if (
    rewardData?.dayDiff &&
    rewardData?.dayDiff > 2 &&
    data &&
    data.length > 3
  ) {
    data = data?.slice(0, 3);
  }
  return (
    <View className=" flex-1  rounded-3xl border-[#FFBB35]  mx-4">
      <DailyRewardHeading />

      {rewardData && data?.length ? (
        <ClamCardList
          data={data}
          dailyReward={dailyReward}
          dailyRewardConfigId={dailyRewardConfig?.id}
          uid={uid}
          rewardData={rewardData}
        />
      ) : null}
    </View>
  );
};

export default ClaimMain;
