import Video from "react-native-video";
// import { streamingStateTypes } from "@hooks/permissions/useRTCCam";
// import { SubTask } from "@models/Tasks/Task";
// import { MutableRefObject, RefObject } from "react";

export type ContentModalStateType =
  | "hide"
  | "warning"
  | "controls"
  | "videoQuality";

export type ContentContextProps = {
  children: React.ReactNode;
  // streamingState: streamingStateTypes;
  // onStartStreaming: () => void;
  // onStopStreaming: () => void;
  // castId?: string;
  // warning: boolean;
  // tone: "light" | "dark";
  // attemptedDate: string;
};

export interface ContentContextInterface {
  videoRef: React.RefObject<Video>;
  // streamingState: streamingStateTypes;
  // contentModalState: ContentModalStateType;
  // setContentModalState: (val: ContentModalStateType) => void;
  // onBackRequest: () => void;
  // finalOrientation?: "landscape" | "portrait";
  // onInit: () => void;
  // onPlayPause: (hideWarning?: boolean) => void;
  // onResume: () => void;
  // onFinish: () => void;
  // onQuit: () => void;
  // subTasksObj: { [id: string]: SubTask };
  // selectedSubTaskIndex: number;
  // setSelectedSubTaskIndex: (val: number) => void;
  // startTimer: (num: number) => void;
  // clearTimer: () => void;
  // tone: "light" | "dark";
  // attemptedDate: string;
  // timerRef: RefObject<number>;
  // positionData: MutableRefObject<positionInterfase>;
  // handleSlide: (val: Array<number>) => void;
}

export interface positionInterfase {
  totalSec: number;
  storeVal: number;
  currentVal: number;
}
