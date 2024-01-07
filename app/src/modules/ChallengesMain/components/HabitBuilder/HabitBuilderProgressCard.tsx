import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ImageWithURL from "@components/ImageWithURL";
import {
  completeYellowTick,
  dailyQuestProgressImg,
} from "@constants/imageKitURL";
import ProgressBar from "@components/ProgressBar";
import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import { shallow } from "zustand/shallow";
// import Confetti from "@components/Confetti";
import { useUserStore } from "@providers/user/store/useUserStore";

interface Props {
  onClaimReward: () => void;
  // rewardText?: string;
  progress: number | undefined;
  challengeStatusStr?: string;
}
const HabitBuilderProgressCard: React.FC<Props> = ({
  onClaimReward,
  // rewardText,
  progress,
  challengeStatusStr,
}) => {
  const { isInFuture } = useQuestCalendar(
    (state) => ({
      isInFuture:
        state.active && state.today
          ? state.active?.unix > state.today?.unix
          : false,
    }),
    shallow
  );

  const { roundName, fpTarget } = useUserStore((state) => {
    const fpTarget = state.currentRound?.fpTarget
      ? state.currentRound?.fpTarget
      : 1;

    // const fpTotal = state.myRank?.fp ? state.myRank?.fp : 0;
    return {
      fpTarget,
      roundName: state.currentRound?.name || "SocialBoat Challenge",
    };
  }, shallow);

  const isCompleted = progress && progress >= 1;
  return (
    <TouchableOpacity
      onPress={onClaimReward}
      className=" bg-[#232136]  px-6 p-4 mx-4 rounded-3xl "
    >
      <View className="relative flex flex-row gap-6 px-4">
        <View className="flex flex-1 justify-between">
          <View>
            <Text
              className="text-base mb-1 text-[#FFFFFF]"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {roundName}
            </Text>
            <Text
              className="text-sm text-[#FFFFFF]/50"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {isCompleted
                ? "Congratulations! You completed the challenge"
                : `Earn ${fpTarget}FP to finish the challenge`}
            </Text>
          </View>
          {isCompleted ? (
            <View className="flex pt-2 flex-row items-center">
              <ImageWithURL
                source={{
                  uri: completeYellowTick,
                }}
                className="w-3 aspect-square"
              />
              <Text
                className="text-[#F4B73F] pl-1 text-sm"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                Completed
              </Text>
            </View>
          ) : (
            <View className="flex pt-2 flex-row items-center">
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Component%20167_j0zoGOJ2O.png?updatedAt=1695619245294",
                }}
                className="w-3 aspect-square"
              />
              <Text
                className="text-white/50 pl-1 text-sm"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {challengeStatusStr}
              </Text>
            </View>
          )}
        </View>
        <View className="flex flex-[0.6] items-center">
          <View className="mb-5">
            <ImageWithURL
              className="w-20 aspect-[100/104]"
              source={{ uri: dailyQuestProgressImg }}
            />
          </View>
          {typeof progress === "number" && !isCompleted ? (
            <ProgressBar
              height={0.5}
              noRoundedProgress={true}
              heightOfContainer={10}
              progress={
                !isInFuture
                  ? progress > 0 && progress > 1
                    ? 100
                    : progress * 100
                  : 0
              }
              activeColor="#F4B73F"
              inActiveColor="#494667"
            />
          ) : null}
        </View>
        {/* {isCompleted && <Confetti />} */}
      </View>
    </TouchableOpacity>
  );
};

export default HabitBuilderProgressCard;
