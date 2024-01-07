import { View, useWindowDimensions } from "react-native";
import React from "react";
import ImageWithURL from "@components/ImageWithURL";
import { habitBuilderBg } from "@constants/imageKitURL";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
// import { getOverallProgress } from "../../progressUtils";
import { getTimestringToShow } from "../../utils";
import HabitBuilderProgressCard from "./HabitBuilderProgressCard";
import { useNavigation } from "@react-navigation/native";
const HabitBuilderSection = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  // userRank.fp
  // round.fpTarget

  const { round, overallProgress } = useUserStore((state) => {
    const fpTarget = state.currentRound?.fpTarget
      ? state.currentRound?.fpTarget
      : 1;

    const fpTotal = state.myRank?.fp ? state.myRank?.fp : 0;

    const perc = fpTotal / fpTarget;
    // console.log(state.myRank?.rank, state.myRank?.fpObj);

    return {
      round: state.currentRound,
      overallProgress: perc > 1 ? 1 : perc,
    };

    // if (currentDate) {
    //   const { progress } = getOverallProgress(
    //     // today,
    //     currentDate,
    //     state.progress,
    //     state.dailyRewardStatus,
    //     state.user?.badgeId,
    //     state.user?.nutritionBadgeId,
    //     state.challengeDayProgress
    //   );

    //   return {
    //     round: state.currentRound,
    //     overallProgress: progress,
    //   };
    // }

    // return {
    //   round: state.currentRound,
    //   overallProgress: 0,
    // };
  }, shallow);

  const strToShow = getTimestringToShow(round?.start, round?.end);
  const onPress = () => {
    navigation.navigate("DailyQuestScreen");
  };
  return (
    <View
      style={{ height: height * 0.3 }}
      className="bg-[#6D55D1] flex justify-center"
    >
      <HabitBuilderProgressCard
        onClaimReward={onPress}
        // rewardText="Habit Builder Challenge"
        progress={overallProgress}
        challengeStatusStr={strToShow}
      />

      <View className="absolute left-0 right-0 bottom-0 top-3/4 -z-10">
        <ImageWithURL className="w-full" source={{ uri: habitBuilderBg }} />
      </View>
    </View>
  );
};

export default HabitBuilderSection;
