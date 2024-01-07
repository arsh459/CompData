import { View } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import { MedicalProfileBgImage } from "@constants/imageKitURL";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Props {
  children?: React.ReactNode;
  nextVisble?: boolean;
  onNext: () => void;
}
const MedicalProfileMain: React.FC<Props> = ({
  children,
  nextVisble,
  onNext,
}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View className="flex-1 justify-start">
      <View className="pb-8">{children}</View>
      {nextVisble ? (
        <View
          style={{ paddingBottom: bottom || 16 }}
          className="p-4 absolute bottom-0  left-0 right-0 z-50"
        >
          <ClickButton disabled={false} nextBtnText={"Next"} onNext={onNext} />
        </View>
      ) : null}

      <ImageWithURL
        source={{ uri: MedicalProfileBgImage }}
        className="w-full aspect-[424/447]"
      />
    </View>
  );
};

export default MedicalProfileMain;
