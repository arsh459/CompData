import { View, Text, Image } from "react-native";

import { getEmojiByMood, getIconByEnergy } from "./utils";
import { WeeklyAvgObj } from "@providers/streak/hooks/useAvgDataV2";

interface Props {
  mainText?: string;
  subText?: string;
  weeklyAvgs?: WeeklyAvgObj[];
  footerMainText?: string;
  footerSubText?: string;
  type?: "mood" | "energy";
}
export const MonthlyTrack: React.FC<Props> = ({
  mainText,
  footerMainText,
  footerSubText,
  weeklyAvgs,
  subText,
  type,
}) => {
  return (
    <View className="bg-[#343150] rounded-xl mx-4 p-4 px-2">
      <Text className="text-white text-sm iphoneX:text-base  px-2">
        {mainText} <Text className="text-[#51FF8C]">{subText}</Text>
      </Text>

      <View className="pt-2.5 flex flex-row justify-between flex-1  py-8">
        {weeklyAvgs?.map((week, index) => {
          return (
            <View
              key={index}
              className="flex-1 flex items-center justify-center "
            >
              {type === "mood" ? (
                <>
                  {week.averageValue === 0 ? (
                    <View className="w-10 bg-[#5D588C] rounded-full  aspect-[91/88]" />
                  ) : (
                    <Image
                      source={{
                        uri: getEmojiByMood(Math.ceil(week.averageValue)).icon,
                      }}
                      className="w-10   aspect-[91/83]"
                    />
                  )}
                </>
              ) : type === "energy" ? (
                <Image
                  source={{
                    uri: getIconByEnergy(Math.ceil(week.averageValue)).icon,
                  }}
                  className="w-5   aspect-[30/60]"
                />
              ) : null}
              <Text className="text-white pt-4 text-xs">{week.weekStr}</Text>
            </View>
          );
        })}
      </View>

      <Text className="text-white  px-2 text-sm iphoneX:text-base">
        {footerMainText} <Text className="text-[#51FF8C]">{footerSubText}</Text>
      </Text>
    </View>
  );
};
