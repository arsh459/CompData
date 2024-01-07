import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";

import { Text } from "react-native";
import { View } from "react-native";

interface Props {
  completedText?: string;
  iconUrl?: string;
}
const QuestCompleteStateCard: React.FC<Props> = ({
  completedText,
  iconUrl,
}) => {
  return (
    <>
      <View className="border-[#51FF8C]  p-6  mx-4 rounded-3xl border-[0.5px]  flex flex-row justify-between bg-[#51ff8c33]">
        <View className="flex items-center justify-center">
          <View className="relative">
            <ImageWithURL
              source={{ uri: iconUrl }}
              className="w-10 aspect-square"
            />
          </View>
        </View>
        <View className=" flex-1 px-6 items-start justify-center">
          <Text
            className="text-white/70 text-xs tracking-wider text-left leading-4"
            style={{ fontFamily: "Nunito-Medium" }}
            numberOfLines={2}
          >
            {completedText ? completedText : "Completed all task"}
          </Text>
        </View>
        <View className="flex items-center justify-center">
          <View className="w-5 h-5 ">
            <SvgIcons iconType={"questCompleted"} />
          </View>
        </View>
      </View>
    </>
  );
};
export default QuestCompleteStateCard;
