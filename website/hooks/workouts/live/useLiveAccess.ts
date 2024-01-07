import { useEffect, useState } from "react";
import { getUpcomingEvents } from "./utils";
// import { getClosestDay } from "./utils";

export type eventLiveState = "ongoing" | "upcoming" | "unknown";

export const useLiveAccess = (
  slots?: string[],
  duration?: number,
  days?: number[]
) => {
  const [earliestStartTime, setEarliestStartTime] = useState<number>(0);
  const [eventState, setEventState] = useState<eventLiveState>("unknown");
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    // console.log("here");
    const timer = setTimeout(() => {
      setRefresh((p) => p + 1);
    }, 10000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [refresh]);

  useEffect(() => {
    // console.log("slots", slots);
    // console.log("duration", duration);
    // console.log("days", days);
    if (slots && duration && days && days.length) {
      const now = new Date();
      // console.log("now", now);

      const { earliest, state } = getUpcomingEvents(now, slots, days, duration);

      // console.log("earliest", earliest);
      // console.log("state", state);

      if (state && earliest) {
        setEventState(state as eventLiveState);
        setEarliestStartTime(earliest);
      }
    }
  }, [slots, duration, days, refresh]);

  return {
    earliestStartTime,
    eventState,
  };
};
