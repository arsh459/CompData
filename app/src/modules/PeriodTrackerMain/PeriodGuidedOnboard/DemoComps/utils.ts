import { oneDayInMS } from "@modules/Nutrition/V2/DaySelector/hooks/useBadgeProgressCalender";
import { CalendarDate } from "@providers/period/periodStore";
import { format } from "date-fns";

export const getDemoCalander = () => {
  const startDateObj = new Date(Date.now());
  const startUnixNow = new Date(
    startDateObj.getFullYear(),
    startDateObj.getMonth(),
    startDateObj.getDate(),
    0,
    0,
    0,
    0
  ).getTime();
  const dayStart = startDateObj.getDay();
  const daysToMondayFromDayStart = dayStart > 0 ? dayStart - 1 : 6;
  const startMondayUnix = startUnixNow - daysToMondayFromDayStart * oneDayInMS;

  const remoteWeekrArr: CalendarDate[] = [];

  for (let index: number = 0; index < 7; index++) {
    const dateUnix = startMondayUnix + index * oneDayInMS;
    const currDate = new Date(dateUnix);
    remoteWeekrArr.push({
      currentDate: format(currDate, "yyyy-MM-dd"),
      unix: currDate.getTime(),
      visibleDate: format(currDate, "dd"),
      day: format(currDate, "eee"),
    });
  }

  return remoteWeekrArr;
};
