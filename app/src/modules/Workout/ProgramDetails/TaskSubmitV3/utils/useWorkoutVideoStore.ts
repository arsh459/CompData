import { streamingStateTypes } from "@hooks/permissions/useRTCCam";
import { create } from "zustand";
import { ContentModalStateType, positionInterfase } from "./interface";
import { SubTask, Task } from "@models/Tasks/Task";
import { GREESHA_PCOS, aiToggleStatus } from "..";
import { Activity } from "@models/Activity/Activity";
import * as Sentry from "@sentry/react-native";
// import firestore from "@react-native-firebase/firestore";
import {
  calculateFPFromProgress,
  getActivityForTask,
} from "@providers/task/hooks/useTaskStream";
import {
  createVideoPost,
  saveNewPostWithActivityWithTaskParamsV3,
} from "@utils/post/createUtils";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import Video, {
  LoadError,
  OnBufferData,
  OnLoadData,
  OnProgressData,
  OnSeekData,
} from "react-native-video";
import { RefObject } from "react";
import { getVideoURI, onUpdateProgressFunc } from "./videoUtils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { eventObj } from ".";

const savingInterval = 15;
export type resolutionType = "720p" | "full";

interface WorkoutVideoStore {
  uid: string;
  attemptedDate: string;

  task?: Task;
  loadingState?: "none" | "buffer";
  onInit: (newTask: Task, uid: string, attemptedDate: string) => Promise<void>;

  onBuffer: (data: OnBufferData) => void;
  handleLoad: (data: OnLoadData, videoRef: RefObject<Video>) => void;
  handleSeek: (data: OnSeekData) => void;
  onSeek: (seekToTime: number, videoRef: React.RefObject<Video>) => void;
  onRewindForward: (
    videoRef: React.RefObject<Video>,
    action: "rewind" | "forward"
  ) => void;
  handleProgressUpdate: (progress: OnProgressData) => void;
  onEndVideo: () => void;

  selectedActivity?: Activity;

  aiToggle: aiToggleStatus;
  setAIToggle: (newState: aiToggleStatus) => void;

  error: string;
  videoReady: "none" | "ready" | "error";
  retryState: "none" | "unmount";
  onError: (newError: LoadError) => void;

  streamingState: streamingStateTypes;
  onStartStreaming: () => void;
  onStopStreaming: () => void;
  contentModalState: ContentModalStateType;
  setContentModalState: (val: ContentModalStateType) => void;
  onBackRequest: () => void;
  onResume: () => void;
  onQuit: () => void;
  onFinish: () => void;
  onRetry: () => void;
  onReady: () => void;

  skipIntroVisible: boolean;
  handleSkipIntro: () => void;

  tone: "light" | "dark";
  seekDelay: boolean;
  finalOrientation?: "landscape" | "portrait";
  uri: string;
  max_resolution: resolutionType;
  requestResolutionChange: () => void;
  toggleResolution: (newResType: resolutionType) => void;

  onPlayPause: () => void;

  subTasksObj: { [id: string]: SubTask };
  selectedSubTaskIndex: number;
  onNextSubTask: () => void;
  onPrevSubTask: () => void;

  // test: {};

  // handleAppBackground: () => void;

  setSelectedSubTaskIndex: (val: number) => void;

  handleToggleControls: () => void;
  positionData: positionInterfase;
  // currentTime: number;

  fpAward: number;
  storeProgress: number;
  visibleProgress: number;

  setFpProgress: (newValue: number) => void;

  // attemptedDate: string;
  // positionData: MutableRefObject<positionInterfase>;
  // handleSlide: (val: Array<number>) => void;
}

export const useWorkoutVideoStore = create<WorkoutVideoStore>((set, get) => ({
  uid: "",
  uri: "",
  attemptedDate: "",
  max_resolution: "full",
  onInit: async (newTask: Task, uid: string, attemptedDate: string) => {
    // console.log("on init");
    const tone = newTask?.badgeIds?.includes(GREESHA_PCOS) ? "light" : "dark";

    // console.log("uid", uid);
    // console.log("attemptedDate", attemptedDate);

    // const state = get();

    let selectedAct = await getActivityForTask(uid, newTask.id, attemptedDate);
    if (!selectedAct) {
      // console.log("no selectedAct");
      const post = createVideoPost(
        [],
        uid,
        TEAM_ALPHABET_GAME,
        "",
        "",
        newTask.id,
        attemptedDate
      );

      // console.log("post", post.creatorId);

      selectedAct = await saveNewPostWithActivityWithTaskParamsV3(
        TEAM_ALPHABET_GAME,
        post,
        TEAM_ALPHABET_GAME,
        newTask.id,
        0,
        newTask?.name,
        newTask?.thumbnails,
        undefined,
        undefined,
        "task",
        0,
        "REVIEWED"
      );

      // console.log("selectedAct now", selectedAct?.id);
    }

    const fpProg = selectedAct?.fpProgress ? selectedAct.fpProgress : 0;

    const { fpAward, visibleProgress } = calculateFPFromProgress(
      fpProg,
      newTask.fitPoints
    );

    set((state) => ({
      ...state,
      task: newTask,
      uri: getVideoURI(
        newTask.orientation,
        newTask?.playbackId,
        newTask?.avatar,
        state.max_resolution,
        newTask.lowResMedia,
        newTask.lowResPlaybackId
      ),
      aiToggle: "unknown",
      videoReady: "none",
      tone,
      finalOrientation: newTask.orientation,
      uid,
      selectedActivity: selectedAct,
      fpAward: fpAward,
      storeProgress: fpProg,
      attemptedDate: attemptedDate,
      visibleProgress: visibleProgress,
      positionData: {
        totalSec: 0,
        currentVal: 0,
        storeVal: 0,
      },
      skipIntroVisible: newTask.videoIntroDur ? true : false,
      error: "",
      contentModalState: "hide",
      seekDelay: false,
    }));

    weEventTrack("workoutInitDone", {});

    // if (newTask.subTasks) {
    //   const docs = await firestore()
    //     .collection("subTasks")
    //     .where(
    //       "id",
    //       "in",
    //       newTask.subTasks.map((each) => each.subTaskId)
    //     )
    //     .get();

    //   const remoteSubTasksObj: { [id: string]: SubTask } = {};
    //   for (const doc of docs.docs) {
    //     if (doc.data()) {
    //       const subTask = doc.data() as SubTask;
    //       if (!remoteSubTasksObj.hasOwnProperty(subTask.id))
    //         remoteSubTasksObj[subTask.id] = subTask;
    //     }
    //   }

    //   // update subtasks
    //   set((state) => ({ ...state, subTasksObj: remoteSubTasksObj }));
    // }
  },
  onBuffer: (d) => {
    if (d.isBuffering) {
      weEventTrack("workoutBuffering", {});
      set((state) => ({ ...state, loadingState: "buffer" }));
    } else {
      set((state) => ({ ...state, loadingState: "none" }));
    }
  },
  videoReady: "none",
  onReady: () => {
    set((state) => ({ ...state, videoReady: "ready" }));
    weEventTrack("videoReady", {});
  },

  handleLoad: (loadedData: OnLoadData, videoRef: RefObject<Video>) => {
    const durationSec = loadedData.duration;
    let currentVal: number = 0;
    let stSeconds: number = 0;

    const state = get();
    if (
      state.selectedActivity?.progress &&
      state.selectedActivity.progress < 1 &&
      videoRef.current
    ) {
      currentVal = durationSec * state.selectedActivity.progress;
    }

    if (state.selectedActivity?.fpProgress) {
      stSeconds = Math.round(state.selectedActivity.fpProgress * durationSec);
    }

    set((state) => ({
      ...state,
      positionData: {
        totalSec: durationSec,
        currentVal: currentVal,
        storeVal: stSeconds,
      },
    }));

    videoRef.current?.seek(currentVal);

    // seek to position
    setTimeout(
      () =>
        set((state) => ({
          ...state,
          streamingState: "play",
        })),
      500
    );

    weEventTrack("workoutVideoLoaded", {});
  },

  handleSeek: (seekData: OnSeekData) => {
    const state = get();
    const durationSec = state.positionData.totalSec;
    if (durationSec && state.streamingState !== "init") {
      const prog = seekData.currentTime / durationSec;
      const storeProgress = state.positionData.storeVal / durationSec;

      onUpdateProgressFunc(
        state.uid,
        state.selectedActivity?.id,
        state.task?.id,
        prog,
        storeProgress,
        state.task?.fitPoints
      );
    }

    weEventTrack("workoutSeekVideo", {});
  },
  onSeek: (seekToTime: number, videoRef?: React.RefObject<Video>) => {
    set((state) => {
      return {
        ...state,
        positionData: {
          ...state.positionData,
          currentVal: seekToTime,
        },
        seekDelay: true,
        streamingState: "play",
      };
    });

    videoRef?.current?.seek(seekToTime);
  },
  onRewindForward: (
    videoRef: React.RefObject<Video>,
    action: "rewind" | "forward"
  ) => {
    const rState = get();
    const currentTime = rState.positionData.currentVal;
    const totalTime = rState.positionData.totalSec;
    let seekToTime = currentTime;
    if (action === "forward" && currentTime + 15 < totalTime) {
      seekToTime = currentTime + 15;
    } else if (action === "forward") {
      seekToTime = totalTime;
    } else if (action === "rewind" && currentTime - 15 > 0) {
      seekToTime = currentTime - 15;
    } else {
      seekToTime = 0;
    }

    set((state) => {
      return {
        ...state,
        positionData: {
          ...state.positionData,
          currentVal: seekToTime,
        },
        seekDelay: true,
        streamingState: "play",
      };
    });

    videoRef?.current?.seek(seekToTime);

    weEventTrack("workoutRewindForward", {});
  },

  handleProgressUpdate: (progData: OnProgressData) => {
    const currentTimeSec = progData.currentTime;

    set((state) => {
      return {
        ...state,
        ...(state.task?.videoIntroDur &&
        state.task.videoIntroDur < currentTimeSec
          ? { skipIntroVisible: false }
          : {}),
        positionData: {
          ...state.positionData,
          ...(state.seekDelay ? {} : { currentVal: currentTimeSec }),
          storeVal: state.positionData.storeVal + 1,
        },
        seekDelay: false,
        loadingState: "none",
      };
    });

    const state = get();
    const durationSec = state.positionData.totalSec;

    // console.log("durationSec", durationSec);

    if (Math.floor(currentTimeSec) % savingInterval === 0 && durationSec) {
      const prog = currentTimeSec / durationSec;
      const storeProgress = state.positionData.storeVal / durationSec;

      // console.log("prog", prog);
      // console.log("storeProgress", storeProgress);
      const { fpAward, visibleProgress } = onUpdateProgressFunc(
        state.uid,
        state.selectedActivity?.id,
        state.task?.id,
        prog,
        storeProgress,
        state.task?.fitPoints
      );

      set((state) => {
        return {
          ...state,
          fpAward: fpAward,
          storeProgress,
          visibleProgress,
        };
      });

      // console.log("fpAward", fpAward);
      // console.log("calories", calories);
    }
  },
  onEndVideo: () => {
    const state = get();
    const durationSec = state.positionData.totalSec;
    const storeProgress = state.positionData.storeVal / durationSec;

    set((state) => {
      return {
        ...state,
        streamingState: "pause",
        contentModalState: "hide",
      };
    });

    onUpdateProgressFunc(
      state.uid,
      state.selectedActivity?.id,
      state.task?.id,
      1,
      storeProgress,
      state.task?.fitPoints
    );

    weEventTrack("workout_clickFinish", eventObj(state.task));
  },

  onBackRequest: () => {
    set((state) => {
      return {
        ...state,
        contentModalState: "warning",
        streamingState: "pause",
      };
    });

    const state = get();
    weEventTrack("workout_clickBack", eventObj(state.task));
  },
  onResume: () => {
    set((state) => {
      return {
        ...state,
        contentModalState: "hide",
        streamingState: "play",
      };
    });

    const state = get();
    weEventTrack("workout_clickResume", eventObj(state.task));
  },
  onQuit: async () => {
    set((state) => {
      return {
        ...state,
        streamingState: "pause",
        contentModalState: "hide",
      };
    });

    const state = get();
    weEventTrack("workout_clickQuit", eventObj(state.task));
  },
  onFinish: async () => {
    // await changeOrientationToPortrait();
    set((state) => {
      return {
        ...state,
        streamingState: "pause",
        contentModalState: "hide",
      };
    });

    const state = get();
    weEventTrack("workout_clickFinish", eventObj(state.task));
  },

  aiToggle: "unknown",
  setAIToggle: (newState: aiToggleStatus) =>
    set((state) => ({ ...state, aiToggle: newState })),

  toggleResolution: (newRes: resolutionType) => {
    set((state) => {
      return {
        ...state,
        max_resolution: newRes,
        contentModalState: "hide",
        uri: getVideoURI(
          state.finalOrientation,
          state.task?.playbackId,
          state.task?.avatar,
          newRes,
          state.task?.lowResMedia,
          state.task?.lowResPlaybackId
        ),
      };
    });
  },
  requestResolutionChange: () => {
    set((state) => {
      return {
        ...state,
        contentModalState: "videoQuality",
        streamingState: "pause",
      };
    });
  },

  streamingState: "init",
  onStartStreaming: () => {
    set((state) => ({ ...state, streamingState: "play", error: "" }));
    weEventTrack("workoutStartStreaming", {});
  },
  onStopStreaming: () => {
    set((state) => ({ ...state, streamingState: "pause" }));
    weEventTrack("workoutPauseStreaming", {});
  },
  contentModalState: "hide",
  setContentModalState: (val: ContentModalStateType) =>
    set((state) => ({ ...state, contentModalState: val })),

  onPlayPause: () => {
    set((state) => {
      return {
        ...state,

        contentModalState:
          state.streamingState === "pause" ? "hide" : "controls",
        streamingState: state.streamingState === "play" ? "pause" : "play",
      };
    });

    weEventTrack("workoutPlayPause", {});
  },

  subTasksObj: {},
  onNextSubTask: () => {},
  onPrevSubTask: () => {},

  // handleAppBackground: () => {
  //   console.log("background");
  //   set((state) => ({
  //     ...state,
  //     streamingState: "pause",
  //     contentModalState: "warning",
  //   }));
  // },

  selectedSubTaskIndex: -1,
  setSelectedSubTaskIndex: (newVal: number) => {},
  tone: "dark",
  seekDelay: false,
  error: "",
  onError: (newError: LoadError) => {
    set((state) => ({
      ...state,
      videoReady: "error",
      error: newError.error.errorString
        ? newError.error.errorString
        : "Please check your internet.",
    }));
    weEventTrack("workoutVideoError", { error: JSON.stringify(newError) });
    Sentry.captureException(newError);
  },
  retryState: "none",
  onRetry: () => {
    set((state) => ({
      ...state,
      error: "",
      videoReady: "none",
      retryState: "unmount",
    }));

    setTimeout(
      () => set((state) => ({ ...state, error: "", retryState: "none" })),
      2000
    );

    weEventTrack("workoutVideoRetry", {});
  },
  skipIntroVisible: false,
  handleSkipIntro: () => {
    weEventTrack("workoutSkipIntro", {});
    set((state) => ({
      ...state,
      skipIntroVisible: false,
      streamingState: "play",
      contentModalState: "hide",
      positionData: {
        ...state.positionData,
        currentVal: state.task?.videoIntroDur ? state.task?.videoIntroDur : 0,
      },
      seekDelay: true,
    }));
  },
  handleToggleControls: () => {
    set((state) => ({
      ...state,
      contentModalState:
        state.contentModalState === "controls" ? "hide" : "controls",
    }));

    weEventTrack("workoutToggleControls", {});
  },
  positionData: {
    totalSec: 0,
    currentVal: 0,
    storeVal: 0,
  },
  // currentTime: 0,
  fpAward: 0,
  storeProgress: 0,
  visibleProgress: 0,
  setFpProgress: (newValue: number) => {
    set((state) => ({ ...state, fpProgress: newValue }));
  },
  // positionData
}));
