import { RefObject } from "react";
import { View } from "react-native";

export type onboardStateType =
  | "unknown"
  | "markPeriod"
  | "expectedPeriod"
  | "ovulation"
  | "insight"
  | "legend";

export type OnboardContextProps = {
  children: React.ReactNode;
};

export interface OnboardContextInterface {
  periodTrackerCalender: RefObject<View>;
  periodTrackerInsight: RefObject<View>;
  infoBtn: RefObject<View>;
  onboardState: onboardStateType;
  setOnboardState: (val: onboardStateType) => void;
}
