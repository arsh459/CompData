import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

interface Props {
  activeRank?: number | string;
  activeTeamRank?: number | string;
}

const UserLeaderboardRank: React.FC<Props> = ({
  activeRank,
  activeTeamRank,
}) => {
  return (
    <LinearGradient
      colors={["#EEEEEE", "#C4C4C4"]}
      className="flex flex-row p-4"
    >
      <View className="flex-1 flex flex-col justify-center items-center ">
        <Text className="text-[#788289] font-bold iphoneX:text-xl whitespace-nowrap">
          Your Rank
        </Text>
        <Text className="text-[#FD6F6F]/75 font-bold text-3xl iphoneX:text-5xl italic">
          {activeRank ? `#${activeRank}` : "--"}
        </Text>
      </View>
      <View className="w-0.5 mx-4 bg-[#c7c7c7]" />
      <View className="flex-1 flex flex-col justify-center items-center ">
        <Text className="text-[#788289] font-bold iphoneX:text-xl whitespace-nowrap">
          Team Rank
        </Text>
        <Text className="text-[#FD6F6F]/75 font-bold text-3xl iphoneX:text-5xl italic">
          {activeTeamRank ? `#${activeTeamRank}` : "--"}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default UserLeaderboardRank;
