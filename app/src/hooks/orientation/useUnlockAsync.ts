// import { useIsFocused } from "@react-navigation/native";
import { unlockAsyncFunc } from "@utils/orientation/orientation";
// import { Orientation } from "expo-screen-orientation";
import { useEffect, useState } from "react";
// import { useOrientationStore } from "./store/useOrientationStore";
// import { useOrientation } from "./useOrientation";

export const useUnlockAsync = () => {
  //   const focussed = useIsFocused();
  //   const orientationEnum = useOrientationStore((state) => state.orientation);
  const [state, setState] = useState<boolean>(false);

  useEffect(
    () => {
      // if (
      //   orientationEnum !== Orientation.UNKNOWN &&
      //   orientationEnum !== Orientation.PORTRAIT_UP &&
      //   focussed
      // ) {
      unlockAsyncFunc();
      setState(true);
      // }
    },
    [
      // orientationEnum, focussed
    ]
  );

  return {
    state,
  };
};
