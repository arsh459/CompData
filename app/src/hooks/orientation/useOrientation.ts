import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { useOrientationStore } from "./store/useOrientationStore";
import { shallow } from "zustand/shallow";

export const useOrientation = () => {
  // const [orientationEnum, setOrientationEnum] = useState<number>(0);
  const orientationChangeHandler = useOrientationStore(
    (state) => state.setOrientation,
    shallow
  );

  useEffect(() => {
    const listener = ScreenOrientation.addOrientationChangeListener((l) => {
      const orientationInfo = l.orientationInfo;
      // const orientationLock = l.orientationLock;

      // console.log("orientationInfo", orientationInfo);
      // console.log("orientationLock", orientationLock);

      orientationChangeHandler(orientationInfo.orientation);
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
    };

    // const getCurrentOrientation = async () => {
    //   const orient = await ScreenOrientation.getOrientationAsync();
    //   console.log("orient", orient);
    //   setOrientationEnum(orient);
    // };

    // getCurrentOrientation();
  }, []);

  // return {
  // orientationEnum,
  // };
};
