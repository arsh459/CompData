import { View, Text } from "react-native";
import InfoBtn from "@components/Buttons/InfoBtn";
import CloseBtn from "@components/Buttons/CloseBtn";
import SvgIcons from "@components/SvgIcons";

interface Props {
  earnedFP: number;
  totalFP: number;
  msg: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const EarnedFitPointBox: React.FC<Props> = ({
  earnedFP,
  totalFP,
  msg,
  isOpen,
  setIsOpen,
}) => {
  return (
    <View className="rounded-2xl bg-[#333240]">
      <View className="flex flex-row justify-between items-center px-4 py-3">
        <View className="flex flex-row items-center">
          <View className="w-4 h-4 iphoneX:w-5 iphoneX:h-5">
            <SvgIcons iconType="fitpoint" color="#FFFFFF" />
          </View>
          <Text
            className="text-lg iphoneX:text-2xl text-white pl-4"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Earned Fitpoints
          </Text>
        </View>
        {isOpen ? (
          <CloseBtn onClose={() => setIsOpen(false)} />
        ) : (
          <InfoBtn onPress={() => setIsOpen(true)} />
        )}
      </View>
      <View className="h-px bg-[#100F1A]" />
      <View className="flex flex-row">
        <View className="flex-[35%] px-4 py-3">
          <Text
            className="text-lg iphoneX:text-2xl text-white text-center"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {earnedFP} FP
          </Text>
          <View className="my-1.5 h-px bg-white" />
          <Text
            className="text-lg iphoneX:text-2xl text-white text-center"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {totalFP} FP
          </Text>
        </View>
        <View className="w-px bg-[#100F1A]" />
        <View className="flex-[65%] px-4 py-3 flex flex-row justify-center items-center">
          <Text
            className="text-center capitalize text-lg iphoneX:text-2xl text-white"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {msg}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EarnedFitPointBox;
