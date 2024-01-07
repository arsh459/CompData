import { View } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import { SakhiPartThreeBg } from "@constants/imageKitURL";
import { useWindowDimensions } from "react-native";

const SakhiPartThree = () => {
  const { height } = useWindowDimensions();
  return (
    <View className="pt-8" style={{ height }}>
      <ImageWithURL
        source={{ uri: SakhiPartThreeBg }}
        className="w-full aspect-[375/563]"
        resizeMode="contain"
      />
    </View>
  );
};

export default SakhiPartThree;
