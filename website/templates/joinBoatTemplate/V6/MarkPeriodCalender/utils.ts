import { differenceInCalendarDays, differenceInCalendarMonths } from "date-fns";

export const oneDayInMS = 24 * 60 * 60 * 1000;

const sortArrayOfDates = (dates: string[]) => {
  return dates.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });
};

export const groupConsecutiveDateStrings = (datesIn: string[]): string[][] => {
  const groupedDates: string[][] = [];
  let currentGroup: string[] = [];

  const dates = sortArrayOfDates(datesIn);

  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const nextDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null;

    // Add the current date string to the current group
    currentGroup.push(dates[i]);

    // Check if the next date is consecutive or if it's the last date in the array
    if (
      nextDate === null ||
      (nextDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24) > 1
    ) {
      // If not consecutive, add the current group to the grouped dates and start a new group
      groupedDates.push(currentGroup);
      currentGroup = [];
    }
  }

  return groupedDates;
};

export const getMonthEditScrollIndex = (
  unix?: number,
  beforeLastPeriod?: boolean
): number => {
  // index 1 is current month
  if (unix) {
    const initNowDate = new Date();
    const todayUnix = new Date(
      initNowDate.getFullYear(),
      initNowDate.getMonth(),
      initNowDate.getDate(),
      0,
      0,
      0,
      0
    ).getTime();

    const diffDays = differenceInCalendarDays(todayUnix, unix);
    const diffMonths = differenceInCalendarMonths(todayUnix, unix);

    if (beforeLastPeriod) {
      return 1 + diffMonths + 1;
    } else {
      if (diffDays < 45) {
        return 1 + diffMonths;
      }
    }
  }
  return 1;
};

export const getDateDiff = (date1: string, date2: string) => {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  return Math.ceil(diff / oneDayInMS);
};
