import { View, Text } from "react-native";

interface Props {
  headingString?: string;
  timeString?: string;
  textString?: string;
}
const NotificationCard: React.FC<Props> = ({
  headingString,
  textString,
  timeString,
}) => {
  return (
    <View className="bg-[#2A2933] rounded-xl mb-5">
      <View className=" flex flex-row items-center py-3 rounded-xl  flex-1 px-3 ">
        <Text
          className="text-white text-sm iphoneX:text-base "
          style={{ fontFamily: "BaiJamjuree-SemiBold", flex: 1 }}
        >
          {headingString}
        </Text>
        <View className="flex-row" style={{ flex: 0.5 }}>
          <Text className="text-white  px-2">&#8226;</Text>
          <Text
            className="text-white text-[10px] iphoneX:text-xs"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {timeString}
          </Text>
        </View>
      </View>
      <View className="bg-black h-px" />
      <Text className="text-white text-[10px] iphoneX:text-xs p-3">
        {textString}
      </Text>
    </View>
  );
};

export default NotificationCard;
