import {
  getDateStr,
  getDayStr,
  getNumStr,
  oneDayInMS,
} from "@modules/Nutrition/V2/DaySelector/hooks/useBadgeProgressCalender";
import { dayObj } from "@modules/Nutrition/V2/DaySelector/interface";

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

  const remoteWeekrArr: dayObj[] = [];

  for (let index: number = 0; index < 7; index++) {
    const dateUnix = startMondayUnix + index * oneDayInMS;
    const currDate = new Date(dateUnix);
    remoteWeekrArr.push({
      day: getDayStr(currDate),
      date: getDateStr(currDate),
      unix: dateUnix,
      numStr: getNumStr(currDate),
    });
  }

  return remoteWeekrArr;
};

export const shouldSetProps = (
  id: string,
  index: number,
  workoutCardOnboard?: boolean,
  workoutProgOnboard?: string | "DONE",
  workoutDoneOnboard?: string | "DONE"
) => {
  if (workoutCardOnboard) {
    if (workoutProgOnboard && workoutProgOnboard === "DONE") {
      if (
        workoutDoneOnboard &&
        workoutDoneOnboard !== "DONE" &&
        workoutDoneOnboard === id
      ) {
        return true;
      }
    } else if (workoutProgOnboard && workoutProgOnboard === id) {
      return true;
    }
  } else if (index === 0) {
    return true;
  }
  return false;
};
