import { useSelectedEvent } from "@hooks/event/useSelectedEvent";
import { SOCIALBOAT_GAME, useAuthContext } from "@providers/auth/AuthProvider";
import MediaTile from "@components/MediaCard/MediaTile";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {}

const GameElement: React.FC<Props> = () => {
  const navigation = useNavigation();

  const { state } = useAuthContext();
  const { selectedEvent } = useSelectedEvent(state.gameId);

  const isSocialboatGame = selectedEvent?.id === SOCIALBOAT_GAME;

  const onUniverseSelector = () => {
    navigation.navigate("UniverseSelector");
    weEventTrack("drawer_clickUniverse", {});
  };

  return (
    <View className="flex flex-row items-center justify-between px-2 pb-2 ">
      <View className="w-8 h-8">
        {isSocialboatGame ? (
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain-ratio/Group_693_WH3SDDxJ4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666266728236",
            }}
            className="w-8 h-8 object-cover"
            resizeMode="contain"
          />
        ) : (
          <MediaTile media={selectedEvent?.googleSEOImg} fluid={true} />
        )}
      </View>

      <Text
        className="text-white flex-1  text-base font-medium pl-2"
        onPress={onUniverseSelector}
      >
        {isSocialboatGame ? "SocialBoat" : selectedEvent?.name} Universe
      </Text>
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/Vector__40__oUfwQoliK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666266503203",
        }}
        className="w-5 aspect-[19/16]"
        resizeMode="contain"
      />
    </View>
  );
};

export default GameElement;
