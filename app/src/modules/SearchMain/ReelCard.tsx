import MediaTile from "@components/MediaCard/MediaTile";
import UserImage from "@components/UserImage";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import ReelDuration from "@modules/Knowledge/ReelDuration";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Image, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export const noOfCol = 2;
export const paddingConst = 9;
export const reelCardHeight = (width / noOfCol - paddingConst) * 1.5;

interface Props {
  name?: string;
  userId?: string;
  reelMediaDuration?: number;
  reelThumbnail?: CloudinaryMedia | AWSMedia;
}

const ReelSearchCard: React.FC<Props> = ({
  reelMediaDuration,
  userId,
  reelThumbnail,
  name,
}) => {
  const { user } = useUserV2(userId);

  return (
    <View
      style={{
        width: width / noOfCol - paddingConst,
        paddingHorizontal: paddingConst,
      }}
    >
      <View
        className="relative z-0 rounded-xl overflow-hidden"
        style={{ height: reelCardHeight }}
      >
        <MediaTile
          media={reelThumbnail}
          fluid={true}
          fluidResizeMode="cover"
          paused={true}
        />

        <ReelDuration mediaDuration={reelMediaDuration} />

        <LinearGradient
          colors={["#5D588C00", "#5D588CC7", "#5D588C"]}
          className="absolute left-0 right-0 bottom-0 h-1/2 z-10 p-4 flex justify-end"
        >
          <View className="flex flex-row items-center">
            <UserImage
              image={user?.profileImage}
              width="w-4 iphoneX:w-5"
              height="h-4 iphoneX:h-5"
            />
            <Text className="text-white text-xs iphoneX:text-sm ml-2">
              {user?.name}
            </Text>
          </View>
          <View className="w-1 aspect-square" />
          <Text
            numberOfLines={2}
            className="h-10 text-white text-xs iphoneX:text-sm"
          >
            {name}
          </Text>
        </LinearGradient>

        <View className="absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center">
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Group_1327_PVUcBr8-B.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677506140902",
            }}
            className="w-10 iphoneX:w-12 aspect-square"
          />
        </View>
      </View>
    </View>
  );
};

export default ReelSearchCard;
