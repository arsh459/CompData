import { viewTypes } from "@utils/leaderboard/utils";
import clsx from "clsx";
import { Text, View, TouchableOpacity } from "react-native";

interface Props {
  selectedView: viewTypes;
  handleViewChange: (val: viewTypes) => void;
}

const LeaderboardViewSelector: React.FC<Props> = ({
  selectedView,
  handleViewChange,
}) => {
  return (
    <View className="flex flex-row m-4 bg-[#292832] rounded-md">
      <View
        className="flex-1 rounded-md"
        style={{
          backgroundColor:
            selectedView === "players" ? "#FFFFFF" : "transparent",
        }}
      >
        <TouchableOpacity onPress={() => handleViewChange("players")}>
          <View className="flex justify-center items-center py-2.5">
            <Text
              className={clsx(
                "font-bold text-base iphoneX:text-xl",
                selectedView === "players" ? "text-black" : "text-[#666F76]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Players
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        className="flex-1 rounded-md"
        style={{
          backgroundColor: selectedView === "teams" ? "#FFFFFF" : "transparent",
        }}
      >
        <TouchableOpacity onPress={() => handleViewChange("teams")}>
          <View className="flex justify-center items-center py-2.5">
            <Text
              className={clsx(
                "font-bold text-base iphoneX:text-xl",
                selectedView === "teams" ? "text-black" : "text-[#666F76]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Teams
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeaderboardViewSelector;
