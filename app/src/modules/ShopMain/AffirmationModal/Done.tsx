import { View, Text } from "react-native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import StepperTimeLine from "../MyPurchases/StepperTimeLine";

interface Props {
  onDone: () => void;
}

const Done: React.FC<Props> = ({ onDone }) => {
  return (
    <View className="mt-[20%] iphoneX:pt-32 flex-1 p-4">
      <View className="flex flex-row justify-between">
        <Text
          className="text-lg iphoneX:text-xl text-[#F8F8F8]"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          My Purchase Status
        </Text>
      </View>
      <View className="h-4" />
      <View className="bg-[#99999930] px-5 py-6 rounded-lg">
        <StepperTimeLine
          isRedeemed={"requested"}
          height="h-32 iphoneX:h-40"
          children={
            <Text
              className="absolute left-[4%] right-[4%] top-[4%] bottom-[4%] z-0 w-px bg-[#BABABA]"
              style={{
                backgroundColor: "#BABABA",
              }}
            />
          }
        />
      </View>
      <View className="flex flex-row justify-end px-4 mt-[15%]">
        <StartButton
          title="Done"
          bgColor="bg-[#31FFB5] flex-1"
          textColor="text-[#100F1A]"
          roundedStr="rounded-md"
          textStyle="py-2.5 px-12 text-center text-xs iphoneX:text-sm font-bold rounded-md"
          onPress={onDone}
        />
      </View>
    </View>
  );
};

export default Done;
