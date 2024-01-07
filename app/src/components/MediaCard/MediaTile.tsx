import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { useWindowDimensions, View } from "react-native";
import {
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
  VideoFullscreenUpdate,
} from "expo-av";
import { getURLToFetch } from "@utils/media/mediaURL";
import { getHeight, getWidth } from "@utils/media/mediaDimensions";
import { baseImageKit, sbLogoAbsolute } from "@constants/imageKitURL";
import { MutableRefObject, useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import clsx from "clsx";
import VideoElement from "./VideoElement";

interface Props {
  media?: CloudinaryMedia | AWSMedia;

  targetRef?: MutableRefObject<Video | null>;
  handlePlaybackStatus?: (val: AVPlaybackStatusSuccess) => void;
  paused?: boolean;
  mediaWidth?: number;
  maxHeight?: number;
  placeholderWidth?: number;
  placeholderHeight?: number;
  mediaFit?: "contain";
  fluid?: boolean;
  roundedStr?: string;
  fluidResizeMode?: "cover";
  shouldPlay?: boolean;
  isMuted?: boolean;
  poster?: CloudinaryMedia | AWSMedia;
  autoplay?: boolean;
  playbackId?: string;
  forcePause?: boolean;
  setIsLoaded?: (val: boolean) => void;
  hadleExitFullScreen?: () => void;
}

const MediaTile: React.FC<Props> = ({
  media,
  targetRef,
  handlePlaybackStatus,
  paused,
  mediaWidth,
  maxHeight,
  mediaFit,
  fluid,
  roundedStr,
  fluidResizeMode,
  shouldPlay,
  isMuted,
  poster,
  forcePause,
  autoplay,
  playbackId,
  setIsLoaded,
  placeholderWidth,
  placeholderHeight,
  hadleExitFullScreen,
}) => {
  const [isLoadDone, setIsLoadDone] = useState<boolean>(false);
  const { width: windowWidth } = useWindowDimensions();
  const widthForMaxHeight =
    media && maxHeight ? getWidth(media, maxHeight) : maxHeight;
  const width =
    widthForMaxHeight &&
    (widthForMaxHeight < windowWidth || mediaFit !== "contain")
      ? widthForMaxHeight
      : mediaWidth
      ? mediaWidth
      : windowWidth;
  const height = media ? getHeight(media, width) : width;

  const uri: string = playbackId
    ? `https://stream.mux.com/${playbackId}.m3u8`
    : media
    ? getURLToFetch(media, width, height)
    : `${baseImageKit}/tr:w-${placeholderWidth ? placeholderWidth : "400"},h-${
        placeholderHeight ? placeholderHeight : "400"
      },c-maintain_ratio/${sbLogoAbsolute}`;
  const uriPlaceholder: string =
    media && media.resource_type === "image"
      ? getURLToFetch(media, 50, getHeight(media, 50))
      : poster
      ? getURLToFetch(poster, 50, getHeight(poster, 50))
      : "";

  useEffect(() => {
    setIsLoaded && setIsLoaded(isLoadDone);
  }, [isLoadDone, setIsLoaded]);

  return (
    <View
      style={{
        position: "relative",
        width: fluid ? "100%" : width,
        height: fluid ? "100%" : height,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
        className={clsx(isLoadDone ? "opacity-100" : "opacity-0")}
      >
        {media?.resource_type === "video" && autoplay ? (
          <VideoElement
            uri={uri}
            forcePause={forcePause}
            poster={
              poster
                ? getURLToFetch(poster, 200, getHeight(poster, 200))
                : undefined
            }
            onLoad={() => setIsLoadDone(true)}
            fluidResizeMode={fluidResizeMode ? fluidResizeMode : "contain"}
          />
        ) : media?.resource_type === "video" ? (
          <Video
            source={{ uri }}
            style={{
              width: "100%",
              height: "100%",
            }}
            useNativeControls={!paused}
            isLooping={true}
            onError={(e) => console.log(e)}
            ref={targetRef}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded && handlePlaybackStatus) {
                handlePlaybackStatus(status);
              }
            }}
            resizeMode={
              (fluidResizeMode ? fluidResizeMode : "contain") as ResizeMode
            }
            shouldPlay={shouldPlay}
            isMuted={isMuted}
            posterSource={
              poster ? { uri: getURLToFetch(poster, width, height) } : undefined
            }
            posterStyle={{
              width: "100%",
              height: "100%",
              resizeMode: fluidResizeMode ? fluidResizeMode : "contain",
            }}
            usePoster={poster ? true : false}
            onLoad={() => setIsLoadDone(true)}
            className={roundedStr}
            onFullscreenUpdate={(e) => {
              if (
                e.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS
              ) {
                hadleExitFullScreen && hadleExitFullScreen();
              }
            }}
          />
        ) : (
          <FastImage
            source={{ uri }}
            style={{
              width: "100%",
              height: "100%",
            }}
            className={clsx(roundedStr)}
            resizeMode={
              media && media.resource_type === "image" && fluidResizeMode
                ? fluidResizeMode
                : "contain"
            }
            onLoad={() => setIsLoadDone(true)}
          />
        )}
      </View>

      <FastImage
        source={{ uri: uriPlaceholder }}
        className={clsx(
          roundedStr,
          isLoadDone && "hidden",
          "absolute left-0 right-0 top-0 bottom-0 z-10"
        )}
        resizeMode={
          media && media.resource_type === "image" && fluidResizeMode
            ? fluidResizeMode
            : "contain"
        }
      />
    </View>
  );
};

export default MediaTile;
