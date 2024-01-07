import { createContext, useContext, useRef, useState } from "react";
import {
  OnboardContextInterface,
  OnboardContextProps,
  dietCardProps,
  onboardStateType,
  taskCardProps,
} from "./interface";
import { View } from "react-native";
import { Task } from "@models/Tasks/Task";
import { FlashList } from "@shopify/flash-list";

const OnboardContext = createContext<OnboardContextInterface | undefined>(
  undefined
);

function OnboardProvider({ children }: OnboardContextProps) {
  const [onboardState, setOnboardState] = useState<onboardStateType>("unknown");
  const [taskCardProp, setTaskCardProp] = useState<taskCardProps | undefined>();
  const [dietCardProp, setDietCardProp] = useState<dietCardProps | undefined>();
  const [reelProp, setReelProp] = useState<Task | undefined>();

  const flashListRef = useRef<FlashList<Task>>(null);
  const taskCard = useRef<View>(null);
  const dietCard = useRef<View>(null);
  const daySelector = useRef<View>(null);
  const reelCard = useRef<View>(null);

  const value = {
    flashListRef,
    taskCard,
    dietCard,
    daySelector,
    reelCard,
    taskCardProp,
    setTaskCardProp,
    dietCardProp,
    setDietCardProp,
    reelProp,
    setReelProp,
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
