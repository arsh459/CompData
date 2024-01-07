import { playIcon, socialboatLogo } from "@constants/imageKitURL";
import { saveError } from "@models/Error/createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getWidthHeightMedia } from "@utils/media/mediaDimensions";
import { getURLToFetch } from "@utils/media/mediaURL";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { useRef } from "react";
import {
  Image,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { VideoStateType } from ".";

interface Props {
  // videoRef: RefObject<Video>;
  selectedMedia?: CloudinaryMedia | AWSMedia;
  recordingState: "ended" | "recording";
  videoState: VideoStateType;
  orientation?: "landscape" | "portrait";
  //   setVideoState: (val: VideoStateType) => void;
  onStart: () => void;
  onEnd: () => void;
  onVideoFinish: () => void;
}

const TaskStreamV2: React.FC<Props> = ({
  // videoRef,
  selectedMedia,
  recordingState,
  videoState,
  orientation,
  //   setVideoState,
  onStart,
  onEnd,
  onVideoFinish,
}) => {
  const videoRef = useRef<Video>(null);
  const dims = useWindowDimensions();
  const { state } = useAuthContext();
  const [error, setError] = useState<string>("");

  const { width, height } = getWidthHeightMedia(
    dims.width,
    dims.height,
    selectedMedia,
    orientation
  );
  // const heightD = selectedMedia ? getHeight(selectedMedia, width) : width;
  const uri: string = selectedMedia
    ? getURLToFetch(selectedMedia, width, height)
    : socialboatLogo;

  // useEffect(() => {
  //   if (videoRef && videoRef.current) {
  //     if (recordingState === "recording") {
  //       videoRef.current.playAsync();
  //     } else {
  //       videoRef.current.pauseAsync();
  //     }
  //   }
  // }, [recordingState]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded && status.error) {
      setError(status.error);
      saveError(state.uid, status.error, "VideoPlayback", "TaskSubmitV2");
    }

    if (status.isLoaded && status.didJustFinish) {
      onVideoFinish();
    }
  };

  return (
    <View className="w-full h-full relative  ">
      <Video
        source={{ uri }}
        resizeMode={"contain" as ResizeMode}
        className="w-full h-full"
        ref={videoRef}
        shouldPlay={recordingState === "recording"}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onTouchEndCapture={onEnd}
        onError={(e) =>
          saveError(state.uid, e, "VideoPlayback", "TaskSubmitV2")
        }
      />
      {error ? (
        <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center">
          <Text className="text-white">There was an error</Text>
          <Text className="text-white text-sm">{error}</Text>
        </View>
      ) : videoState === "init" ? (
        <TouchableWithoutFeedback onPress={onStart}>
          <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center">
            <Image
              source={{
                uri: playIcon,
              }}
              className="w-12 iphoneX:w-16 h-12 iphoneX:h-16"
            />
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};

export default TaskStreamV2;
