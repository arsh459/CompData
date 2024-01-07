import AddButton from "@modules/AddNewItem/components/searchScreen/AddButton";
import { onboardingCompData } from "@modules/AiScanOnboardingScreen/constants/constants";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GuidingImage from "./imageSection/GuidingImage";
// import IndexDots from "./infoSection/IndexDots";
import StepInformation from "./infoSection/StepInformation";

interface Props {
  index: number;
  onNext: () => void;
}
const AiMain: React.FC<Props> = ({ index, onNext }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="w-full flex-1 bg-[#232136] "
      style={{ paddingBottom: bottom }}
    >
      <GuidingImage index={index} />
      <View className="flex-1">
        {/* <IndexDots index={index} /> */}
        <StepInformation index={index} />
      </View>
      <AddButton
        onPress={onNext}
        cta={onboardingCompData[index].buttonText}
        showIcon={false}
      />
    </View>
  );
};

export default AiMain;
