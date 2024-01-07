import { baseImageKit, socialboatLogo } from "@constants/imageKitURL";
import { streamingStateTypes } from "@hooks/permissions/useRTCCam";
import { saveError } from "@models/Error/createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getWidthHeightMedia } from "@utils/media/mediaDimensions";
import { getURLToFetch } from "@utils/media/mediaURL";
import Video, {
  OnLoadData,
  OnProgressData,
  OnSeekData,
} from "react-native-video";
import { useState, useRef } from "react";

import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Loading from "@components/loading/Loading";

interface Props {
  selectedMedia?: CloudinaryMedia | AWSMedia;
  streamingState: streamingStateTypes;
  playbackId?: string;
  orientation?: "landscape" | "portrait";
  onInit: () => void;
  onProgressUpdate: (newValue: number, storeVal: number) => Promise<void>;
  onVideoFinish: () => void;
  videoIntroDur?: number;
  videoThumbnail?: CloudinaryMedia | AWSMedia;
  progress?: number;
  fpProgress?: number;
}

export type videoStatus =
  | "LOADING"
  | "ERRORED"
  | "PAUSED"
  | "PLAYING"
  | "ENDED";

const saveInt: number = 15;

const TaskStreamV4: React.FC<Props> = ({
  selectedMedia,
  playbackId,
  streamingState,
  orientation,
  onInit,
  onProgressUpdate,
  onVideoFinish,
  videoIntroDur,
  videoThumbnail,
  progress,
  fpProgress,
}) => {
  const videoRef = useRef<Video>(null);
  // const storeVal = useRef<number>(0);
  // const durationSec = useRef<number>(0);
  const positionData = useRef<{
    totalSec: number;
    storeVal: number;
    currentVal: number;
  }>({ totalSec: 0, currentVal: 0, storeVal: 0 });
  const dims = useWindowDimensions();
  const { state } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [skipIntroVisible, setSkipIntro] = useState<boolean>(false);
  // const [durationSec, setDurationSec] = useState<number>(0);
  // const [positionSec, setPositionSec] = useState<number>(0);

  const { width, height } = getWidthHeightMedia(
    dims.width,
    dims.height,
    selectedMedia,
    orientation
  );

  const uri: string = playbackId
    ? `https://stream.mux.com/${playbackId}.m3u8`
    : selectedMedia
    ? getURLToFetch(selectedMedia, width, height)
    : socialboatLogo;

  const handleLoad = (data: OnLoadData) => {
    const durationSec = data.duration;
    positionData.current.totalSec = durationSec;
    // setDurationSec(durationSec);

    // handle re do task
    if (progress && progress < 1 && videoRef.current) {
      positionData.current.currentVal = durationSec * progress;

      videoRef.current.seek(durationSec * progress);
    }
    setTimeout(onInit, progress ? 500 : 0);

    if (fpProgress) {
      const stSeconds = Math.round(fpProgress * durationSec);
      positionData.current.storeVal = stSeconds;
    }
  };

  const handleProgress = (progress: OnProgressData) => {
    const currentTimeSec = progress.currentTime;
    // setPositionSec(currentTimeSec);

    positionData.current.currentVal = currentTimeSec;

    // update store value
    positionData.current.storeVal++;

    const durationSec = positionData.current.totalSec;

    if (Math.floor(currentTimeSec) % saveInt === 0 && durationSec) {
      const progress = currentTimeSec / durationSec;
      const storeProgress = positionData.current.storeVal / durationSec;
      // Code here for storing task progress
      onProgressUpdate(progress, storeProgress);
    }

    if (videoIntroDur && videoIntroDur > currentTimeSec) {
      setSkipIntro(true);
    } else {
      setSkipIntro(false);
    }
  };

  const onSeek = (data: OnSeekData) => {
    const durationSec = positionData.current.totalSec;
    // update
    if (durationSec && streamingState !== "init") {
      const prog = data.currentTime / durationSec;
      const storeProgress = positionData.current.storeVal / durationSec;

      onProgressUpdate(prog, storeProgress);
      // update prog
    }
  };

  const onEndVideo = () => {
    onVideoFinish();
    // update prog
    const durationSec = positionData.current.totalSec;
    const storeProgress = positionData.current.storeVal / durationSec;

    onProgressUpdate(1, storeProgress);
  };

  const handleSkipIntro = () => {
    if (videoRef && videoRef.current && videoIntroDur) {
      videoRef.current.seek(videoIntroDur);
    }
  };

  return (
    <View
      className="flex  black justify-center items-center relative"
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      <View className="w-full h-full ">
        <Video
          source={{ uri }}
          style={{
            zIndex: 0,
            position: "absolute",
            top: orientation === "portrait" ? 80 : 0,
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
          onSeek={onSeek}
          ref={videoRef}
          resizeMode="contain"
          controls={true}
          onLoad={handleLoad}
          paused={!(streamingState === "play")}
          onProgress={handleProgress}
          onEnd={onEndVideo}
        />

        {error ? (
          <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center">
            <Text className="text-white">There was an error</Text>
            <Text className="text-white text-sm">{error}</Text>
          </View>
        ) : streamingState === "init" ? (
          <View className="absolute left-0 right-0 top-0 bottom-0 bg-black/50 flex justify-center items-center">
            <Loading width="w-16" height="h-16" />
          </View>
        ) : skipIntroVisible ? (
          <View className="absolute left-4 bottom-4 bg-slate-100 rounded-lg">
            <TouchableOpacity onPress={handleSkipIntro}>
              <Text className="font-bold text-base iphoneX:text-xl px-4 py-2">
                Skip Intro
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default TaskStreamV4;
