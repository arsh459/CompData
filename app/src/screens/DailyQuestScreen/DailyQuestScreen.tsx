import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { View } from "react-native";
import DailyQuestDetailModule from "@modules/DailyQuestDetailModule";

const DailyQuestScreen = () => {
  useScreenTrack();

  return (
    <View className="flex-1 bg-[#232136]">
      <DailyQuestDetailModule />
    </View>
  );
};

export default DailyQuestScreen;
