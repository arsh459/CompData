import { useActivitiesBetween } from "./useActivitiesBetween";
import { useTimelineDates } from "./useTimelineDates";

export const useTimelineActivities = (uid: string) => {
  const { dtArray, numDates, onNext, rangeStart, rangeEnd } =
    useTimelineDates();

  // console.log(rangeStart, rangeEnd);

  const { activities } = useActivitiesBetween(uid, rangeStart, rangeEnd);

  return {
    dtArray,
    numDates,
    onNext,
    activities,
  };
};
