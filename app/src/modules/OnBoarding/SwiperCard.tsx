import { View, Image, Platform, StatusBar } from "react-native";
import SocialBoat from "@components/SocialBoat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  imgUrl: string;
  textNode: ReactNode;
  showLogo?: boolean;
  resizeMode?: "contain";
}

const SwiperCard: React.FC<Props> = ({
  imgUrl,
  textNode,
  showLogo,
  resizeMode,
}) => {
  const { top: SafeTop } = useSafeAreaInsets();

  return (
    <View className="flex-1 relative">
      <View className="flex-1">
        <Image
          source={{ uri: imgUrl }}
          className="w-full h-full"
          resizeMode={resizeMode}
        />
      </View>
      {showLogo ? (
        <View
          className="absolute left-0 right-0"
          style={{
            top: Platform.OS === "android" ? StatusBar.currentHeight : SafeTop,
            paddingTop: 10,
          }}
        >
          <SocialBoat iconColor="#fff" textColor="#fff" />
        </View>
      ) : null}
      <LinearGradient
        colors={["transparent", "#100F1A"]}
        className=" px-4 py-4 iphoneX:py-6"
      >
        {textNode}
      </LinearGradient>
    </View>
  );
};

export default SwiperCard;
