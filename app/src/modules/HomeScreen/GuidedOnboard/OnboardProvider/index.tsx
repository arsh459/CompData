import { createContext, useContext, useRef, useState } from "react";
import {
  OnboardContextInterface,
  OnboardContextProps,
  onboardStateType,
  // targetType,
  // targetsObjType,
} from "./interface";
import { ScrollView, View } from "react-native";
// import { paramsType } from "@components/OnboardPopup/utils";

const OnboardContext = createContext<OnboardContextInterface | undefined>(
  undefined
);

function OnboardProvider({ children }: OnboardContextProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [onboardState, setOnboardState] = useState<onboardStateType>("unknown");

  const todayFp = useRef<View>(null);
  const workout = useRef<View>(null);
  const nutrition = useRef<View>(null);
  const steps = useRef<View>(null);

  const value = {
    todayFp,
    workout,
    nutrition,
    steps,
    onboardState,
    setOnboardState,
    scrollRef,
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
