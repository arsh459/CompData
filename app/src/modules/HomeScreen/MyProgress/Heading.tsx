import { View, Text } from "react-native";

import SvgIcons from "@components/SvgIcons";

const Heading = () => {
  return (
    <View className="flex flex-row items-center">
      <View className="w-4 h-4">
        <SvgIcons iconType="fire" color="#51ECDD" />
      </View>
      <Text
        className="text-white text-base pl-1 pt-1"
        style={{ fontFamily: "Nunito-Medium" }}
      >
        My FP Streak
      </Text>
    </View>
  );
};

export default Heading;
