import MediaTile from "@components/MediaCard/MediaTile";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { usePreviewContext } from "@modules/Workout/ProgramHome/PreviewProvider/PreviewProvider";
import { getURLToFetch } from "@utils/media/mediaURL";
import { useState } from "react";
import { View, Image, Platform } from "react-native";
import Video from "react-native-video";

interface Props {
  taskId: string;
  cardImg?: CloudinaryMedia | AWSMedia | string;
  previewMedia?: CloudinaryMedia | AWSMedia;
  resizeModeCover?: boolean;
  imgHeight?: number;
}

const CardImageV2: React.FC<Props> = ({
  taskId,
  cardImg,
  previewMedia,
  resizeModeCover,
  imgHeight,
}) => {
  const { target } = usePreviewContext();
  const [shouldPlay, setShouldPlay] = useState<boolean>(false);

  // const onEnd = () => {
  //   // setShouldPlay(false);
  //   if (target?.nextTarget) {
  //     // setTarget(target.nextTarget);
  //   }
  // };

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
      {previewMedia && taskId === target?.taskId && Platform.OS === "ios" ? (
        <View className="absolute left-0 right-0 top-0 bottom-0">
          <Video
            source={{ uri: getURLToFetch(previewMedia, 400, imgHeight || 400) }}
            controls={false}
            paused={false}
            muted={true}
            repeat={true}
            resizeMode="cover"
            className="w-full h-full"
            onLoad={() => setShouldPlay(true)}
            // onEnd={onEnd}

            style={{ opacity: shouldPlay ? 1 : 0 }}
          />
        </View>
      ) : null}
    </>
  );
};

export default CardImageV2;
