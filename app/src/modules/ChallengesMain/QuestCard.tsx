import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import MarqueeButton from "@components/MarqueeButton";
import ImageWithURL from "@components/ImageWithURL";
import ArrowIconPointed from "@components/SvgIcons/ArrowIconPointed";
import ProgressBar from "@components/ProgressBar";
import clsx from "clsx";
interface Props {
  onClaimReward: () => void;
  btnText?: string;
  rewardText?: string;
  iconUrl?: string;
  progress: number;
  btnImg?: string;
  showProgress?: boolean;
  nextRewardTime?: string;
  containerStyleTw?: string;
  hideArrow?: boolean;
  isShimmer?: boolean;
  children?: ReactNode;
  isInFuture?: boolean;
}
const QuestCard: React.FC<Props> = ({
  onClaimReward,
  btnText,
  rewardText,
  iconUrl,
  progress,
  btnImg,
  showProgress,
  nextRewardTime,
  containerStyleTw,
  hideArrow,
  isShimmer,
  children,
  isInFuture,
}) => {
  const uri = iconUrl ? iconUrl : undefined;

  let meterValue = 0.035;
  if (typeof progress === "number" && progress > meterValue) {
    meterValue = progress * 100;
  } else if (typeof progress === "number" && progress > 1) {
    meterValue = 100;
  } else {
    meterValue = meterValue * 100;
  }

  return (
    <View className="border-white/30 border p-6 mx-4 rounded-3xl ">
      <View className="flex flex-row  items-center justify-between ">
        {uri ? (
          <ImageWithURL source={{ uri }} className="w-10 aspect-square" />
        ) : null}
        <View className="flex-1 pl-5">
          <View className="flex flex-row items-center justify-between pb-3">
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
          {showProgress && typeof progress === "number" ? (
            <ProgressBar
              height={1}
              heightOfContainer={20}
              noRoundedProgress={true}
              // progress={progress > 0 && progress > 1 ? 100 : progress * 100}
              progress={isInFuture ? 0 : meterValue}
              activeColor="#F4B73F"
              inActiveColor="#494667"
              children={children}
            />
          ) : null}
        </View>
      </View>
      {btnText && !isShimmer ? (
        <MarqueeButton
          onPress={onClaimReward}
          text={btnText}
          containerStyleTw={clsx(
            "bg-[#ffbb35] w-full py-2",
            containerStyleTw ? containerStyleTw : ""
          )}
          iconUri={btnImg ? btnImg : undefined}
        />
      ) : null}
      {btnText && isShimmer ? (
        <TouchableOpacity
          onPress={onClaimReward}
          className={clsx(
            containerStyleTw ? containerStyleTw : "bg-[#ffbb35] w-3/4 ",
            "rounded-xl mt-5"
            // "   mx-auto  rounded-xl mt-5 flex flex-row items-center justify-center relative z-0 "
          )}
        >
          <Text
            className={clsx(
              "text-sm text-[#232136] text-center rounded-xl py-2.5",
              " pl-2"
            )}
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {btnText}
          </Text>
        </TouchableOpacity>
      ) : null}
      {nextRewardTime ? (
        <Text
          className="text-sm text-[#FFBB35]  text-center pt-5"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {nextRewardTime}
        </Text>
      ) : null}
    </View>
  );
};

export default QuestCard;
