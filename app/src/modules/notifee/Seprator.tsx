import { View, Text } from "react-native";

interface Props {
  text?: string;
}

const Seprator: React.FC<Props> = ({ text }) => {
  return (
    <View className="flex flex-row items-center m-4">
      <View className="flex-1 h-px bg-[#474759]" />
      <Text className="text-center text-white px-4">{text}</Text>
      <View className="flex-1 h-px bg-[#474759]" />
    </View>
  );
};

export default Seprator;
