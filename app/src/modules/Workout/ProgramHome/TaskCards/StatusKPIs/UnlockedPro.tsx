import BlurBG from "@components/BlurBG";
import { baseImageKit, lockedIconKeyHoleBlack } from "@constants/imageKitURL";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text } from "react-native";

interface Props {
  overlay?: boolean;
  cta?: string;
}

const UnlockedPro: React.FC<Props> = ({ overlay, cta }) => {
  return (
    <LinearGradient
      colors={
        overlay ? ["#000000DB", "#100F1AC9"] : ["transparent", "transparent"]
      }
      className={clsx(
        "w-full flex flex-row items-end  justify-center absolute  top-0  left-0 right-0 bottom-0 pb-1.5 px-1.5 z-50  backdrop-blur-3xl"
      )}
    >
      <BlurBG
        blurAmount={35}
        blurType="light"
        fallbackColor="#100F1AC9"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.7,
        }}
      />
      <View className="flex rounded-lg flex-row py-2 w-full bg-[#FFFFFF] text-white items-center justify-center">
        <Image
          source={{
            uri: `${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconKeyHoleBlack}`,
          }}
          className="h-3 aspect-square"
          resizeMode="contain"
        />
        <Text
          className="pl-1 text-[#100F1A] iphoneX:pl-2 whitespace-nowrap text-xs iphoneX:text-sm font-medium "
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {cta ? cta : "Unlock Now!"}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default UnlockedPro;
