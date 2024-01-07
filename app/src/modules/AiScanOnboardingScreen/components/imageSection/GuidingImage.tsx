import ImageWithURL from "@components/ImageWithURL";
import { onboardingCompData } from "@modules/AiScanOnboardingScreen/constants/constants";
import { View } from "react-native";
interface Props {
  index: number;
}
const GuidingImage: React.FC<Props> = ({ index }) => {
  return (
    <View className="w-full z-10">
      <ImageWithURL
        source={{ uri: onboardingCompData[index].imageUrl }}
        resizeMode={"contain"}
        className="aspect-[375/533]"
      />
    </View>
  );
};

export default GuidingImage;
