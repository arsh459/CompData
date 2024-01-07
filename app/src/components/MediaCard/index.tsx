import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import {
  Image,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useRef, useState } from "react";
import MediaTile from "./MediaTile";
import { AVPlaybackStatusSuccess, Video } from "expo-av";
import { playIcon } from "@constants/imageKitURL";
import clsx from "clsx";

interface Props {
  media?: CloudinaryMedia | AWSMedia;
  thumbnail?: CloudinaryMedia | AWSMedia;
  maxHeight?: number;
  notPlayable?: boolean;
  setIsPaused?: (val: boolean) => void;
  mediaFit?: "contain";
  fluid?: boolean;
  roundedStr?: string;
  fluidResizeMode?: "cover";
  playIconUrl?: string;
  autoplay?: boolean;
  playbackId?: string;
  forcePause?: boolean;
  playInFullScreen?: boolean;
  setIsLoaded?: (val: boolean) => void;
}

const MediaCard: React.FC<Props> = ({
  media,
  thumbnail,
  maxHeight,
  notPlayable,
  setIsPaused,
  mediaFit,
  fluid,
  roundedStr,
  fluidResizeMode,
  playIconUrl,
  autoplay,
  playbackId,
  forcePause,
  playInFullScreen,
  setIsLoaded,
}) => {
  const [paused, setPaused] = useState<boolean>(true);
  const [showPoster, setShowPoster] = useState<boolean>(true);
  const [viewWidth, setViewWidth] = useState<number>(0);
  const targetRef = useRef<Video | null>(null);

  const handlePlaybackStatus = (status: AVPlaybackStatusSuccess) => {
    setPaused(!status.isPlaying);
    if (setIsPaused) {
      setIsPaused(!status.isPlaying);
    }
  };

  const hadleExitFullScreen = async () => {
    if (playInFullScreen) {
      await targetRef.current?.dismissFullscreenPlayer();
    }
  };

  return (
    <View
      className={clsx(
        fluid && "w-full h-full",
        "flex justify-center items-center overflow-hidden"
      )}
      onLayout={(event: LayoutChangeEvent) =>
        setViewWidth(event.nativeEvent.layout.width)
      }
    >
      <View
        className={clsx(fluid ? "w-full h-full" : "relative")}
        style={{ elevation: 0, zIndex: 0 }}
      >
        <MediaTile
          autoplay={autoplay}
          media={media}
          targetRef={targetRef}
          mediaWidth={viewWidth}
          maxHeight={maxHeight}
          handlePlaybackStatus={handlePlaybackStatus}
          mediaFit={mediaFit}
          fluid={fluid}
          poster={thumbnail}
          forcePause={forcePause}
          roundedStr={roundedStr}
          fluidResizeMode={fluidResizeMode}
          playbackId={playbackId}
          setIsLoaded={setIsLoaded}
          hadleExitFullScreen={hadleExitFullScreen}
        />
        {media?.resource_type === "video" && paused && !autoplay ? (
          <>
            {thumbnail && showPoster ? (
              <View
                className="absolute left-0 right-0 top-0 bottom-0"
                style={{ elevation: 5, zIndex: 5 }}
              >
                <MediaTile
                  media={thumbnail}
                  fluid={true}
                  fluidResizeMode="cover"
                />
              </View>
            ) : null}
            <View
              className={clsx(
                "absolute left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center",
                roundedStr
              )}
              style={{ elevation: 10, zIndex: 10 }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!notPlayable) {
                    if (playInFullScreen) {
                      targetRef.current?.presentFullscreenPlayer();
                    }
                    targetRef.current?.playAsync();
                    setShowPoster(false);
                  }
                }}
              >
                <Image
                  source={{
                    uri: playIconUrl ? playIconUrl : playIcon,
                  }}
                  className="w-10 iphoneX:w-12 h-10 iphoneX:h-12"
                />
              </TouchableWithoutFeedback>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default MediaCard;
