// import RNVideo from "react-native-video";
import { useIsFocused } from "@react-navigation/native";
// import { Platform, View } from "react-native";
// import clsx from "clsx";
import { ResizeMode, Video } from "expo-av";

interface Props {
  uri: string;
  poster?: string;
  fluidResizeMode: "contain" | "cover";
  onLoad: () => void;
  forcePause?: boolean;
}

const VideoElement: React.FC<Props> = ({
  uri,
  poster,
  fluidResizeMode,
  onLoad,
  forcePause,
}) => {
  const isFocus = useIsFocused();

  return (
    <Video
      source={{ uri }}
      style={{
        width: "100%",
        height: "100%",
      }}
      isMuted={false}
      useNativeControls={true}
      shouldPlay={isFocus && !forcePause}
      resizeMode={"contain" as ResizeMode}
      posterSource={{ uri: poster }}
      posterStyle={{ resizeMode: fluidResizeMode }}
      onLoad={onLoad}
    />
  );
  // return (
  //   <RNVideo
  //     source={{ uri }}
  //     style={{
  //       width: "100%",
  //       height: "100%",
  //     }}
  //     muted={false}
  //     controls={true}
  //     paused={!isFocus || forcePause}
  //     resizeMode="contain"
  //     poster={poster}
  //     posterResizeMode={fluidResizeMode}
  //     onLoad={onLoad}
  //   />
  // );
};

export default VideoElement;
