import { format } from "date-fns";
import { CalendarMonth } from "./interface";

export const onMonthInMS = 30 * 24 * 60 * 60 * 1000;

export const getPreviousMonthFromString = (unix: number): CalendarMonth => {
  const targetDate = new Date(unix);

  const previousMonth = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() - 1,
    1
  );

  const previousMonthEnd = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0
  );

  return {
    currentDate: format(previousMonth, "yyyy-MM-dd"),
    viewDate: format(previousMonth, "MMM yy"),
    monthStartUnix: previousMonth.getTime(),
    monthEndUnix: previousMonthEnd.getTime(),
  };
};

export const getNextMonthFromString = (unix: number): CalendarMonth => {
  const targetDate = new Date(unix);

  const nextMonth = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    1
  );

  const nextMonthEnd = new Date(
    nextMonth.getFullYear(),
    nextMonth.getMonth() + 1,
    0
  );

  return {
    currentDate: format(nextMonth, "yyyy-MM-dd"),
    viewDate: format(nextMonth, "MMM yy"),
    monthStartUnix: nextMonth.getTime(),
    monthEndUnix: nextMonthEnd.getTime(),
  };
};

export const getCalendarMonths = (today: number): CalendarMonth[] => {
  const targetDate = new Date(today);

  const targetDateStart = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    1
  );
  const targetDateEnd = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    0
  );

  const nextMonth = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    1
  );
  const previousMonth1 = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() - 1,
    1
  );
  const previousMonth2 = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() - 2,
    1
  );

  const nextMonthEnd = new Date(
    nextMonth.getFullYear(),
    nextMonth.getMonth() + 1,
    0
  );
  const previousMonth1End = new Date(
    previousMonth1.getFullYear(),
    previousMonth1.getMonth() + 1,
    0
  );
  const previousMonth2End = new Date(
    previousMonth2.getFullYear(),
    previousMonth2.getMonth() + 1,
    0
  );

  return [
    {
      currentDate: format(nextMonth, "yyyy-MM-dd"),
      viewDate: format(nextMonth, "MMM yy"),
      monthStartUnix: nextMonth.getTime(),
      monthEndUnix: nextMonthEnd.getTime(),
    },
    {
      currentDate: format(targetDateStart, "yyyy-MM-dd"),
      viewDate: format(targetDateStart, "MMM yy"),
      monthStartUnix: targetDateStart.getTime(),
      monthEndUnix: targetDateEnd.getTime(),
    },
    {
      currentDate: format(previousMonth1, "yyyy-MM-dd"),
      viewDate: format(previousMonth1, "MMM yy"),
      monthStartUnix: previousMonth1.getTime(),
      monthEndUnix: previousMonth1End.getTime(),
    },
    {
      currentDate: format(previousMonth2, "yyyy-MM-dd"),
      viewDate: format(previousMonth2, "MMM yy"),
      monthStartUnix: previousMonth2.getTime(),
      monthEndUnix: previousMonth2End.getTime(),
    },
  ];
};

export const getCalendarMonthsV2 = (
  unix: number,
  count: number
): CalendarMonth[] => {
  const targetDate = new Date(unix);

  const calendarMonthsToExport: CalendarMonth[] = [];
  for (let i: number = 0; i <= count; i++) {
    const previousMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() - i,
      1
    );

    const previousMonthEnd = new Date(
      previousMonth.getFullYear(),
      previousMonth.getMonth() + 1,
      0
    );

    calendarMonthsToExport.push({
      currentDate: format(previousMonth, "yyyy-MM-dd"),
      viewDate: format(previousMonth, "MMM yy"),
      monthStartUnix: previousMonth.getTime(),
      monthEndUnix: previousMonthEnd.getTime(),
    });
  }

  return calendarMonthsToExport;
};

export const getCalendarMonthsFromFirstCycle = (
  firstCycleStart: number,
  today: number
): { months: CalendarMonth[]; todayIndex: number } => {
  let unix = firstCycleStart;
  const months: CalendarMonth[] = [];
  let todayIndex: number = -1;

  while (unix <= today) {
    const targetDate = new Date(unix);
    const targetDateStart = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      1
    );
    const targetDateEnd = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      0
    );

    months.push({
      currentDate: format(targetDateStart, "yyyy-MM-dd"),
      viewDate: format(targetDateStart, "MMM yy"),
      monthStartUnix: targetDateStart.getTime(),
      monthEndUnix: targetDateEnd.getTime(),
    });

    targetDate.setMonth(targetDateStart.getMonth() + 1);
    unix = targetDate.getTime();

    todayIndex++;
  }

  return { months, todayIndex };
};
