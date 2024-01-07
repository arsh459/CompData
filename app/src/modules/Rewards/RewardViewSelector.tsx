import clsx from "clsx";
import { Text, View, TouchableOpacity } from "react-native";

export type rewardViewTypes = "mycard" | "mybenefits";
interface Props {
  selectedView: rewardViewTypes;
  handleViewChange: (val: rewardViewTypes) => void;
}

const RewardViewSelector: React.FC<Props> = ({
  selectedView,
  handleViewChange,
}) => {
  return (
    <View className="flex flex-row h-8 iphoneX:h-11">
      <View
        className="flex-1 rounded-md"
        style={{
          backgroundColor: selectedView === "mycard" ? "#FFFFFF" : "#292832",
        }}
      >
        <TouchableOpacity onPress={() => handleViewChange("mycard")}>
          <View className="h-full flex justify-center items-center ">
            <Text
              className={clsx(
                "font-bold text-base iphoneX:text-xl",
                selectedView === "mycard" ? "text-black" : "text-[#8C9CA8]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              My Cards
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        className="flex-1 rounded-md"
        style={{
          backgroundColor:
            selectedView === "mybenefits" ? "#FFFFFF" : "#353345",
        }}
      >
        <TouchableOpacity onPress={() => handleViewChange("mybenefits")}>
          <View className="h-full flex justify-center items-center ">
            <Text
              className={clsx(
                "font-bold text-base iphoneX:text-xl",
                selectedView === "mybenefits" ? "text-black" : "text-[#8C9CA8]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              My Benefits
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RewardViewSelector;
