import { View, Text } from "react-native";

import { DayTrack } from "../DayTrack";
import { getEmojiByMood, getMoodString } from "../utils";
interface Props {
  todayMood: number;
}
const DayViewMood: React.FC<Props> = ({ todayMood }) => {
  return (
    <View className="flex-1">
      <DayTrack
        imgUrl={getEmojiByMood(todayMood || 0).icon}
        footerMainText={getMoodString(todayMood)}
      >
        <Text className="text-white w-1/2 text-xl iphoneX:text-2xl">
          Your average mood of the day is{" "}
          <Text className="text-[#FFD543]">
            {getEmojiByMood(todayMood || 0).text}
          </Text>
        </Text>
      </DayTrack>
    </View>
  );
};

export default DayViewMood;
