import { EventInterface } from "@models/Event/Event";
import { getPrefixAndSuffix } from "@utils/challange/PrefixAndSuffix";
import { View, Text } from "react-native";

interface Props {
  parentEvent: EventInterface;
}

const ChallengeEnds: React.FC<Props> = ({ parentEvent }) => {
  const { prefix, suffix } = getPrefixAndSuffix(
    parentEvent.configuration?.starts,
    parentEvent.challengeLength,
    parentEvent.sprintLength,
    parentEvent.roundLength
  );

  return prefix && suffix ? (
    <View className="bg-[#575757]/50 backdrop-blur border border-[#D4D4D4] rounded-xl px-2.5 iphoneX:px-4 py-1 iphoneX:py-2">
      <Text className="text-white text-[10px] iphoneX:text-xs text-center leading-tight italic">
        {prefix}
      </Text>
      <Text className="text-white text-xs iphoneX:text-sm font-extrabold text-center leading-tight italic">
        {suffix}
      </Text>
    </View>
  ) : null;
};

export default ChallengeEnds;
