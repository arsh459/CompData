import { getPositionFormat } from "@modules/ReelViewMain/utils";
import { View, Text } from "react-native";

interface Props {
  // reelMedia?: AWSMedia | CloudinaryMedia;
  mediaDuration?: number;
}

const ReelDuration: React.FC<Props> = ({ mediaDuration }) => {
  return mediaDuration ? (
    <View className="absolute top-2 right-2 z-10 bg-[#5D588CB2] rounded-lg px-2 py-1">
      <Text
        className="text-white text-[10px] iphoneX:text-xs"
        style={{ fontFamily: "Nunito-Light" }}
      >
        {getPositionFormat(mediaDuration * 1000)}
      </Text>
    </View>
  ) : null;
};

export default ReelDuration;
