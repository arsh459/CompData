import MediaTile from "@components/MediaCard/MediaTile";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { View, Image } from "react-native";

interface Props {
  cardImg?: CloudinaryMedia | AWSMedia | string;
  resizeModeCover?: boolean;
  imgHeight?: number;
}

const CardImage: React.FC<Props> = ({
  cardImg,
  resizeModeCover,
  imgHeight,
}) => {
  // 314 162
  return (
    <>
      {cardImg ? (
        <View className="absolute left-0 right-0 top-0 bottom-0">
          {typeof cardImg === "string" ? (
            <Image
              source={{
                uri: cardImg,
              }}
              className="w-full h-full"
              resizeMode={resizeModeCover ? "cover" : "contain"}
            />
          ) : (
            <MediaTile
              fluid={true}
              // mediaWidth={316}
              maxHeight={imgHeight}
              media={cardImg}
              fluidResizeMode={resizeModeCover ? "cover" : undefined}
            />
          )}
        </View>
      ) : null}
    </>
  );
};

export default CardImage;
