// import MediaTile from "@components/MediaCard/MediaTile";
import { baseImageKit, playIcon, socialboatLogo } from "@constants/imageKitURL";
import { streamingStateTypes } from "@hooks/permissions/useRTCCam";
import { saveError } from "@models/Error/createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getWidthHeightMedia } from "@utils/media/mediaDimensions";
import { getURLToFetch } from "@utils/media/mediaURL";
// import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import Video, { OnProgressData } from "react-native-video";
import { useState, useRef } from "react";

import {
  Image,
  // Platform,
  useWindowDimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  // Pressable,
} from "react-native";

interface Props {
  selectedMedia?: CloudinaryMedia | AWSMedia;
  streamingState: streamingStateTypes;
  playbackId?: string;
  orientation?: "landscape" | "portrait";
  onInit: () => void;
  onEnd: () => void;
  onVideoFinish: () => void;
  videoIntroDur?: number;
  videoThumbnail?: CloudinaryMedia | AWSMedia;
}

export type videoStatus =
  | "LOADING"
  | "ERRORED"
  | "PAUSED"
  | "PLAYING"
  | "ENDED";

const TaskStreamV3: React.FC<Props> = ({
  selectedMedia,
  playbackId,
  streamingState,
  orientation,
  onInit,
  onEnd,
  onVideoFinish,
  videoIntroDur,
  videoThumbnail,
}) => {
  const videoRef = useRef<Video>(null);
  const dims = useWindowDimensions();
  const { state } = useAuthContext();
  // const [hasPlayed, setPlayed] = useState<boolean>(false);
  // const [videoState, setVideoState] = useState<videoStatus>("LOADING");
  const [error, setError] = useState<string>("");
  const [positionMillis, setPositionMillis] = useState<number>(0);

  const { width, height } = getWidthHeightMedia(
    dims.width,
    dims.height,
    selectedMedia,
    orientation
  );

  const onPlayButton = () => {
    onInit();
    // setPlayed(true);
  };

  const uri: string = playbackId
    ? `https://stream.mux.com/${playbackId}.m3u8`
    : selectedMedia
    ? getURLToFetch(selectedMedia, width, height)
    : socialboatLogo;

  const handlePlaybackStatusUpdate = (progress: OnProgressData) =>
    // status: AVPlaybackStatus
    {
      // if (!status.isLoaded && status.error) {
      //   setError(status.error);
      //   saveError(state.uid, status.error, "VideoPlayback", "TaskSubmitV2");
      // }
      // if (status.isLoaded && status.didJustFinish) {
      //   onVideoFinish();
      // }
      // if (status.isLoaded) {
      setPositionMillis(progress.currentTime * 1000);
      // }
    };

  const handleSkipIntro = () => {
    if (videoRef && videoRef.current && videoIntroDur) {
      videoRef.current.seek(videoIntroDur);

      // playFromPositionAsync(videoIntroDur * 1000);
    }
  };

  const onPress = () => {
    if (streamingState === "init") {
      onInit();
    } else {
      onEnd();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      className="flex black justify-center items-center relative"
      style={{ zIndex: 20, width: "100%", height: "100%", overflow: "hidden" }}
    >
      <View className="w-full h-full">
        <Video
          source={{ uri }}
          style={{
            zIndex: 0,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
          }}
          progressUpdateInterval={1000}
          ignoreSilentSwitch="ignore"
          poster={`${baseImageKit}/${videoThumbnail?.path}`}
          onError={(e) => {
            console.log(e);
            setError(e.error.errorString);
            saveError(state.uid, e, "VideoPlayback", "TaskSubmitV2");
          }}
          ref={videoRef}
          resizeMode="contain"
          controls={true}
          // useTextureView={false}
          paused={!(streamingState === "play")}
          onProgress={handlePlaybackStatusUpdate}
          onEnd={onVideoFinish}
          // onReadyForDisplay={() => {
          //   setVideoState("PLAYING");
          // }}
        />

        {error ? (
          <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center">
            <Text className="text-white">There was an error</Text>
            <Text className="text-white text-sm">{error}</Text>
          </View>
        ) : streamingState === "init" ? (
          <TouchableWithoutFeedback onPress={onPlayButton}>
            <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center">
              <Image
                source={{
                  uri: playIcon,
                }}
                style={{ zIndex: 50 }}
                className="w-12 iphoneX:w-16 h-12 iphoneX:h-16"
              />
            </View>
          </TouchableWithoutFeedback>
        ) : videoIntroDur && positionMillis / 1000 < videoIntroDur ? (
          <View className="absolute left-4 bottom-4 bg-slate-100 rounded-lg">
            <TouchableOpacity onPress={handleSkipIntro}>
              <Text className="font-bold text-base iphoneX:text-xl px-4 py-2">
                Skip Intro
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TaskStreamV3;
