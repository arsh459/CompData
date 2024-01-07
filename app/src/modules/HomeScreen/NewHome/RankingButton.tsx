import { View, Text, TouchableOpacity } from "react-native";

import clsx from "clsx";
import SvgIcons from "@components/SvgIcons";

interface Props {
  rank?: string;
  teamName?: string;
  fpPoints?: string;
  isUp?: boolean;
  bgColor?: string;
  paddingStyle?: string;
  onClick: () => void;
}
const RankingButton: React.FC<Props> = ({
  fpPoints,
  rank,
  teamName,
  isUp,
  bgColor,
  paddingStyle,
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        className={clsx(
          "flex flex-row ",
          isUp ? "items-end" : "items-start",
          paddingStyle
        )}
        style={bgColor ? { backgroundColor: bgColor } : {}}
      >
        <View className={clsx("flex", isUp ? "flex-col-reverse" : "")}>
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white text-lg font-bold"
          >
            {rank}
          </Text>

          <View className="h-3 w-7">
            <SvgIcons
              iconType={isUp ? "updoublearrow" : "downdoublearrow"}
              color={isUp ? "#51FF96" : "#FF517B"}
            />
          </View>
        </View>
        <Text
          numberOfLines={1}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-white flex-1 pl-4 text-lg font-bold"
        >
          {teamName}
        </Text>
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-white font-bold text-lg pl-2"
        >
          {fpPoints}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RankingButton;
