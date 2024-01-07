import { swapIconYellowFrame20 } from "@constants/imageKitURL";
import { Text, TouchableOpacity, Image } from "react-native";

interface Props {
  onSwapPress?: () => void;
}

const SwapCta: React.FC<Props> = ({ onSwapPress }) => {
  return (
    <TouchableOpacity
      onPress={onSwapPress}
      className="flex flex-row items-center  "
    >
      <Image
        className="w-4 aspect-square"
        source={{ uri: swapIconYellowFrame20 }}
      />
      <Text
        className="text-xs text-[#ffcb46] pl-1"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        Swap Item
      </Text>
    </TouchableOpacity>
  );
};

export default SwapCta;
