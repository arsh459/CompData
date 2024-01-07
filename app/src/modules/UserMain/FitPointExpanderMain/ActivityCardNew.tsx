import { View, Text, Pressable } from "react-native";

import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";
import HexaPercent from "@components/HexaPercent";
interface Props {
  media?: CloudinaryMedia | AWSMedia;
  name?: string;
  subText?: string;
  gainedFp: number;
  totalFp: number;
  size: number;
  width: number;
  height: number;
  progress: number;
  onPress: () => void;
}
const ActivityCardNew: React.FC<Props> = ({
  gainedFp,
  size,
  totalFp,
  media,
  name,
  subText,
  width,
  height,
  progress,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 flex flex-row  bg-[#343150]  rounded-2xl p-2 mx-4 "
    >
      <View className="w-2/5 relative rounded-xl overflow-hidden aspect-video ">
        <MediaTile
          media={media}
          fluid={true}
          fluidResizeMode="cover"
          roundedStr="rounded-xl"
        />
      </View>
      <View className="pl-4 flex-1    py-1 ">
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          className="text-white flex-1 w-2/3 tracking-wide   text-sm iphoneX:text-base "
          style={{ fontFamily: "Nunito-SemiBold", lineHeight: 18 }}
        >
          {name}
        </Text>

        <Text
          className="text-white/80 text-xs "
          style={{ fontFamily: "Nunito-Medium" }}
        >
          {subText}
        </Text>
      </View>
      <View className="flex justify-center ">
        <HexaPercent
          // size={size}
          width={width}
          height={height}
          percent={progress}
          activeColor={"#fff"}
          inActiveColor={"#00000033"}
          noAnimation={true}
        >
          <View className="flex items-center justify-center absolute  left-0 right-0 top-0 bottom-0">
            <Text
              className="text-sm   text-white "
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {`${gainedFp}${totalFp ? `/${totalFp}` : ""}`}
            </Text>
            <Text
              className="text-xs   text-white "
              style={{ fontFamily: "Nunito-Light" }}
            >
              FPs
            </Text>
          </View>
        </HexaPercent>
      </View>
    </Pressable>
  );
};

export default ActivityCardNew;
