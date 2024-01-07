import { View, Text } from "react-native";

import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import MediaTile from "@components/MediaCard/MediaTile";

const BadgesYouCanWin = () => {
  const { badge } = useSignleBadgeContext();

  return (
    <>
      <Text
        className="text-sm px-4 iphoneX:text-sm text-white"
        style={{
          fontFamily: "BaiJamjuree-SemiBold",
        }}
      >
        Badge you can win
      </Text>
      <View className="bg-[#262630] flex-1 flex flex-row items-center m-4 rounded-2xl p-4">
        <View className="w-1/4">
          <View className="w-full aspect-[79/83]">
            <MediaTile fluid={true} media={badge?.badgeImage} />
          </View>
        </View>
        <View className="w-3/4 pl-4 ">
          <Text
            className="text-xs iphoneX:text-sm text-white"
            style={{
              fontFamily: "BaiJamjuree-SemiBold",
            }}
          >
            {badge?.name}
          </Text>
          <Text numberOfLines={4} className="text-[#A0A0A0] text-xs font-sans">
            {badge?.description}
          </Text>
        </View>
      </View>
    </>
  );
};

export default BadgesYouCanWin;
