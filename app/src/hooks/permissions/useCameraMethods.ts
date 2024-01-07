import { useIsForeground } from "@hooks/utils/useIsForeground";
import {
  RecordingStateType,
  VideoStateType,
} from "@modules/Workout/ProgramDetails/TaskSubmit";
import { useEffect, useState } from "react";
// import { Camera, VideoFile } from "react-native-vision-camera";

export const useCameraMethods = () => {
  // const cameraRef = useRef<Camera>(null);
  const [warning, setShowWarning] = useState<boolean>(false);
  // const [videoFiles, setVideoFile] = useState<VideoFile[]>([]);
  const [videoState, setVideoState] = useState<VideoStateType>("init");

  const { appStateVisible } = useIsForeground();

  const [recordingState, setRecordingState] =
    useState<RecordingStateType>("ended");

  const startRecording = () => {
    // if (recordingState === "ended") {
    // if (cameraRef && cameraRef.current) {
    //   try {
    //     cameraRef.current.startRecording({
    //       flash: "off",
    //       onRecordingFinished: (video: VideoFile) => {
    //         setVideoFile((prev) => [...prev, video]);
    //       },
    //       onRecordingError: (e: any) => {
    //       },
    //       fileType: "mp4",
    //     });
    //     setRecordingState("recording");
    //     setVideoState("started");
    //   } catch (error: any) {
    //   }
    // }
    // }
  };

  const pauseRecording = async () => {
    // if (cameraRef && cameraRef.current) {
    //   try {
    //     await cameraRef.current.pauseRecording();
    //     setShowWarning(true);
    //     setRecordingState("paused");
    //   } catch (error: any) {
    //     console.log("error in pause", error);
    //   }
    // }
    // }
  };

  const stopRecording = async () => {
    // if (recordingState !== "ended") {
    // if (cameraRef && cameraRef.current) {
    //   try {
    //     await cameraRef.current.stopRecording();
    //     setRecordingState("ended");
    //     setShowWarning(true);
    //   } catch (error: any) {
    //     console.log("error in stop", error);
    //   }
    // }
    // }
  };

  const endRecording = async () => {
    // if (recordingState !== "ended") {
    // if (cameraRef && cameraRef.current) {
    //   try {
    //     await cameraRef.current.stopRecording();
    //     setRecordingState("ended");
    //   } catch (error: any) {
    //     console.log("error in end", error);
    //   }
    // }
    // }
  };

  const resumeRecording = async () => {
    // if (recordingState === "paused") {
    //   if (cameraRef && cameraRef.current) {
    //     try {
    //       await cameraRef.current.resumeRecording();
    //       setRecordingState("recording");
    //       setShowWarning(false);
    //     } catch (error: any) {
    //       console.log("error in resume, trying to pause", error);
    //     }
    //   }
    // } else if (recordingState === "ended") {
    //   if (cameraRef && cameraRef.current) {
    //     try {
    //       cameraRef.current.startRecording({
    //         flash: "off",
    //         onRecordingFinished: (video: VideoFile) => {
    //           setVideoFile((prev) => [...prev, video]);
    //         },
    //         onRecordingError: () => {},
    //         fileType: "mp4",
    //       });
    //       setRecordingState("recording");
    //       setShowWarning(false);
    //     } catch (error: any) {
    //       console.log("error in resume trying to start new", error);
    //     }
    //   }
    // }
  };

  useEffect(() => {
    // if app goes to background
    if (appStateVisible === "background") {
      stopRecording();
    } else if (appStateVisible === "inactive") {
      //   pauseRecording();
      stopRecording();
    }
  }, [appStateVisible, pauseRecording, stopRecording]);

  return {
    startRecording,
    pauseRecording,
    setShowWarning,
    recordingState,
    setRecordingState,
    warning,
    // videoFiles,
    videoState,
    setVideoState,
    // cameraRef,
    resumeRecording,
    endRecording,
    stopRecording,
  };
};
