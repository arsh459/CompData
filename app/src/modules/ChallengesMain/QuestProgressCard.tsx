import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ImageWithURL from "@components/ImageWithURL";
import { dailyQuestProgressImg } from "@constants/imageKitURL";
import ArrowIconPointed from "@components/SvgIcons/ArrowIconPointed";
import ProgressBar from "@components/ProgressBar";
import QuestProgressChildComp from "./QuestProgressChildComp";
import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import { shallow } from "zustand/shallow";

interface Props {
  onClaimReward: () => void;
  rewardText?: string;
  iconUrl?: string;
  progress: number;
  done: number;
  total: number;
  hideArrow?: boolean;
}
const QuestProgressCard: React.FC<Props> = ({
  onClaimReward,
  rewardText,
  iconUrl,
  progress,
  hideArrow,
  done,
  total,
}) => {
  //   const uri = iconUrl ? iconUrl : undefined;
  const { isInFuture } = useQuestCalendar(
    (state) => ({
      isInFuture:
        state.active && state.today
          ? state.active?.unix > state.today?.unix
          : false,
    }),
    shallow
  );

  return (
    <TouchableOpacity
      onPress={onClaimReward}
      className=" bg-[#232136]   p-6 mx-4 rounded-3xl "
    >
      <View className="flex flex-row  items-center justify-between ">
        <View className="flex-1 ">
          <View className="flex flex-row items-center pb-3">
            <Text
              className="text-base text-white/70 pr-3"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {rewardText}
            </Text>
            <View className="w-4 aspect-square">
              {hideArrow ? null : <ArrowIconPointed color="#F4B73F" />}
            </View>
          </View>
          {/* <View className="bg-[#FFFFFF]/30 flex-1 h-5 rounded-full"></View> */}
          <View className="flex-[.7] relative z-0 ">
            {typeof progress === "number" ? (
              <ProgressBar
                height={1}
                noRoundedProgress={true}
                heightOfContainer={20}
                progress={
                  !isInFuture
                    ? progress > 0 && progress > 1
                      ? 100
                      : progress * 100
                    : 0
                }
                activeColor="#F4B73F"
                inActiveColor="#494667"
              >
                {isInFuture ? (
                  <>
                    <QuestProgressChildComp
                      progress={progress}
                      text={"Locked"}
                      showLockIcon={true}
                    />
                  </>
                ) : (
                  <>
                    <QuestProgressChildComp
                      progress={progress}
                      text={done + " / " + total + " FP"}
                    />
                  </>
                )}
              </ProgressBar>
            ) : null}
            <View className="absolute right-0 -bottom-2">
              <ImageWithURL
                className="w-10 aspect-[100/104]"
                source={{ uri: dailyQuestProgressImg }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuestProgressCard;
