import { View, Text } from "react-native";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useRounds } from "@hooks/rounds/useRounds";
import ChallengeCard from "./ChallengeCard/ChallengeCard";

const ChallengeCardHolder = () => {
  const { rounds } = useRounds(TEAM_ALPHABET_GAME);

  if (rounds.length === 0) {
    return null;
  }

  return (
    <View className="px-4">
      <Text
        className="text-[#F1F1F1] text-lg iphoneX:text-xl py-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Challenges
      </Text>
      <View
        // horizontal
        // showsHorizontalScrollIndicator={false}
        className="w-full"
        // className="h-20"
      >
        {rounds.map((item) => {
          return (
            <View key={item.id}>
              <ChallengeCard round={item} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ChallengeCardHolder;
