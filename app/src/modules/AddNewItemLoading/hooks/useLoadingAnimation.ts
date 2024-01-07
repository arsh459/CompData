import { useEffect, useState } from "react";

const LOADING_TIME = 20000;
const INTERVAL = 4;
const STEP_TIME = (LOADING_TIME * INTERVAL) / 100;

export const useLoadingAnimation = () => {
  const [value, setValue] = useState<number>(0);
  const [valueCircle, _] = useState<number>(0.96);

  // for setting timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100 - 2 * INTERVAL) {
          clearInterval(intervalId);
        }
        return prev + INTERVAL;
      });
    }, STEP_TIME);

    return () => clearInterval(intervalId);
  }, []);

  return {
    value,
    valueCircle,
    LOADING_TIME,
  };
};
