import MediaTile from "@components/MediaCard/MediaTile";
import { sbCircleLogo } from "@constants/imageKitURL";
import { EventInterface } from "@models/Event/Event";
import { SOCIALBOAT_GAME, useAuthContext } from "@providers/auth/AuthProvider";
import { useGameContext } from "@providers/game/GameProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";

import { View, Text, Image, TouchableOpacity } from "react-native";

const UniverseCard = () => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { game } = useGameContext();
  const isSocialboatGame = game?.id === SOCIALBOAT_GAME;
  const { onChangeGameId } = useAuthContext();

  const handleClick = (gameObj: EventInterface) => {
    if (gameObj?.inviteCode) {
      navigation.navigate("InviteCode", { gameId: gameObj.id });
    } else if (!gameObj.inviteCode && !user?.onboarded) {
      onChangeGameId(gameObj.id);
      setTimeout(() => {
        navigation.navigate("JoinBoat", {
          section: "welcome",
        });
      }, 200);
    } else {
      onChangeGameId(gameObj.id);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 200);
    }
  };

  return game ? (
    <View className="border border-[#636363] rounded-xl overflow-hidden">
      <View
        className="flex-1 flex justify-center items-center"
        style={{ aspectRatio: 3 / 2 }}
      >
        <View className="w-1/3 aspect-square">
          {isSocialboatGame ? (
            <Image
              source={{ uri: sbCircleLogo }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <MediaTile media={game?.googleSEOImg} fluid={true} />
          )}
        </View>
      </View>
      {isSocialboatGame ? (
        <Text
          className="text-xl iphoneX:text-2xl mx-4 text-[#FF5970]"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          SocialBoat
        </Text>
      ) : (
        <Text
          className="text-white text-xl iphoneX:text-2xl mx-4"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          You have been invited to{" "}
          <Text className="text-[#FF5970]">{game.name} Universe</Text>
        </Text>
      )}
      <Text
        className="text-white/80 text-sm iphoneX:text-base mx-4 my-6"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        By joining this universe you will get access to play in{" "}
        {isSocialboatGame ? "SocialBoat" : game.name} Universe.
      </Text>
      <TouchableOpacity
        onPress={() => handleClick(game)}
        style={{ backgroundColor: isSocialboatGame ? "#FFFFFF" : "#FF5970" }}
      >
        <Text
          className="text-base iphoneX:text-xl text-center py-2"
          style={{
            fontFamily: "BaiJamjuree-Bold",
            color: isSocialboatGame ? "#000000" : "#FFFFFF",
          }}
        >
          Enter This Universe
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default UniverseCard;
