import { View, Text, Image } from "react-native";

import {
  baseImageKit,
  fitPointExpanderBgImg,
  springIconWhite,
} from "@constants/imageKitURL";
interface Props {
  fpStr?: string;
}
const ExpanderHeader: React.FC<Props> = ({ fpStr }) => {
  return (
    <View className="relative">
      <Image
        source={{ uri: fitPointExpanderBgImg }}
        className="aspect-[375/179]"
      />
      <View className="absolute flex items-center left-0 right-0 top-0 bottom-0  justify-center">
        <View className="flex flex-row items-center px-2 ">
          <Image
            className="w-[16px] h-[18px] mr-2"
            resizeMode="contain"
            source={{ uri: `${baseImageKit}/${springIconWhite}` }}
          />
          <Text
            className="text-[#F1F1F1] text-xl iphoneX:text-2xl "
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {fpStr}
          </Text>
        </View>
        <Text
          className="text-white text-sm iphoneX:text-base "
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          My total fipoints
        </Text>
      </View>
    </View>
  );
};

export default ExpanderHeader;
