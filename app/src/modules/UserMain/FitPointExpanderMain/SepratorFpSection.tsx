import { View, Text } from "react-native";

interface Props {
  text?: string;
}

const SepratorFpSection: React.FC<Props> = ({ text }) => {
  return (
    <View className="flex-1 flex flex-row items-center p-4 bg-[#232136]">
      <Text className="text-center text-white">{text}</Text>
      <View className="w-4 aspect-square" />
      <View className="flex-1 h-px bg-white/50" />
    </View>
  );
};

export default SepratorFpSection;
