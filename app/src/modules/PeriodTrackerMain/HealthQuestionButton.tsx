import { View, Text } from "react-native";

import ArrowIcon from "@components/SvgIcons/ArrowIcon";
interface Props {
  text: string;
}
const HealthQuestionButton: React.FC<Props> = ({ text }) => (
  <View className="flex flex-row justify-between items-center px-3 py-3.5 my-1.5 rounded-xl bg-[#D3CBFF]">
    <Text className="text-xs font-medium text-center text-[#232136]">
      {text}
    </Text>
    <View className="w-1.5 aspect-[7/15] ml-3">
      <ArrowIcon color={"#000"} direction="right" />
    </View>
  </View>
);

export default HealthQuestionButton;
