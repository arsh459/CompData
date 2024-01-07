import { View, Image, Text } from "react-native";
// import SocialBoat from "@components/SocialBoat";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  imgUrl: string;
  textNode: ReactNode;
  showLogo?: boolean;
  resizeMode?: "contain";
}

const SwiperCardChampion: React.FC<Props> = ({
  imgUrl,
  textNode,
  showLogo,
  resizeMode,
}) => {
  // const { top: SafeTop } = useSafeAreaInsets();

  return (
    <View className="flex-1 relative">
      <View className="flex-1 aspect-[327/240]">
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group_790_dmoU2BcgX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666177882312",
          }}
          // source={{ uri: imgUrl }}
          className="w-full h-full "
          // resizeMode={resizeMode}
          resizeMode={"contain"}
        />
      </View>
      {/* {showLogo ? (
        <View
          className="absolute left-0 right-0"
          style={{
            top: Platform.OS === "android" ? StatusBar.currentHeight : SafeTop,
            paddingTop: 10,
          }}
        >
          <SocialBoat iconColor="#fff" textColor="#fff" />
        </View>
      ) : null} */}
      <LinearGradient
        colors={["transparent", "#100F1A"]}
        className=" px-4 py-4 iphoneX:py-6"
      >
        <Text>Create a Team and Workout with Friends everyday.</Text>
        {/* {textNode} */}
      </LinearGradient>
    </View>
  );
};

export default SwiperCardChampion;
