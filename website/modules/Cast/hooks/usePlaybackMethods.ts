import { taskState } from "@models/Cast/Cast";
import { useEffect, useRef, useState } from "react";
import { useTaskStream } from "./useTaskStream";

const saveInt = 15;

export const usePlaybackMethods = (
  userUID?: string,
  activityId?: string,
  taskState?: taskState,
  taskId?: string
) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<NodeJS.Timer>();
  const positionData = useRef<{
    totalSec: number;
    storeVal: number;
    currentVal: number;
  }>({ totalSec: 0, currentVal: 0, storeVal: 0 });
  const { onUpdateProgress, selectedActivity, checked, fpProgress, taskFP } =
    useTaskStream(userUID, activityId, true, taskId);

  const onProgress = () => {
    // console.log("on progress");
    const currentTime = videoRef.current?.currentTime;

    if (currentTime) {
      // update store value

      positionData.current.currentVal = currentTime;
      const durationSec = positionData.current.totalSec;

      if (Math.floor(currentTime) % saveInt === 0 && durationSec) {
        const progress = currentTime / durationSec;
        const storeProgress = positionData.current.storeVal / durationSec;
        // Code here for storing task progress
        onUpdateProgress(progress, storeProgress);
        // console.log({ progress, action: "general" });
      }
    }
  };

  const onEnded = () => {
    // console.log("on ENDED");
    const durationSec = positionData.current.totalSec;
    const storeProgress = positionData.current.storeVal / durationSec;

    onUpdateProgress(1, storeProgress);
  };

  const onLoad = () => {
    // console.log("on load");
    const videoDuration = videoRef.current?.duration;
    // console.log("videoDuration", videoDuration);
    // console.log("selectedActivity?.progress", selectedActivity?.progress);
    if (videoDuration) {
      positionData.current.totalSec = videoDuration;

      if (selectedActivity?.progress && selectedActivity.progress < 1) {
        positionData.current.currentVal =
          selectedActivity?.progress * videoDuration;

        // console.log(
        //   "selectedActivity?.progress * videoDuration",
        //   selectedActivity?.progress * videoDuration
        // );

        // seek to video
        if (videoRef.current?.currentTime) {
          videoRef.current.currentTime =
            selectedActivity?.progress * videoDuration;
        }
      }

      // save fp
      if (selectedActivity?.fpProgress) {
        const stSeconds = Math.round(
          selectedActivity?.fpProgress * videoDuration
        );

        positionData.current.storeVal = stSeconds;
      }
    }
  };

  const onSeek = () => {
    console.log("on seek");
    const currentTime = videoRef.current?.currentTime;
    const durationSec = positionData.current.totalSec;

    if (durationSec) {
      const progress = (currentTime ? currentTime : 0) / durationSec;
      const storeProgress = positionData.current.storeVal / durationSec;
      onUpdateProgress(progress, storeProgress);
    }
  };

  const [initDone, setInitDone] = useState<boolean>(false);
  useEffect(() => {
    if (videoRef.current && taskState) {
      if (taskState === "play") {
        if (positionData.current.currentVal && !initDone) {
          videoRef.current.currentTime = positionData.current.currentVal;
          // console.log("hi");
          videoRef.current.play();
          // console.log("init playing");
          setInitDone(true);
        } else {
          var isPlaying =
            videoRef.current.currentTime > 0 &&
            !videoRef.current.paused &&
            !videoRef.current.ended &&
            videoRef.current.readyState > videoRef.current.HAVE_CURRENT_DATA;

          if (!isPlaying) {
            videoRef.current.play();
          }
        }
        // videoRef.current.play();
      } else {
        // console.log("pausing");
        videoRef.current.pause();
      }
    }
  }, [taskState, initDone]);

  return {
    onSeek,
    onEnded,
    onLoad,
    onProgress,
    intervalRef,
    videoRef,
    onUpdateProgress,
    selectedActivity,
    checked,
    positionData,
    fpProgress,
    taskFP,
  };
};
