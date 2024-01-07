import { View, Text } from "react-native";

interface Props {
  leftMainText?: string;
  leftSubText?: string;
  rightText?: string;
  rightTextColor?: string;
}
const WeightElement: React.FC<Props> = ({
  leftMainText,
  leftSubText,
  rightText,
  rightTextColor,
}) => {
  return (
    <View className="bg-[#343150] rounded-xl p-5 mt-5  mx-4 flex flex-row justify-between items-center">
      <View className="flex">
        <Text
          className="text-white text-sm iphoneX:text-base "
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {leftMainText}
        </Text>
        {leftSubText ? (
          <Text
            className="text-white/80 text-xs "
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {leftSubText}
          </Text>
        ) : null}
      </View>
      <Text
        className="text-white text-xl iphoneX:text-2xl"
        style={{ fontFamily: "Nunito-Bold", color: rightTextColor || "white" }}
      >
        {rightText}
      </Text>
    </View>
  );
};

export default WeightElement;
