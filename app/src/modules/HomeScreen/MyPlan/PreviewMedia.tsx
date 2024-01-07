import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import SvgIcons from "@components/SvgIcons";
import { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { getURLToFetch } from "@utils/media/mediaURL";
import Video from "react-native-video";
import { usePreviewContext } from "@modules/Workout/ProgramHome/PreviewProvider/PreviewProvider";
import { getWidthHeightMedia } from "@utils/media/mediaDimensions";

interface Props {
  previewMedia: CloudinaryMedia | AWSMedia;
  color: string;
  title?: string;
  fitpoints?: number;
}

const PreviewMedia: React.FC<Props> = ({
  previewMedia,
  color,
  title,
  fitpoints,
}) => {
  const dims = useWindowDimensions();
  const { width, height } = getWidthHeightMedia(
    dims.width,
    dims.height,
    previewMedia
  );
  const { target, setTarget } = usePreviewContext();
  const uri: string = getURLToFetch(previewMedia, width, height);
  const [shouldPlay, setShouldPlay] = useState<boolean>(false);

  const onEnd = () => {
    // setShouldPlay(false);
    if (target?.nextTarget) {
      setTarget(target.nextTarget);
    }
  };

  return previewMedia.resource_type === "video" ? (
    <View
      className={clsx(
        "absolute left-0 right-0 top-0 bottom-0",
        shouldPlay ? "opacity-100" : "opacity-0"
      )}
    >
      <Video
        source={{ uri }}
        controls={false}
        paused={false}
        muted={true}
        repeat={false}
        resizeMode="cover"
        className="w-full h-full"
        onLoad={() => setShouldPlay(true)}
        onEnd={onEnd}
      />
      {title || fitpoints ? (
        <LinearGradient
          colors={["transparent", "#2E2E2EE5"]}
          className="flex flex-row justify-between items-end absolute bottom-0 left-0 right-0 h-2/5 p-4"
        >
          {title ? (
            <Text
              style={{ color, fontFamily: "BaiJamjuree-BoldItalic" }}
              className="w-2/3 text-lg iphoneX:text-xl leading-5"
            >
              {title}
            </Text>
          ) : null}
          {fitpoints ? (
            <View className="flex flex-row justify-center items-center">
              <View className="w-4 iphoneX:w-5 aspect-square mr-1 iphoneX:mr-2">
                <SvgIcons iconType="fitpoint" color={color} />
              </View>
              <Text
                style={{ color, fontFamily: "BaiJamjuree-Bold" }}
                className="text-xs iphoneX:text-sm"
              >
                {`${fitpoints}FP`}
              </Text>
            </View>
          ) : null}
        </LinearGradient>
      ) : null}
    </View>
  ) : null;
};

export default PreviewMedia;
