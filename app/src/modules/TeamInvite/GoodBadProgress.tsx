import { View } from "react-native";
interface Props {}
const GoodBadProgress: React.FC<Props> = ({}) => {
  return (
    <View className="flex flex-row items-center">
      <View className="bg-[#675F99] w-1 rounded-sm h-5 m-px" />
      <View className="bg-[#8177C2] w-1 rounded-sm h-5 m-px" />
      <View className="bg-[#518CFF] w-1 rounded-sm h-5 m-px" />
      <View className="bg-[#51D5FF] w-1 rounded-sm h-7 m-px" />
      <View className="bg-[#51FFD5] w-1 rounded-sm h-9 m-px" />
      <View className="bg-[#61FF97] w-1 rounded-sm h-11 m-px" />
      <View className="bg-[#51FFD5] w-1 rounded-sm h-9 m-px" />
      <View className="bg-[#51D5FF] w-1 rounded-sm h-7 m-px" />
      <View className="bg-[#518CFF] w-1 rounded-sm h-5 m-px" />
      <View className="bg-[#8177C2] w-1 rounded-sm h-5 m-px" />
      <View className="bg-[#675F99] w-1 rounded-sm h-5 m-px" />
    </View>
  );
};

export default GoodBadProgress;
