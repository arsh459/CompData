import GradientText from "@components/GradientText";
import { announcementIcon, spotlightIcon } from "@constants/imageKitURL";
import { iPhoneX } from "@constants/screen";
import { postTypes } from "@models/Post/Post";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";

import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const AnnouncementSpotlight = () => {
  const { game } = useGameContext();
  const { team } = useTeamContext();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const handleClick = (postType: postTypes) => {
    navigation.navigate("ProgramScreen", {
      gameId: game ? game.id : "",
      teamId: team ? team.id : "",
      postType,
    });
  };

  return (
    <View className="flex flex-row p-2">
      <TouchableOpacity
        onPress={() => handleClick("announcement")}
        style={{ width: "50%" }}
      >
        <View className="m-2 py-5 bg-[#FFFFFF1F] flex flex-row justify-center items-center rounded-lg border border-[#747381]">
          <Image
            source={{ uri: announcementIcon }}
            className="w-4 iphoneX:w-5 aspect-square mr-2"
            resizeMode="contain"
          />
          <GradientText
            text="Announcement"
            textStyle={{
              fontSize: width > iPhoneX ? 16 : 12,
              fontFamily: "BaiJamjuree-Medium",
              fontWeight: "500",
              color: "white",
            }}
            colors={["#FE6C8B", "#F49AD9"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleClick("spotlight")}
        style={{ width: "50%" }}
      >
        <View className="m-2 py-5 bg-[#FFFFFF1F] flex flex-row justify-center items-center rounded-lg border border-[#747381]">
          <Image
            source={{ uri: spotlightIcon }}
            className="w-3 iphoneX:w-4 aspect-square mr-2"
            resizeMode="contain"
          />
          <GradientText
            text="Spotlight"
            textStyle={{
              fontSize: width > iPhoneX ? 16 : 12,
              fontFamily: "BaiJamjuree-Medium",
              fontWeight: "500",
              color: "white",
            }}
            colors={["#A3D8FF", "#C1FFBF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AnnouncementSpotlight;
