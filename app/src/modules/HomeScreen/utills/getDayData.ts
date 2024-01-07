import { isFuture, isSameDay } from "date-fns";
import { DateData } from "react-native-calendars";

export const getDayData = (val: (string & DateData) | undefined) => {
  if (val?.timestamp && val.day) {
    const sameDay = isSameDay(new Date(), new Date(val?.timestamp));
    const futureDay = isFuture(val?.timestamp);
    return {
      isToday: sameDay,
      day: val.day,
      futureDay,
    };
  }
  return {
    isToday: false,
    day: 0,
    futureDay: false,
  };
};
