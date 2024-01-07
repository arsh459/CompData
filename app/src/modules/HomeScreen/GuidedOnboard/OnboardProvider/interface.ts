import { RefObject } from "react";
import { ScrollView, View } from "react-native";

export type onboardStateType =
  | "unknown"
  | "welcome"
  | "todayFp"
  | "whatIsFp"
  | "workout"
  | "nutrition"
  | "steps"
  | "exploreAll"
  | "welcomeBootcamp"
  | "appointment"
  | "slotIntervention";

export type OnboardContextProps = {
  children: React.ReactNode;
};

export interface OnboardContextInterface {
  onboardState: onboardStateType;
  setOnboardState: (val: onboardStateType) => void;
  todayFp: RefObject<View>;
  workout: RefObject<View>;
  nutrition: RefObject<View>;
  steps: RefObject<View>;
  scrollRef: RefObject<ScrollView>;
}
