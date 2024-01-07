import { View, Text } from "react-native";

import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
interface Props {
  firstBadgeColorOne?: string;
  firstBadgeColorTwo?: string;
  secondBadgeColorOne?: string;
  secondBadgeColorTwo?: string;
  firstBadgeCountText?: string;
  secondBadgeCountText?: string;
  symbol?: string;
}
const BadgeCombo: React.FC<Props> = ({
  secondBadgeCountText,
  firstBadgeColorOne,
  firstBadgeColorTwo,
  firstBadgeCountText,
  secondBadgeColorOne,
  secondBadgeColorTwo,
  symbol,
}) => {
  return (
    <View className="flex flex-row  items-center  h-full w-2/5 py-2 justify-center">
      <View className="w-1/3 relative  ">
        <NewBadge
          //  colorOne="#EADAA6" colorTwo="#9C874E"
          colorOne={firstBadgeColorOne ? firstBadgeColorOne : "#EADAA6"}
          colorTwo={firstBadgeColorTwo ? firstBadgeColorTwo : "#9C874E"}
          unLockedHeight={1}
        />
        <Text
          // className="absolute -right-2 -bottom-2 text-[#FFFFFF8C]"
          className="absolute  left-[80%] top-[80%] text-sm   text-[#FFFFFF8C]"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          adjustsFontSizeToFit={true}
        >
          {firstBadgeCountText}
        </Text>
      </View>
      <Text className="text-[#FFFFFF] text-base iphoneX:text-lg font-extrabold  px-4">
        {symbol}
      </Text>
      <View className="w-1/3 relative ">
        <NewBadge
          colorOne={secondBadgeColorOne ? secondBadgeColorOne : "#859EFF"}
          colorTwo={secondBadgeColorTwo ? secondBadgeColorTwo : "#2C46C5"}
          unLockedHeight={1}
        />
        <Text
          // className="absolute -right-2 -bottom-2 text-[#FFFFFF99]"
          className="absolute left-[80%] top-[80%]  text-sm text-[#FFFFFF99]"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {secondBadgeCountText}
        </Text>
      </View>
    </View>
  );
};

export default BadgeCombo;
