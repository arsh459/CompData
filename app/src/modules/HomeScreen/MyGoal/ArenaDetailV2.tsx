import { View, Text } from "react-native";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { Badge } from "@models/Prizes/Prizes";
import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";
import MediaTile from "@components/MediaCard/MediaTile";

interface Props {
  startColor: string;
  endColor: string;
  workoutDetail?: string;
  media?: CloudinaryMedia | AWSMedia;
  badge?: Badge;
  classStr?: string;
}
const ArenaDetailV2: React.FC<Props> = ({
  startColor,
  endColor,
  workoutDetail,
  media,
  badge,
  classStr,
}) => {
  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={[1, 0]}
      end={[0, 1]}
      className={clsx(
        classStr ? classStr : "flex-1 aspect-[322/165]",
        "rounded-[20px] overflow-hidden flex flex-col p-4 relative z-0"
      )}
    >
      <View className="flex flex-row ">
        {badge?.badgeImage ? (
          <View className="w-1/3 aspect-[68/74]">
            <MediaTile fluid={true} media={badge.badgeImage} />
          </View>
        ) : null}

        <View className="w-2/3 pl-4">
          <Text
            className="text-[#FFFFFF] text-lg"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Workout Overview
          </Text>

          <Text
            className="text-[#C0E4FF] text-sm"
            numberOfLines={4}
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {badge?.description}
          </Text>
        </View>
      </View>
      <View className="w-2 aspect-square" />
      <View className="flex flex-row flex-wrap">
        {badge?.tags &&
          badge?.tags.map((item, index) => {
            return (
              <View
                key={index}
                className="bg-[#FFFFFF2B] flex flex-row  justify-center items-center mb-2 rounded-xl  mr-1 p-1"
              >
                <Text
                  className="text-[#FFFFFFCC] text-[10px] px-3"
                  style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                >
                  {item}
                </Text>
              </View>
            );
          })}
      </View>
    </LinearGradient>
  );
};

export default ArenaDetailV2;
