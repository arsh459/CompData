import { playIcon, socialboatLogo } from "@constants/imageKitURL";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { getHeight } from "@utils/media/mediaDimensions";
import { getURLToFetch } from "@utils/media/mediaURL";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useEffect, useRef } from "react";
import {
  Image,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { RecordingStateType, VideoStateType } from ".";

interface Props {
  // videoRef: RefObject<Video>;
  selectedMedia?: CloudinaryMedia | AWSMedia;
  recordingState: RecordingStateType;
  videoState: VideoStateType;
  setVideoState: (val: VideoStateType) => void;
  onStart: () => void;
  onPause: () => void;
}

const TaskStream: React.FC<Props> = ({
  // videoRef,
  selectedMedia,
  recordingState,
  videoState,
  setVideoState,
  onStart,
  onPause,
}) => {
  const videoRef = useRef<Video>(null);
  const { width } = useWindowDimensions();
  const height = selectedMedia ? getHeight(selectedMedia, width) : width;
  const uri: string = selectedMedia
    ? getURLToFetch(selectedMedia, width, height)
    : socialboatLogo;

  useEffect(() => {
    if (videoRef && videoRef.current) {
      if (recordingState === "recording") {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [recordingState]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setVideoState("ended");
    }
  };

  return (
    <View className="w-full h-full relative">
      <Video
        source={{ uri }}
        resizeMode={"cover" as ResizeMode}
        className="w-full h-full"
        ref={videoRef}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onTouchEndCapture={onPause}
      />
      {videoState === "init" ? (
        <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center">
          <TouchableWithoutFeedback onPress={onStart}>
            <Image
              source={{
                uri: playIcon,
              }}
              className="w-12 iphoneX:w-16 h-12 iphoneX:h-16"
            />
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </View>
  );
};

export default TaskStream;
