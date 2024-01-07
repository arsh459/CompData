import { View, Text, Image } from "react-native";

import { format, parseISO } from "date-fns";
import { getEmojiByMood, getIconByEnergy } from "./utils";
interface Props {
  mainText?: string;
  subText?: string;
  weekDataObj?: any[];
  footerMainText?: string;
  footerSubText?: string;
  type?: "mood" | "energy";
}
export const WeekTrack: React.FC<Props> = ({
  mainText,
  footerMainText,
  footerSubText,
  weekDataObj,
  subText,
  type,
}) => {
  return (
    <View className="bg-[#343150] rounded-xl mx-4 p-4 px-2">
      <Text className="text-white  text-sm iphoneX:text-base  px-2">
        {mainText} <Text className="text-[#51FF8C]">{subText}</Text>
      </Text>
      <View className="pt-2.5 flex flex-row justify-between  flex-1  py-8">
        {weekDataObj?.map((day, index) => (
          <View
            key={index}
            className="flex-1 flex items-center justify-center "
          >
            <Text className="text-white text-xs pb-4 font-normal">
              {format(parseISO(day.date), "EEE")}
            </Text>
            <View className=" bg-[#5D588C] rounded-full aspect-square p-1 flex items-center justify-center">
              {type === "mood" && day[type] ? (
                <Image
                  source={{
                    uri: getEmojiByMood(day[type]).icon,
                  }}
                  className="w-8   aspect-square"
                />
              ) : type === "energy" && day[type] ? (
                <Image
                  source={{
                    uri: getIconByEnergy(day[type]).icon,
                  }}
                  className="w-4   aspect-[15/30]"
                />
              ) : (
                <View className="w-8    aspect-square" />
              )}
            </View>
          </View>
        ))}
      </View>
      <Text className="text-white  px-2 text-sm iphoneX:text-base">
        {footerMainText} <Text className="text-[#51FF8C]">{footerSubText}</Text>
      </Text>
    </View>
  );
};
