import { Task } from "@models/Tasks/Task";
import { FlashList } from "@shopify/flash-list";
import { RefObject } from "react";
import { View } from "react-native";

export type onboardStateType =
  | "unknown"
  | "welcome"
  | "taskCard"
  | "taskCardDone"
  | "taskCardProgress"
  | "dietCard"
  | "dietCardSwap"
  | "dietCardDone"
  | "daySelectorArrow"
  | "daySelectorStart"
  | "daySelectorRestDay"
  | "daySelectorExpander"
  | "reelCard";

export type OnboardContextProps = {
  children: React.ReactNode;
};

export interface OnboardContextInterface {
  flashListRef: RefObject<FlashList<Task>>;
  taskCard: RefObject<View>;
  dietCard: RefObject<View>;
  daySelector: RefObject<View>;
  reelCard: RefObject<View>;
  taskCardProp?: taskCardProps;
  setTaskCardProp: (val: taskCardProps | undefined) => void;
  dietCardProp?: dietCardProps;
  setDietCardProp: (val: dietCardProps | undefined) => void;
  reelProp?: Task;
  setReelProp: (val: Task | undefined) => void;
  onboardState: onboardStateType;
  setOnboardState: (val: onboardStateType) => void;
}

export interface taskCardProps {
  width: number;
  height: number;
  imgHeight: number;
  task: Task;
  state?: "progress";
}
export interface dietCardProps {
  dayRecommendationId: string;
  showWave?: boolean;
  task: Task;
  state?: "swap";
}
