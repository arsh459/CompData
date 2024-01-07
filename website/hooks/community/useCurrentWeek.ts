import { useEffect, useState } from "react";

export const useCurrentWeek = (challengeStarts?: number) => {
  const [weekString, setWeekString] = useState<string>("");

  //   console.log("weekString", weekString);

  useEffect(() => {
    const firstCall = () => {
      if (challengeStarts) {
        const now = Date.now();
        const week = Math.floor(
          (now - challengeStarts) / (7 * 24 * 60 * 60 * 1000)
        );

        setWeekString(`week-${Math.floor(week)}`);
        // setWeekString(`week-0`);

        // console.log("here");
      }
    };

    firstCall();
    const interval = setInterval(firstCall, 3600 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [challengeStarts]);

  return {
    weekString,
  };
};
