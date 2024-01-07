import { CalendarDate } from "@providers/period/periodStore";
import { startOfWeek, add, format, getTime, startOfDay } from "date-fns";

export function initData(unix: number) {
  const currentDate = new Date(unix);
  const startingDateOfCurrentWeek = startOfWeek(currentDate, {
    weekStartsOn: 1,
  });
  const dateArray: CalendarDate[] = [];
  for (let i = 0; i < 7; i++) {
    let dateObject: CalendarDate = {
      currentDate: format(
        add(startingDateOfCurrentWeek, { days: i }),
        "yyyy-MM-dd"
      ),
      day: format(add(startingDateOfCurrentWeek, { days: i }), "eee"),
      visibleDate: format(
        add(startingDateOfCurrentWeek, { days: i }),
        "do MMM"
      ),
      unix: getTime(startOfDay(add(startingDateOfCurrentWeek, { days: i }))),
    };

    dateArray.push(dateObject);
  }
  return dateArray;
}

export function getTodayObject(unix: number) {
  const date = new Date(unix);
  return {
    currentDate: format(date, "yyyy-MM-dd"),
    day: format(date, "eee"),
    unix: getTime(startOfDay(date)),
    visibleDate: format(date, "do MMM"),
  };
}

export function getNextWeekData(unix: number) {
  const currentDate = new Date(unix);
  const startingDateOfCurrentWeek = startOfWeek(currentDate, {
    weekStartsOn: 1,
  });
  const dateArray: CalendarDate[] = [];
  for (let i = 7; i < 14; i++) {
    let dateObject: CalendarDate = {
      currentDate: format(
        add(startingDateOfCurrentWeek, { days: i }),
        "yyyy-MM-dd"
      ),
      day: format(add(startingDateOfCurrentWeek, { days: i }), "eee"),
      visibleDate: format(
        add(startingDateOfCurrentWeek, { days: i }),
        "do MMM"
      ),
      unix: getTime(startOfDay(add(startingDateOfCurrentWeek, { days: i }))),
    };
    dateArray.push(dateObject);
  }
  return dateArray;
}

export function getPreviousWeekData(unix: number) {
  const currentDate = new Date(unix);
  const startingDateOfCurrentWeek = startOfWeek(currentDate, {
    weekStartsOn: 1,
  });
  const dateArray: CalendarDate[] = [];
  for (let i = -7; i < 0; i++) {
    let dateObject: CalendarDate = {
      currentDate: format(
        add(startingDateOfCurrentWeek, { days: i }),
        "yyyy-MM-dd"
      ),
      day: format(add(startingDateOfCurrentWeek, { days: i }), "eee"),
      visibleDate: format(
        add(startingDateOfCurrentWeek, { days: i }),
        "do MMM"
      ),
      unix: getTime(startOfDay(add(startingDateOfCurrentWeek, { days: i }))),
    };
    dateArray.push(dateObject);
  }
  return dateArray;
}
