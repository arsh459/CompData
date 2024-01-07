import { Text, TouchableOpacity, View } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { infoBtnRing } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";

import { useRoundContext } from "@providers/round/RoundProver";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export type selectedChallengeViewType = "goals" | "leaderboard" | "feed";

const ChallengesHeader = () => {
  const { roundId } = useRoundContext();
  // useUserStore(())

  const navigation = useNavigation();

  return (
    <View className="flex flex-row items-center">
      <Text
        className="text-white text-sm iphoneX:text-base mr-2"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Challenges
      </Text>

      <TouchableOpacity
        onPress={() => {
          weEventTrack("challenges_clickDetail", {});
          navigation.navigate("ChallengeDetailScreen", {
            roundId,
          });
        }}
      >
        <ImageWithURL
          source={{ uri: infoBtnRing }}
          className="w-4 aspect-square"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChallengesHeader;
