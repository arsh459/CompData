import { useAuthContext } from "@providers/auth/AuthProvider";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { calenderArr, weekArr } from "../interface";
import { addXDays } from "./utils";
// import { dayMS } from "@providers/period/periodStore";

export const oneDayInMS = 24 * 60 * 60 * 1000;
// const now = Date.now();
const getDefaultDate = (today: number, start?: number) => {
  if (start && start > today) {
    return new Date(start);
  }

  return new Date(today);
};

const getDefaultUnix = (today: number, start?: number) => {
  if (start && start > today) {
    return start;
  }

  return today;
};

// 12am 21st
// 1:30pm 20th

export const useBadgeProgressCalender = (startUnix?: number) => {
  // startUnix - 21st IST -> 20th US

  // 20th
  const { todayUnix } = useAuthContext();
  // console.log(
  //   "todayUnix",
  //   todayUnix,
  //   format(new Date(todayUnix), "hh:mm a dd-MM-yyyy")
  // );

  const [calender, setCalender] = useState<calenderArr>([]);
  const [selectedWeekDay, setSelectedWeekDay] = useState<string>(
    getDayStr(getDefaultDate(todayUnix, startUnix))
  );
  const [selectedtDate, setSelectedDate] = useState<string>(
    getDateStr(getDefaultDate(todayUnix, startUnix))
  );
  const [selectedUnix, setSelectedUnix] = useState<number>(
    getDefaultUnix(todayUnix, startUnix)
  );
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();

  const [intialSlideIndex, setIntialSlideIndex] = useState(0);
  const [startUnixDayStart, setStartUnixDayStart] = useState<number>(
    startUnix ? startUnix : 0
  );

  // console.log(
  //   "selectedUnix",
  //   selectedUnix,
  //   format(new Date(selectedUnix), "hh:mm a dd-MM-yyyy")
  // );

  // console.log(
  //   "startUnix",
  //   startUnix,
  //   format(new Date(startUnix), "hh:mm a dd-MM-yyyy")
  // );

  useEffect(() => {
    if (startUnix) {
      const startDateObj = new Date(startUnix);
      const startUnixNow = new Date(
        startDateObj.getFullYear(),
        startDateObj.getMonth(),
        startDateObj.getDate(), // 1
        // 21,
        0,
        0,
        0,
        0
      ).getTime();

      // console.log(
      //   "startUnixNow",
      //   startUnixNow,
      //   format(new Date(startUnixNow), "hh:mm a dd-MM-yyyy")
      // );

      // {startUnix: number, endUnix: number, weekStr: string}[]

      // monthStrtUnix <- todayUnix
      // const startUnixNow = new Date(
      // startDateObj.getFullYear(),
      // startDateObj.getMonth(),
      // 1,
      // 0,
      // 0,
      // 0,
      // 0
      // ).getTime();
      // getMonthStartUnix
      // find DayNumber from todayUnx - 0, 1, 2, ... 6
      // find how many days are you away from monday
      // get unix for monday
      // get unix for sunday - monday + 7 * (25 * ...)

      // for (let i:number = 0; i <= 3; i++){
      //  findForNextThreeWeeks()
      // }

      const dayStart = new Date(startUnixNow).getDay();

      // 0 -> 6 S
      // 1 -> 0 M
      // 2 -> 1 Tu
      // 3 -> 2
      // 4 -> 3
      // 5 -> 4
      // 6 -> 5

      const daysToMondayFromDayStart = dayStart > 0 ? dayStart - 1 : 6;

      const startMondayUnix =
        startUnixNow - daysToMondayFromDayStart * oneDayInMS;

      const pivotUnix = getDefaultUnix(todayUnix, startUnix);

      // const recEndUnix = pivotUnix + 7 * oneDayInMS;
      const recEndUnix = addXDays(pivotUnix, 7);

      const dayEndRec = new Date(recEndUnix).getDay();

      const daysToSunday = getDaysToSunday(dayEndRec);

      // const finalEnd = recEndUnix + daysToSunday * oneDayInMS;

      const finalEnd = addXDays(recEndUnix, daysToSunday);

      const numOfWeeks = Math.floor(
        (finalEnd - startMondayUnix) / (7 * oneDayInMS)
      );

      const remoteCalenderArr: calenderArr = [];
      let stTime: number | undefined;
      let enTime: number | undefined;
      for (let index = 0; index <= numOfWeeks; index++) {
        // const weekMondayUnix = startMondayUnix + index * 7 * oneDayInMS;
        const weekMondayUnix = addXDays(startMondayUnix, index * 7);

        const remoteWeekrArr: weekArr = [];
        for (let i: number = 0; i < 7; i++) {
          // const dateUnix = weekMondayUnix + i * oneDayInMS;
          const dateUnix = addXDays(weekMondayUnix, i);

          const currDate = new Date(dateUnix);
          if (i === 0 && index === 0) {
            stTime = dateUnix;
          }

          enTime = dateUnix;

          //   getDayStr(currDate),
          //   getDateStr(currDate)

          remoteWeekrArr.push({
            day: getDayStr(currDate),
            date: getDateStr(currDate),
            unix: dateUnix,
            numStr: getNumStr(currDate),
          });

          // console.log(
          //   getDateStr(currDate),
          //   "dateUnix",
          //   dateUnix,
          //   format(new Date(dateUnix), "hh:mm a dd-MM-yyyy")
          // );

          if (
            format(new Date(pivotUnix), "yyyy-MM-dd") ===
            format(new Date(dateUnix), "yyyy-MM-dd")
          ) {
            setIntialSlideIndex(index);
            setSelectedWeekDay(getDayStr(new Date(dateUnix)));
            setSelectedDate(getDateStr(new Date(dateUnix)));
            setSelectedUnix(dateUnix);
          }
        }

        remoteCalenderArr.push(remoteWeekrArr);
      }

      setStartUnixDayStart(startUnixNow);
      setCalender(remoteCalenderArr);
      setStartTime(stTime);
      setEndTime(enTime);

      // const daysToSundayFromToday = dayStart > 0 ? dayStart - 1 : 6;
      // const endUnix = todayUnix + 7 * oneDayInMS;
    }
  }, [startUnix, todayUnix]);

  return {
    calender,
    selectedWeekDay,
    setSelectedWeekDay,
    selectedtDate,
    setSelectedDate,
    intialSlideIndex,
    setIntialSlideIndex,
    selectedUnix,
    setSelectedUnix,
    startUnixDayStart,
    startUnix,
    startTime,
    endTime,
  };
};

export const getMidnigthDate = (unix: number) => {
  const targetUnix = new Date(unix);

  return new Date(
    targetUnix.getFullYear(),
    targetUnix.getMonth(),
    targetUnix.getDate(),
    0,
    0,
    0,
    0
  );
};

export const getMiliToHM = (unix: number) => {
  const now = Date.now();
  const diffInMili = Math.max(unix, now) - Math.min(unix, now);
  const diffInMin = diffInMili / 1000 / 60;
  return `${Math.floor(diffInMin / 60)}H ${Math.floor(diffInMin % 60)}M`;
};

export const getDayStr = (date: Date) => {
  return format(date, "EEEEEE");
};

export const getDayStrI = (date: Date) => {
  return format(date, "iiii");
};

export const getNumStr = (date: Date) => {
  return format(date, "dd");
};
export const getDateStr = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

const getDaysToSunday = (todayDay: number) => {
  // 0 -> 0
  // 1 -> 6
  // 2 -> 5
  // 3 -> 4
  // 4 -> 3
  // 5 -> 2
  // 6 -> 1
  const dayMap: { [day: number]: number } = {
    0: 0,
    1: 6,
    2: 5,
    3: 4,
    4: 3,
    5: 2,
    6: 1,
  };

  return dayMap[todayDay];
};
