import { View } from "react-native";
import StageCardContentCta from "./StageCardContentCta";
import StageCardContentImage from "./StageCardContentImage";
interface Props {
  title: string;
  imageUri: string;
  onNext: () => void;
}
const StageCardContent: React.FC<Props> = ({ title, imageUri, onNext }) => {
  return (
    <View className="px-8 flex flex-row items-center justify-center">
      <StageCardContentImage imageUri={imageUri} />
      <StageCardContentCta title={title} onNext={onNext} />
    </View>
  );
};

export default StageCardContent;
