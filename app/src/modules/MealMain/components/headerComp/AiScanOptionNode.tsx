import SvgIcons from "@components/SvgIcons";
import { View, TouchableOpacity, Text } from "react-native";

interface Props {
  onAiScan: () => void;
}
const AiScanOptionNode: React.FC<Props> = ({ onAiScan }) => {
  return (
    <View>
      <TouchableOpacity
        className="flex flex-row justify-center items-center rounded-lg py-1.5 px-3 shadow-md bg-white"
        onPress={onAiScan}
      >
        <View className="w-3 aspect-square mr-1 ">
          <SvgIcons iconType="camera" color="#F4753F" />
        </View>
        <View>
          <Text
            style={{ color: "#F4753F", fontFamily: "Nunito-SemiBold" }}
            className="text-xs tracking-wide"
          >
            AI Scan
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AiScanOptionNode;
