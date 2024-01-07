import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { getEmojiByMood } from "../utils";
import ImageWithURL from "@components/ImageWithURL";
import { dataAddMood } from "./utils";
interface Props {
  selectedMood: number;
  handleMoodSelect: (mood: number) => void;
}
const MoodEmojiToAdd: React.FC<Props> = ({
  selectedMood,
  handleMoodSelect,
}) => {
  return (
    <ScrollView bounces={false} className="flex-1 bg-[#232136]">
      <Text
        numberOfLines={2}
        className="text-white text-xl p-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        How are you feeling right now?
      </Text>
      <View className="flex flex-row justify-between p-1.5">
        {dataAddMood.map((i, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: selectedMood === i.mood ? "white" : "#343150",
            }}
            className="flex-1 py-2 rounded-lg items-center justify-around mx-2 aspect-[68/94] "
            onPress={() => handleMoodSelect(i.mood)}
          >
            <ImageWithURL
              source={{
                uri: getEmojiByMood(i.mood).icon,
              }}
              style={{ width: 30, height: 30, aspectRatio: 91 / 83 }}
            />
            <Text
              numberOfLines={2}
              style={{
                color: selectedMood === i.mood ? "#232136" : "white",
              }}
              className="capitalize text-xs px-1.5 pt-2 text-center"
            >
              {i.moodType}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default MoodEmojiToAdd;
