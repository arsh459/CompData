import MediaTile from "@components/MediaCard/MediaTile";
import { useAdvertisementDoc } from "@hooks/game/useAdvertisementDoc";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";

interface Props {}

const HallOfFameHeader: React.FC<Props> = () => {
  const { advertisementDoc } = useAdvertisementDoc();
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const onDotClick = () => {
    navigation.navigate("ChampionshipExplainer");
    weEventTrack("ranking_clickDot", {});
  };

  return advertisementDoc ? (
    <View className="flex justify-center items-center">
      <TouchableOpacity onPress={onDotClick} className="mb-2">
        <MediaTile
          media={advertisementDoc.image}
          roundedStr="rounded-xl"
          fluidResizeMode="cover"
          fluid={false}
          mediaWidth={width - 32}
          // maxHeight={140}
        />
      </TouchableOpacity>
    </View>
  ) : null;
};

export default HallOfFameHeader;
