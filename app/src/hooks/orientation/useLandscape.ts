import { changeOrientationToLandscape } from "@utils/orientation/orientation";
import { Orientation } from "expo-screen-orientation";
import { useEffect } from "react";
import { useOrientationStore } from "./store/useOrientationStore";

export const useLandscape = () => {
  const orientationEnum = useOrientationStore((state) => state.orientation);

  useEffect(() => {
    if (
      orientationEnum !== Orientation.UNKNOWN &&
      orientationEnum !== Orientation.LANDSCAPE_RIGHT
    ) {
      changeOrientationToLandscape();
    }
  }, [orientationEnum]);
};
