import { View } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import { SakhiPartTwoBg } from "@constants/imageKitURL";
import { useWindowDimensions } from "react-native";

const SakhiPartTwo = () => {
  const { height } = useWindowDimensions();
  return (
    <View className="flex-1  " style={{ height }}>
      <ImageWithURL
        source={{ uri: SakhiPartTwoBg }}
        className="w-full aspect-[375/648]"
      />
    </View>
  );
};

export default SakhiPartTwo;
