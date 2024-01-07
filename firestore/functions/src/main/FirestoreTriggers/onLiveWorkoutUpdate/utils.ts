// import addDays from "date-fns/addDays";
import * as moment from "moment-timezone";
import { LiveClass } from "../../../models/Workout/Workout";

export const isStreamLive = (stream?: LiveClass, lastStarted?: number) => {
  const now = Date.now();
  const nowMoment = moment(now);
  const intiaTimezone = nowMoment.tz("Asia/Kolkata");

  if (stream && stream.slots && stream.days && stream.duration) {
    const { state } = getUpcomingEvents(
      intiaTimezone,
      stream.slots,
      stream.days,
      stream.duration,
      lastStarted,
    );

    if (state === "ongoing") {
      return true;
    }
  }

  return false;
};

export const isLiveToday = (stream?: LiveClass) => {
  const now = Date.now();
  const nowMoment = moment(now);
  const intiaTimezone = nowMoment.tz("Asia/Kolkata");

  const dayToday = intiaTimezone.day();
  if (stream?.days && stream.days.includes(dayToday)) {
    return true;
  }

  return false;
};

export const getUpcomingEvents = (
  now: moment.Moment,
  slots: string[],
  days: number[],
  duration: number,
  lastStarted?: number,
) => {
  const dayToday = now.day();
  //   console.log("dayToday", dayToday);
  // console.log("days", days);
  for (let i: number = 0; i <= 7; i++) {
    const todayDay = (dayToday + i) % 7;

    // console.log("todayDay", todayDay);

    // if today is event
    if (days.includes(todayDay)) {
      if (slots.length === 0) {
        if (lastStarted && Date.now() <= lastStarted + duration * 60 * 1000) {
          return {
            state: "ongoing",
          };
        }
      } else {
        // console.log("today", todayDay, "included");
        const { dif, earliest, state } = getEarliestTime(
          slots,
          getDayStart(now, i),
          duration,
        );

        if (dif !== Number.POSITIVE_INFINITY) {
          return { earliest, state };
        }
      }
    }
  }

  return {};
};

const getEarliestTime = (
  slots: string[],
  checkingDateStart: moment.Moment,
  duration: number,
) => {
  const timeStrings = getTimeStrings(slots);
  // console.log("timeStrings", timeStrings);
  // console.log("checkingDateStart", checkingDateStart);
  const dateObjsToday = getDatesForToday(
    timeStrings,
    checkingDateStart.date(),
    checkingDateStart.month(),
    checkingDateStart.year(),
  );

  // console.log("dateObjsToday", dateObjsToday);

  const dayStartUnix = checkingDateStart.unix() * 1000;
  // console.log("dayStartUnix", dayStartUnix);
  // console.log("date", new Date(dayStartUnix));
  let smallest: number = Number.POSITIVE_INFINITY;
  let selDate: number | undefined = undefined;
  for (const unixSlotStart of dateObjsToday) {
    if (
      unixSlotStart - dayStartUnix < 0 &&
      dayStartUnix - unixSlotStart < duration * 60 * 1000
    ) {
      return {
        earliest: unixSlotStart,
        dif: unixSlotStart - dayStartUnix,
        state: "ongoing",
      };
    } else if (
      unixSlotStart - dayStartUnix > 0 &&
      unixSlotStart - dayStartUnix < smallest
    ) {
      smallest = unixSlotStart - dayStartUnix;
      selDate = unixSlotStart;
    }
  }

  return {
    dif: smallest,
    earliest: selDate,
    state: "upcoming",
  };
};

const getTimeStrings = (slots: string[]) => {
  return slots.map((item) => {
    const dt = new Date(item);
    return {
      hour: dt.getHours(),
      minutes: dt.getMinutes(),
    };
  });
};

const getDatesForToday = (
  timeStrings: { hour: number; minutes: number }[],
  date: number,
  month: number,
  year: number,
) => {
  return timeStrings.map((item) => {
    return new Date(year, month, date, item.hour, item.minutes, 0, 0).getTime();
  });
};

const getDayStart = (now: moment.Moment, i: number) => {
  if (i === 0) {
    return now;
  }

  return now.add(i, "days");
};
