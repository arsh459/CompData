import { viewTypes } from "@utils/leaderboard/utils";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

interface Props {
  selectedView: viewTypes;
  handleViewChange: (val: viewTypes) => void;
}

const LeaderboardViewSelectorV2: React.FC<Props> = ({
  selectedView,
  handleViewChange,
}) => {
  // selectedView === "players";
  return (
    <View className="flex flex-row  iphoneX:h-11">
      <Pressable
        onPress={() => handleViewChange("players")}
        className="flex-1 bg-[#292832]"
      >
        <View className="h-full flex justify-center items-center rounded-2xl ">
          <Text
            className={clsx(
              "font-bold text-lg iphoneX:text-xl",
              selectedView === "players" && "text-white"
            )}
          >
            Players
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={() => handleViewChange("teams")} className="flex-1">
        <LinearGradient
          colors={
            selectedView === "teams"
              ? ["#FFB47D", "#E84C87"]
              : ["transparent", "transparent"]
          }
          start={{ x: 0.7, y: -0.5 }}
          end={{ x: 0.3, y: 1.5 }}
          className="h-full flex justify-center items-center rounded-2xl"
        >
          <Text
            className={clsx(
              "font-bold text-lg iphoneX:text-2xl",
              selectedView === "teams" && "text-white"
            )}
          >
            Teams
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default LeaderboardViewSelectorV2;
