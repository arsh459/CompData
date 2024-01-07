import { View, Image } from "react-native";

import ButtonWithBelowText from "./ButtonWithBelowText";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  onCancel: () => void;
  onProceed: () => void;
  imgUri?: string;
}

const PreviewImageUi: React.FC<Props> = ({ onCancel, onProceed, imgUri }) => {
  return (
    <View className="relative w-full flex-1 items-center justify-center">
      <Image className="flex-1 self-stretch" source={{ uri: imgUri }} />

      <LinearGradient
        colors={["#13121F00", "#13121F6B", "#13121FAB", "#13121FCF", "#13121F"]}
        className="absolute left-0 right-0 bottom-0 p-4 flex flex-row justify-center items-center"
      >
        <ButtonWithBelowText
          iconUrl="https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Component_90_RPMx1SBwXF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671176095978"
          text="Cancel"
          onPress={onCancel}
        />
        <View className="w-5 aspect-square" />
        <ButtonWithBelowText
          iconUrl="https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Component_89_5X6htxNw4N.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671176048544"
          text="Proceed"
          onPress={onProceed}
        />
      </LinearGradient>
    </View>
  );
};

export default PreviewImageUi;
