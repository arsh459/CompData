import { View, Text, Pressable } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import CupInfo from "./CupInfo";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  rank?: number;
  teamName?: string;
  fpString?: string;
  teamId: string;
  captainId: string;
  sprintId: string;
  // nbWorkouts: number;
}
const GoalCard: React.FC<Props> = ({
  fpString,
  rank,
  teamName,
  teamId,
  captainId,
  sprintId,
  // nbWorkouts,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProgressScreen", { teamId, captainId, sprintId });
        weEventTrack(`home_clickTrophy`, {});
      }}
    >
      <LinearGradient
        colors={["#FEE1916E", "#C2A5536E"]}
        className="rounded-xl"
      >
        <View className="p-0.5">
          <CupInfo />
        </View>
        <View className="flex flex-row px-4 py-2 pb-3">
          <Text
            className="text-[#FFFFFF] text-lg "
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {rank}
          </Text>
          <Text
            className="text-[#FFFFFF] pl-2 flex-1 text-lg "
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {teamName}
          </Text>
          <Text
            className="text-[#FFFFFF] text-lg"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {fpString}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default GoalCard;
