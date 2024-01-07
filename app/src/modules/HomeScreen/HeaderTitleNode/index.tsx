import { Image, Text, TouchableOpacity, View } from "react-native";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useNavigation } from "@react-navigation/native";
import { SOCIALBOAT_GAME } from "@providers/auth/AuthProvider";
import MediaTile from "@components/MediaCard/MediaTile";
import { useGameContext } from "@providers/game/GameProvider";
import { socialboatLogo } from "@constants/imageKitURL";

const HeaderTitleNode = () => {
  const { game } = useGameContext();
  const navigation = useNavigation();
  const isSocialboatGame = game?.id === SOCIALBOAT_GAME;

  return (
    <View className="flex-1 flex flex-row items-center">
      <View className="w-6 iphoneX:w-8 aspect-square mr-3">
        {isSocialboatGame ? (
          <Image
            source={{ uri: socialboatLogo }}
            className="w-full h-full"
            resizeMode="contain"
          />
        ) : (
          <MediaTile media={game?.googleSEOImg} fluid={true} />
        )}
      </View>
      <Text
        className="text-white text-xl iphoneX:text-2xl"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {isSocialboatGame ? "SocialBoat" : game?.name}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("UniverseSelector")}>
        <View className="w-3 iphoneX:w-4 aspect-square m-2">
          <ArrowIcon color="#FFFFFF" direction="bottom" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTitleNode;
