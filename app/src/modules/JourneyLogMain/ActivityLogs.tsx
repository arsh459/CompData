import { View, Text } from "react-native";

import LogCard from "./LogCard";
import {
  energyIconFrame45,
  moodIconFrame45,
  // periodIconFrame45,
  // periodIconFrame45,
  weightIconFrame45,
} from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import { useLatestProgress } from "@providers/streak/hooks/useLatestProgress";
import { getEmojiByMood, getIconByEnergy } from "@modules/JourneyLogHome/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
interface Props {}
const ActivityLogs: React.FC<Props> = ({}) => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  const onPressWeightTracker = () => {
    navigation.navigate("WeightTrackerScreen");
    weEventTrack("progress_clickWeightTracker", {});
  };
  const onPressMoodTracker = () => {
    navigation.navigate("MoodTrackerScreen");
    weEventTrack("progress_clickMoodTracker", {});
  };
  const onPressEnergyTracker = () => {
    navigation.navigate("EnergyTrackerScreen");
    weEventTrack("progress_clickEnergyTracker", {});
  };

  const { energy, mood, weight } = useLatestProgress(user?.uid);
  const lastMood = mood?.mood ? getEmojiByMood(mood.mood) : "";
  const lastEnergy = energy?.energy ? getIconByEnergy(energy.energy) : "";
  return (
    <View>
      <Text className="text-white px-4 py-5 text-base iphoneX:text-lg font-bold">
        My Activities
      </Text>
      <LogCard
        color="#343150"
        text="Weight Tracker"
        subText={weight?.weight ? `Last Tracked ${weight.weight}kg` : "-"}
        imgUrl={weightIconFrame45}
        onPress={onPressWeightTracker}
      />
      {/* <LogCard
        color="#343150"
        text="Period Tracker"
        subText={`Last tracked 11 Days Ago`}
        imgUrl={periodIconFrame45}
        onPress={onPressPeriodTracker}
      /> */}
      <LogCard
        color="#343150"
        text="Mood Tracker"
        subText={lastMood ? `Last Tracked ${lastMood.text}` : "-"}
        imgUrl={moodIconFrame45}
        onPress={onPressMoodTracker}
      />
      <LogCard
        color="#343150"
        text="Energy Tracker"
        subText={lastEnergy ? `Last Tracked ${lastEnergy.text}` : "-"}
        imgUrl={energyIconFrame45}
        onPress={onPressEnergyTracker}
      />
    </View>
  );
};

export default ActivityLogs;
