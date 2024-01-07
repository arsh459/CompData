import { useEffect, useState } from "react";
import { getPace } from "./utils";

export const usePace = (distance?: number, secondsElapsed?: number) => {
  const [pace, setPace] = useState<{ minutes: string; seconds: string }>({
    minutes: "-",
    seconds: "-",
  });

  useEffect(() => {
    if (
      distance &&
      secondsElapsed &&
      distance > 200 &&
      !(secondsElapsed % 10)
    ) {
      const distanceInKM = distance / 1000;
      const { minutes, seconds } = getPace(distanceInKM, secondsElapsed);

      setPace({ minutes, seconds });
    }
  }, [distance, secondsElapsed]);

  return {
    pace,
  };
};
