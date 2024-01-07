// import { useIsFocused } from "@react-navigation/native";
// import { Platform, View } from "react-native";
import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";
import { MutableRefObject } from "react";
// import clsx from "clsx";

interface Props {
  uri: string;
  poster?: string;
  //   uriPlaceholder?: string;
  fluidResizeMode: "contain" | "cover";
  onLoad: () => void;
  isMuted?: boolean;
  forcePause?: boolean;
  shouldPlay?: boolean;
  targetRef?: MutableRefObject<Video | null>;
  roundedStr?: string;
  handlePlaybackStatus?: (val: AVPlaybackStatusSuccess) => void;
}

const ExpoVideoElement: React.FC<Props> = ({
  uri,
  poster,
  isMuted,
  fluidResizeMode,
  shouldPlay,
  onLoad,
  forcePause,
  //   uriPlaceholder,

  roundedStr,
  targetRef,
  handlePlaybackStatus,
}) => {
  // }

  return (
    <Video
      source={{ uri }}
      style={{
        width: "100%",
        height: "100%",
      }}
      useNativeControls={true}
      isLooping={true}
      ref={targetRef}
      onPlaybackStatusUpdate={(status) => {
        if (status.isLoaded && handlePlaybackStatus) {
          handlePlaybackStatus(status);
        }
      }}
      resizeMode={(fluidResizeMode ? fluidResizeMode : "contain") as ResizeMode}
      shouldPlay={shouldPlay}
      isMuted={isMuted}
      posterSource={poster ? { uri: poster } : undefined}
      posterStyle={{
        width: "100%",
        height: "100%",
        resizeMode: fluidResizeMode ? fluidResizeMode : "contain",
      }}
      usePoster={poster ? true : false}
      onLoad={onLoad}
      className={roundedStr}
    />
  );
};

export default ExpoVideoElement;
