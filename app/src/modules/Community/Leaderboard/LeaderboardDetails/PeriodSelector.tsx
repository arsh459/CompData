import { SprintObject } from "@models/Event/Event";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  selected?: string;
  sprints?: SprintObject[];
  onPress: () => void;
}

const PeriodSelector: React.FC<Props> = ({ selected, sprints, onPress }) => {
  return (
    <View className="flex items-end px-4">
      <TouchableOpacity
        onPress={onPress}
        className="w-1/2 bg-white/10 py-2 rounded-full border border-white/20"
      >
        <Text className="text-white text-center capitalize">
          {sprints
            ? sprints.filter((i) => i.id === selected)[0]?.name
            : "overall"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PeriodSelector;
