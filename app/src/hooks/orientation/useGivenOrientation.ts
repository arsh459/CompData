import {
  changeOrientationToLandscape,
  changeOrientationToPortrait,
} from "@utils/orientation/orientation";
import { useEffect } from "react";
// import * as ScreenOrientation from "expo-screen-orientation";
// import { useIsFocused } from "@react-navigation/native";

export const useGivenOrientation = (
  orientationNeeded?: "landscape" | "portrait",
  castId?: string
) => {
  // const orientationEnum = useOrientationStore((state) => state.orientation);

  useEffect(() => {
    // if (castId) {
    // changeOrientationToPortrait();
    // } else
    if (
      // orientationEnum !== Orientation.UNKNOWN &&
      orientationNeeded === "portrait" // &&
      // orientationEnum !== Orientation.PORTRAIT_UP
    ) {
      changeOrientationToPortrait();
    } else if (
      // orientationEnum !== Orientation.UNKNOWN &&
      orientationNeeded === "landscape" //&&
      // orientationEnum !== Orientation.LANDSCAPE_RIGHT
    ) {
      changeOrientationToLandscape();
    }
  }, [
    // orientationEnum,
    orientationNeeded,
    // castId
  ]);

  useEffect(() => {
    return () => {
      console.log("unlocking");
      changeOrientationToPortrait();
    };
  }, []);

  return {
    // finalOrientation: castId ? "portrait" : orientationNeeded,
    finalOrientation: orientationNeeded,
  };
};
