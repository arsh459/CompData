import { addDays, format, startOfWeek } from "date-fns";

interface weekDatesInterface {
  day: string;
  dateStr: string;
  dateUnix: number;
}

export const getCurrentWeeksDates = () => {
  const weekStartDay = startOfWeek(Date.now(), { weekStartsOn: 1 });
  const weekDates: weekDatesInterface[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStartDay, i);
    const day = format(date, "EEE");
    const dateStr = format(date, "yyyy-MM-dd");

    weekDates.push({ day: day, dateStr: dateStr, dateUnix: date.getTime() });
  }

  return weekDates;
};


export const getNumSuffix = (number: number) => {
    const lastDigit = number % 10,
          lastTwoDigit = number % 100;
    if (lastDigit === 1 && lastTwoDigit !== 11) {
        return number + "st";
    }
    if (lastDigit === 2 && lastTwoDigit !== 12) {
        return number + "nd";
    }
    if (lastDigit === 3 && lastTwoDigit !== 13) {
        return number + "rd";
    }
    return number + "th";
}