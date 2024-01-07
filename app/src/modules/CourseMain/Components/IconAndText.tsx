import { View, Text, Image } from "react-native";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";
import { LevelsTypes } from "@components/SvgIcons/LevelsIcon";
import SvgIcons from "@components/SvgIcons";

interface Props {
  imgUrl?: CloudinaryMedia | AWSMedia | string;
  resizeModeCover?: boolean;
  text?: string;
  level?: LevelsTypes;
}

const IconAndText: React.FC<Props> = ({
  imgUrl,
  text,
  resizeModeCover,
  level,
}) => {
  return (
    <View className="flex flex-row w-1/3 justify-center p-2">
      {level ? (
        <View className="w-4 aspect-square">
          <SvgIcons iconType="levels" difficultyLevel={level} />
        </View>
      ) : imgUrl ? (
        <>
          {typeof imgUrl === "string" ? (
            <Image
              source={{ uri: imgUrl }}
              className="w-4 aspect-square"
              resizeMode="contain"
            />
          ) : (
            <View className="w-4 aspect-square">
              <MediaTile
                fluid={true}
                media={imgUrl}
                fluidResizeMode={resizeModeCover ? "cover" : undefined}
              />
            </View>
          )}
        </>
      ) : null}

      <Text
        className="text-[#FFFFFF] text-xs pl-2 flex-1"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        {text}
      </Text>
    </View>
  );
};

export default IconAndText;
