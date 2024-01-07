import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isMonday,
  isSunday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
export const getDateDiff = (
  startDay: number,
  endDay: number,
  endDate: Date
): string => {
  // Get the month name from the end date
  const monthName = format(endDate, "MMM");

  // Return the result in the desired format
  // return `${startDay}-${endDay} ${monthName}`;
  return `${endDay} ${monthName}`;
};

export const weeksBetween = (startDate: Date, endDate: Date) => {
  const oneWeek = 1000 * 60 * 60 * 24 * 7; // number of milliseconds in one week
  const diffInMs = endDate.getTime() - startDate.getTime(); // difference between dates in milliseconds
  const diffInWeeks = Math.ceil(diffInMs / oneWeek); // round down to get the number of whole weeks

  return diffInWeeks;
};

export const getNearestMondayFromFirstWeekOfMonth = (date?: Date) => {
  const currentDate = date || new Date();

  const start = startOfMonth(currentDate);
  const firstWeekStart = startOfWeek(start, { weekStartsOn: 1 });

  let nearestMonday = firstWeekStart;
  while (!isMonday(nearestMonday)) {
    nearestMonday = addDays(nearestMonday, 1);
  }

  return nearestMonday;
};

export const getNearestSundayToEndOfLastWeekOfMonth = (date?: Date): Date => {
  // Get the current date and set it to the end of the month
  const currentDate = date ? date : new Date();

  const lastDayOfMonth = endOfMonth(currentDate);
  if (isSunday(lastDayOfMonth)) {
    return lastDayOfMonth;
  }
  const endOfWeekOfMonth = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  return endOfWeekOfMonth;
};

const getNextSunday = (date: Date): Date => {
  const nextDay = addDays(date, 1);
  if (isSunday(nextDay)) {
    return nextDay;
  }
  return getNextSunday(nextDay);
};
