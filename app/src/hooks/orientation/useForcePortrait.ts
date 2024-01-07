// import { useIsFocused } from "@react-navigation/native";
import { changeOrientationToPortrait } from "@utils/orientation/orientation";
// import { Orientation } from "expo-screen-orientation";
import { useEffect, useState } from "react";
// import { useOrientationStore } from "./store/useOrientationStore";
// import { useIsFocused } from "@react-navigation/native";

export const useForcePortrait = () => {
  // const orientationEnum = useOrientationStore((state) => state.orientation);
  // console.log("orientationEnum", orientationEnum);
  const [state, setState] = useState<boolean>(false);

  useEffect(
    () => {
      // if (
      // orientationEnum !== Orientation.UNKNOWN &&
      // orientationEnum !== Orientation.PORTRAIT_UP &&
      // focussed
      // ) {
      changeOrientationToPortrait();
      setTimeout(() => setState(true), 1500);
      // setState(true);
      // }
    },
    [
      // orientationEnum,
      // focussed
    ]
  );

  return {
    state,
  };
};
