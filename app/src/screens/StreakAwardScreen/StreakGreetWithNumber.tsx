import { View, Text } from "react-native";
import React from "react";
import ImageWithURL from "@components/ImageWithURL";
import { goldenFlame, streakBroken } from "@constants/imageKitURL";
import clsx from "clsx";
interface Props {
  streakNumber: number;
  streakText: string;
  isBroken: boolean;
}
const StreakGreetWithNumber: React.FC<Props> = ({
  streakNumber,
  streakText,
  isBroken,
}) => {
  const uri = isBroken ? streakBroken : goldenFlame;
  return (
    <View className=" w-4/5 aspect-[278/339] mx-auto relative z-0">
      <ImageWithURL source={{ uri: uri }} className="" />
      <View className="absolute bottom-[10%] top-1/2 left-0 right-0 flex justify-between ">
        <Text
          className=" text-black text-7xl  text-center pt-2"
          style={{ fontFamily: "Nunito-ExtraBold" }}
        >
          {streakBroken ? "" : streakNumber}
        </Text>
        <Text
          className={clsx(
            streakBroken ? "text-[#7973B4]" : " text-[#F4B73F]",
            "text-3xl  text-center"
          )}
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {streakText}
        </Text>
      </View>
    </View>
  );
};

export default StreakGreetWithNumber;
