import { playButtonBlack } from "@constants/imageKitURL";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text } from "react-native";

interface Props {
  overlay?: boolean;
  cta?: string;
}

const UnlockedKPIs: React.FC<Props> = ({ overlay, cta }) => {
  return (
    <LinearGradient
      colors={
        overlay ? ["transparent", "#000000"] : ["transparent", "transparent"]
      }
      className={clsx(
        "w-full flex flex-row items-end  justify-center absolute h-1/2 top-1/2  left-0 right-0 bottom-0 pb-1.5 px-1.5 z-50"
      )}
    >
      <View className="flex rounded-lg flex-row py-2 w-full bg-[#FFFFFF] text-white items-center justify-center">
        <Image
          source={{
            uri: playButtonBlack,
          }}
          className="h-3 w-3"
          resizeMode="contain"
        />
        <Text
          className="pl-1 text-[#100F1A] iphoneX:pl-2 whitespace-nowrap text-xs iphoneX:text-sm font-medium "
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {cta ? cta : "Start Game"}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default UnlockedKPIs;
