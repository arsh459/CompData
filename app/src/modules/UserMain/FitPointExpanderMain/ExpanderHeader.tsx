import { View, Text } from "react-native";

import {
  fitPointExpanderBgImgNew,
  springIconHexaFrame28,
} from "@constants/imageKitURL";
import ImageWithURL from "@components/ImageWithURL";
interface Props {
  fpStr?: string;
}
const ExpanderHeader: React.FC<Props> = ({ fpStr }) => {
  return (
    <View className="relative ">
      <ImageWithURL
        source={{ uri: fitPointExpanderBgImgNew }}
        className="aspect-[375/192]"
      />
      <View className="absolute flex items-center left-0 right-0 top-0 bottom-0  justify-center">
        <View className="flex flex-row justify-center items-center">
          <ImageWithURL
            className="h-7 iphoneX:h-8 aspect-square mr-2"
            source={{ uri: springIconHexaFrame28 }}
            resizeMode="contain"
          />
          <Text
            className="text-[#F1F1F1] text-2xl iphoneX:text-3xl text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {fpStr}
          </Text>
        </View>
        <Text
          className="text-white/80 text-sm iphoneX:text-base capitalize text-center"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          My total fitpoints
        </Text>
      </View>
    </View>
  );
};

export default ExpanderHeader;
