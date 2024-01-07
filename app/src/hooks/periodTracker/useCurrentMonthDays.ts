import { dayObj } from "@modules/Nutrition/V2/DaySelector/interface";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

const useCurrentMonthDays = (): dayObj[] => {
  const currentDate = new Date();
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  const dayObjArr: dayObj[] = daysInMonth.map((day) => ({
    date: format(day, "yyyy-MM-dd"),
    day: format(day, "E"),
    numStr: format(day, "d"),
    unix: day.getTime(),
  }));

  return dayObjArr;
};

export default useCurrentMonthDays;
