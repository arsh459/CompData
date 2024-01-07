import { View, Text, Pressable, Image } from "react-native";

import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";
import { Badge } from "@models/Prizes/Prizes";
interface Props {
  workoutDetail?: string;
  media?: CloudinaryMedia | AWSMedia;
  changeView: (val: boolean) => void;
  badge?: Badge;
}
const ArenaDetail: React.FC<Props> = ({
  workoutDetail,
  media,
  changeView,
  badge,
}) => {
  return (
    <>
      <View className="flex flex-row px-4 py-2 relative">
        <View className="flex-1 pr-2">
          <Text
            className="text-[#A5DAFF] text-lg "
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            Workout Overview
          </Text>
          <Text
            className="text-[#90C7F1] text-xs "
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {badge?.description}
          </Text>
        </View>
        {/* {media ? ( */}
        <View className="w-1/4  aspect-[73/91] relative">
          <MediaTile fluid={true} media={badge?.brandImage} />
          <Pressable
            onPress={() => changeView(false)}
            className="absolute right-0 top-0"
          >
            <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/Component_45__1__4uugcSAnT.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664256663613",
              }}
              className="w-5 aspect-square "
              resizeMode="contain"
            />
          </Pressable>
        </View>
        {/* ) : null} */}
        {/* <View className="w-1/4 bg-red-700 aspect-[73/91]" /> */}
      </View>
      <View className="flex flex-row   pb-3 flex-1 px-4 flex-wrap">
        {badge?.tags &&
          badge?.tags.map((item, index) => {
            return (
              <View
                key={index}
                className="bg-[#3C6CBB] flex flex-row mr-2 justify-center items-center mb-2 rounded-xl   px-4 py-1"
              >
                <Text
                  className="text-[#A5DAFF] text-xs"
                  style={{ fontFamily: "BaiJamjuree-Medium" }}
                >
                  {item}
                </Text>
              </View>
            );
          })}
      </View>
    </>
  );
};

export default ArenaDetail;
