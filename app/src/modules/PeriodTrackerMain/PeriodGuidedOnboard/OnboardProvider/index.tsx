import { createContext, useContext, useRef, useState } from "react";
import {
  OnboardContextInterface,
  OnboardContextProps,
  onboardStateType,
} from "./interface";
import { View } from "react-native";

const OnboardContext = createContext<OnboardContextInterface | undefined>(
  undefined
);

function OnboardProvider({ children }: OnboardContextProps) {
  const [onboardState, setOnboardState] = useState<onboardStateType>("unknown");

  const periodTrackerCalender = useRef<View>(null);
  const periodTrackerInsight = useRef<View>(null);
  const infoBtn = useRef<View>(null);

  const value = {
    periodTrackerCalender,
    periodTrackerInsight,
    infoBtn,
    onboardState,
    setOnboardState,
  };

  return (
    <OnboardContext.Provider value={value}>{children}</OnboardContext.Provider>
  );
}

function useOnboardContext() {
  const context = useContext(OnboardContext);

  if (context === undefined) {
    throw new Error("useOnboardContext must be used within OnboardProvider");
  }

  return context;
}

export { OnboardProvider, useOnboardContext };
