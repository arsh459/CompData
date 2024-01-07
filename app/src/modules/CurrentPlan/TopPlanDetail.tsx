import { View, Text } from "react-native";
interface Props {
  text?: string;
  leftText?: boolean;
  daysLeft?: number;
}
const TopPlanDetail: React.FC<Props> = ({ leftText, text, daysLeft }) => {
  return (
    <View className="flex flex-row items-center justify-between flex-1">
      <Text className="text-xl iphoneX:text-2xl font-semibold iphoneX:font-bold flex-1 text-[#F5F5F7] ">
        {text ? text : "Your Current Plan"}
      </Text>
      <Text className="text-[10px] text-[#F5F5F7]  iphoneX:text-xs font-medium iphoneX:font-semibold">
        {daysLeft} {leftText && "Day(s) left"}
      </Text>
    </View>
  );
};
export default TopPlanDetail;
