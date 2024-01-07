import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import ImageWithURL from "@components/ImageWithURL";
import { goalSectionHeaderBg, tickSquareIcon } from "@constants/imageKitURL";
import QuestProgressCard from "./QuestProgressCard";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { getOverallProgress } from "./progressUtils";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { getTimestringToShow } from "./utils";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import useQuestCalendar from "@hooks/quest/useQuestCalendar";

// import { differenceInDays } from "date-fns";
// import { useNavigation } from "@react-navigation/native";
// import { calculateTimeDifference } from "./utils";
interface Props {
  // height: number;
  // onPress: () => void;
  // percentComplete?: number;
}
const DailyQuest: React.FC<Props> = ({}) => {
  const { height } = useWindowDimensions();
  // const { today } = useAuthContext();

  const { currentDate } = useQuestCalendar(
    (state) => ({
      currentDate: state.active?.currentDate,
    }),
    shallow
  );

  // console.log("currentDate", currentDate);

  // useTodayDate();
  const { round, overallProgress, done, total } = useUserStore((state) => {
    if (currentDate) {
      const { total, progress, done } = getOverallProgress(
        // today,
        currentDate,
        state.progress,
        state.dailyRewardStatus,
        state.user?.badgeId,
        state.user?.nutritionBadgeId,
        state.challengeDayProgress
      );

      return {
        round: state.currentRound,
        overallProgress: progress,
        done,
        total,
      };
    }

    return {
      done: 0,
      total: 0,
    };
  }, shallow);
  const navigation = useNavigation();

  const strToShow = getTimestringToShow(round?.start, round?.end);

  // const difference = round?.end
  //   ? differenceInDays(round?.end, new Date())
  //   : undefined;
  // const val =
  //   difference === 0
  //     ? `${timeDiff.hours}:${timeDiff.minutes} mins`
  //     : difference && difference > 1
  //     ? `${difference} Days Left`
  //     : "Challenge Over";
  const onPress = () => {
    weEventTrack("ChallengeScreen_clickDailyQuest", {});
    navigation.navigate("DailyQuestScreen");
    // navigation.navigate("TreasureRewardScreen");
  };

  return (
    <View
      style={{ height: height * 0.3 }}
      className="bg-[#6D55D1] flex justify-around "
    >
      <View className="pl-6 pb-8 pt-6">
        <Text
          className="text-white text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {round?.name}
        </Text>
        {strToShow ? (
          <View className="flex flex-row items-center ">
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Component%20167_j0zoGOJ2O.png?updatedAt=1695619245294",
              }}
              className="w-3 aspect-square"
            />
            <Text
              className="text-white/50 pl-1 text-base"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {strToShow}
            </Text>
          </View>
        ) : null}
      </View>
      <View className="pb-4">
        <QuestProgressCard
          onClaimReward={onPress}
          rewardText="Complete All Daily Quest"
          progress={overallProgress || 0.035}
          done={done}
          total={total}
          iconUrl={tickSquareIcon}
          hideArrow={true}
        />
      </View>

      <View className="absolute left-0 right-0 bottom-0 -z-10  ">
        <ImageWithURL
          className="w-full aspect-[375/222] "
          source={{ uri: goalSectionHeaderBg }}
        />
      </View>
    </View>
  );
};

export default DailyQuest;
