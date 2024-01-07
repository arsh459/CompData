import MediaTile from "@components/MediaCard/MediaTile";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { taskTypesToFilterObj } from "@modules/SearchMain/utils";
import { algoliaType } from "@models/AppSearch/interface";
import { View, Text, Image } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { proIconBlack } from "@constants/imageKitURL";

export const resultCardHeight = 105;

interface Props {
  index: number;
  heading?: string;
  contentType?: algoliaType;
  isPro: boolean;
  media?: CloudinaryMedia | AWSMedia | string;
}

const ResultCard: React.FC<Props> = ({
  index,
  contentType,
  heading,
  media,
  isPro,
}) => {
  return (
    <>
      {index !== 0 ? <View className="h-px bg-white/10 mx-4 mb-4" /> : null}
      <View className="flex flex-row items-center justify-between px-4">
        <View className="flex-1 flex flex-row items-center">
          <View className="w-1/4 aspect-square rounded-lg overflow-hidden">
            {typeof media === "string" ? (
              <Image
                className="w-full h-full"
                source={{ uri: media }}
                resizeMode="cover"
              />
            ) : (
              <MediaTile fluid={true} media={media} fluidResizeMode="cover" />
            )}
          </View>

          <View className="flex-1 px-4">
            <Text
              className="text-white text-xs iphoneX:text-sm font-light pb-2.5"
              numberOfLines={2}
            >
              {heading}
            </Text>
            <View className="flex flex-row items-center">
              {contentType ? (
                <View
                  className="self-start rounded-lg "
                  style={{
                    backgroundColor: taskTypesToFilterObj[contentType],
                  }}
                >
                  <Text className="text-[#EAEAEA] capitalize text-center text-[10px] iphoneX:text-xs px-4 py-1.5">
                    {contentType}
                  </Text>
                </View>
              ) : null}
              {isPro ? (
                <View className="pl-4">
                  <ImageWithURL
                    source={{
                      uri: proIconBlack,
                    }}
                    className="w-6 aspect-square"
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <View className="w-1.5 iphoneX:w-2 aspect-[7/15]">
          <ArrowIcon direction="right" color={"#FFFFFF"} />
        </View>
      </View>
    </>
  );
};

export default ResultCard;
