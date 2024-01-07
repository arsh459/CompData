import {
  //   RecordingStateType,
  VideoStateType,
} from "@modules/Workout/ProgramDetails/TaskSubmit";
import { useEffect, useRef, useState } from "react";
import { Camera, VideoCodec } from "expo-camera";
import { useIsForeground } from "@hooks/utils/useIsForeground";
import { saveError } from "@models/Error/createUtils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { updatePause, updatePlay } from "@utils/cast/utils";
import crashlytics from "@react-native-firebase/crashlytics";

// import { Platform } from "react-native";

export const useExpoCamera = (
  setShowWarning: (newState: boolean) => void,
  castId?: string
) => {
  const { state } = useAuthContext();
  const cameraRef = useRef<Camera>(null);

  //   const [warning, setShowWarning] = useState<boolean>(false);
  const [videoState, setVideoState] = useState<VideoStateType>("init");
  const [videoAdded, setVideoAdded] = useState<boolean>(false);
  const [videoFiles, setVideoFiles] = useState<{ uri: string }[]>([]);
  const [recordingState, setRecordingState] = useState<"ended" | "recording">(
    "ended"
  );

  const startRecording = async () => {
    // if (recordingState === "ended") {
    if (cameraRef && cameraRef.current) {
      try {
        setVideoAdded(false);
        cameraRef.current
          .recordAsync({
            mute: true,
            quality: "480p",
            codec: VideoCodec.H264,
            // codec: 'avc1',
            // ...(Platform.OS === "ios" ? { codec: VideoCodec.HEVC } : {}),
          })
          .then((res) => {
            setVideoFiles((p) => [...p, res]);
            setVideoAdded(true);
          })
          .catch(async (error) => {
            console.log("error in start", error);
            saveError(
              state.uid,
              error,
              "startRecording callback",
              "TaskSubmitV2"
            );
            setVideoAdded(true);
          });

        // saveError(
        //   state.uid,
        //   "error test",
        //   "startRecording callback",
        //   "TaskSubmitV2"
        // );

        setRecordingState("recording");
        setVideoState("started");
        setShowWarning(false);
        castId && updatePlay(castId);
      } catch (error: any) {
        console.log("error in starting video", error);
        crashlytics().recordError(error);
      }
    }

    // }
  };

  const stopRecording = async () => {
    if (cameraRef && cameraRef.current) {
      try {
        cameraRef.current.stopRecording();

        setShowWarning(true);
        setRecordingState("ended");
        castId && updatePause(castId);
      } catch (error: any) {
        crashlytics().recordError(error);
      }
    }
    // }
  };

  const endRecording = async () => {
    // if (recordingState !== "ended") {
    if (cameraRef && cameraRef.current) {
      try {
        cameraRef.current.stopRecording();

        setRecordingState("ended");
        castId && updatePause(castId);
      } catch (error: any) {
        console.log("error in end", error);
        crashlytics().recordError(error);
      }
    }
    // }
  };

  const { appStateVisible } = useIsForeground();

  useEffect(() => {
    if (appStateVisible === "background" || appStateVisible === "inactive") {
      setShowWarning(true);
      setRecordingState("ended");

      // pause cast if present
      castId && updatePause(castId);
    }
  }, [appStateVisible, castId]);

  return {
    startRecording,
    // pauseRecording,
    setShowWarning,
    recordingState,
    setRecordingState,
    // warning,
    videoFiles,
    videoState,
    setVideoState,
    cameraRef,
    videoAdded,
    // resumeRecording,
    endRecording,
    stopRecording,
  };
};
