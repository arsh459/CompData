import { onboardingCompData } from "@modules/AiScanOnboardingScreen/constants/constants";
import { View, Text } from "react-native";
interface Props {
  index: number;
}
const StepInformation: React.FC<Props> = ({ index }) => {
  return (
    <>
      <View className="px-10 pb-3.5 pt-8">
        <Text
          className="text-white/90 text-2xl leading-relaxed tracking-tight"
          style={{ fontFamily: "Poppins-SemiBold" }}
        >
          {onboardingCompData[index].headingText}
        </Text>
      </View>
      <View className="px-10">
        <Text
          className="text-white/70 text-xs leading-[1rem]"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          {onboardingCompData[index].subHeadingText}
        </Text>
      </View>
    </>
  );
};

export default StepInformation;
