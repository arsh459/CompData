import { View, Text, Image } from "react-native";

import { cameraAiClickIcon } from "@constants/imageKitURL";
interface Props {
  isEnabled: boolean;
}
const AiStatus: React.FC<Props> = ({ isEnabled }) => {
  return (
    <View className="flex flex-row items-center  flex-1 justify-end">
      <Text className="text-white text-xs font-sans font-normal">
        {isEnabled ? "AI Enabled" : "AI Disabled"}
      </Text>
      <Image
        source={{ uri: cameraAiClickIcon }}
        className="w-10 aspect-square ml-2"
      />
    </View>
  );
};

export default AiStatus;
