import CirclePercent from "@components/CirclePercent";
import clsx from "clsx";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";
import { useUserStore } from "@providers/user/store/useUserStore";
// import { getOverallProgress } from "@modules/ChallengesMain/progressUtils";

interface Props {
  date: string;
  dayIsInRound: boolean;
  isPassed: boolean;
}

const RenderCompPerc: React.FC<Props> = ({ date, dayIsInRound, isPassed }) => {
  const { overallProgress } = useUserStore((state) => {
    const fpTarget =
      state.currentRound?.dailyFPQuota &&
      date &&
      state.currentRound.dailyFPQuota[date]
        ? state.currentRound.dailyFPQuota[date]
        : 1;

    const fpToday =
      state.myRank?.fpObj && date && state.myRank?.fpObj[date]
        ? state.myRank?.fpObj[date]
        : 0;

    // if (date) {
    //   const { progress } = getOverallProgress(
    //     // today,
    //     date,
    //     state.progress,
    //     state.dailyRewardStatus,
    //     state.user?.badgeId,
    //     state.user?.nutritionBadgeId,
    //     state.challengeDayProgress
    //   );

    //   return {
    //     overallProgress: progress,
    //   };
    // }

    const perc = fpToday / fpTarget;

    console.log(
      "date",
      date,
      "fpToday",
      fpToday,
      "fpTarget",
      fpTarget,
      "perc",
      perc
    );

    return {
      overallProgress: perc >= 1 ? 1 : perc,
    };
  }, shallow);

  // console.log("overallProgress", overallProgress, date);

  return (
    <CirclePercent
      circleSize={38}
      percent={overallProgress}
      activeColor={"#FFA826"}
      strokeWidth={5}
      inActiveColor={dayIsInRound ? "#4f413366" : "#232136"}
      showInactive={true}
      showActive={dayIsInRound}
    >
      <View className="w-full h-full flex justify-center items-center">
        <Text
          className={clsx(
            " text-xs",
            isPassed ? "text-[#FFF]" : "text-[#ffcc194d]",
            dayIsInRound ? "" : "text-white/20"
          )}
          style={{ fontFamily: "Nunito-Light" }}
        >
          {date.split("-")[2]}
        </Text>
      </View>
    </CirclePercent>
  );
};

export default RenderCompPerc;
