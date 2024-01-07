import CirclePercent from "@components/CirclePercent";
// import GradientText from "@components/GradientText";
import clsx from "clsx";
// import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, Image, View } from "react-native";
// import { useEffect, useState } from "react";
interface Props {
  onPress: () => void;
  colors?: string[];
  text?: string;
  subText?: string;
  imgUrl?: string;
  progress?: number;
  isLocked?: boolean;
  activeColor?: string;
  inActiveColor?: string;
  textColors?: string[];
  textPercent?: number;
  textColor?: string;
}

const ProgressContribution: React.FC<Props> = ({
  onPress,
  colors,
  text,
  subText,
  imgUrl,
  progress,
  isLocked,
  activeColor,
  inActiveColor,
  textColors,
  textPercent,
  textColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress} className=" px-8 pt-0 pb-5">
      <LinearGradient
        className="rounded-[20px] flex flex-row "
        colors={colors ? colors : ["transparent", "transparent"]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
      >
        <View className="pt-1 ">
          <CirclePercent
            circleSize={53}
            percent={progress ? progress : 0}
            activeColor={activeColor ? activeColor : "#FFFFFF"}
            strokeWidth={5}
            inActiveColor={inActiveColor ? inActiveColor : "#FFFFFF33"}
            showInactive={true}
          >
            <View className="w-full h-full flex justify-center items-center">
              {imgUrl ? (
                <Image
                  source={{ uri: imgUrl }}
                  className="w-4 aspect-square"
                  resizeMode="contain"
                />
              ) : null}
            </View>
          </CirclePercent>
        </View>
        <View className="ml-4 mr-3 flex-1 flex flex-row justify-between items-center">
          <View className="flex-1">
            <Text
              numberOfLines={1}
              className="text-white/50 text-xs"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {subText}
            </Text>

            {text ? (
              // <GradientText
              //   text={text}
              //   textStyle={{
              //     fontSize: 16,
              //     fontFamily: "Nunito-SemiBold",
              //     color: "white",
              //   }}
              //   colors={
              //     textColors && textColors?.length > 1
              //       ? textColors
              //       : ["#58F5FF", "#10BFFF"]
              //   }
              //   start={{ x: 0, y: 0.5 }}
              //   end={{ x: 1, y: 0.5 }}
              //   fallbackColor="white"
              // />
              <Text
                className={clsx("text-base text-[#fff]")}
                style={{
                  fontFamily: "Nunito-Semibold",
                  color: textColor || "#fff",
                }}
              >
                {text}
              </Text>
            ) : null}
          </View>

          {/* {textPercent ? ( */}
          <Text
            numberOfLines={1}
            className={clsx(" text-sm ml-3")}
            style={{
              fontFamily: "Nunito-Medium",
              color: textColor || "#58FF69",
            }}
          >
            {textPercent ? `${textPercent}%` : "0%"}
          </Text>
          {/* ) : (
            <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component%20143%20(2)_cIompVZTN.png?updatedAt=1693489343328",
              }}
              className={"w-6 aspect-[22/30] ml-3"}
              resizeMode="contain"
            />
          )} */}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ProgressContribution;
