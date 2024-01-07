import { View, Text } from "react-native";
interface Props {
  onSubscribe: () => void;
  text?: string;
}
const SubButton: React.FC<Props> = ({ onSubscribe, text }) => {
  return (
    <View className="flex-1 flex flex-col justify-around px-4">
      <Text className="text-center text-white text-xl iphoneX:text-[26px]">{`You Haven't Subscribed to Any Plan`}</Text>

      <Text
        className=" bg-[#FF556C] text-white py-2 iphoneX:py-4
sticky   bottom-0     
          border rounded-full text-center mx-3 text-sm iphoneX:text-base font-medium "
        onPress={onSubscribe}
      >
        {text ? text : `Subscribe Now!`}
      </Text>
    </View>
  );
};
export default SubButton;
