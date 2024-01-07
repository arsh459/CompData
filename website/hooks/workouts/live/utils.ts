import addDays from "date-fns/addDays";

const getDayStart = (now: Date, i: number) => {
  if (i === 0) {
    return now;
  }

  return addDays(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
    i
  );
};

export const getUpcomingEvents = (
  now: Date,
  slots: string[],
  days: number[],
  duration: number
) => {
  const dayToday = now.getDay();
  // console.log("dayToday", dayToday);
  // console.log("days", days);
  for (let i: number = 0; i <= 7; i++) {
    const todayDay = (dayToday + i) % 7;

    // console.log("todayDay", todayDay);

    // if today is event
    if (days.includes(todayDay)) {
      if (slots.length === 0) {
        return {
          state: "ongoing",
          earliest: Date.now(),
        };
      }

      const { dif, earliest, state } = getEarliestTime(
        slots,
        now,
        getDayStart(now, i),
        duration
      );

      // console.log("state", state, dif);

      if (dif !== Number.POSITIVE_INFINITY) {
        return { earliest, state };
      }
    }
  }

  return {};
};

const getEarliestTime = (
  slots: string[],
  now: Date,
  checkingDateStart: Date,
  duration: number
) => {
  const timeStrings = getTimeStrings(slots);
  // console.log("timeStrings", timeStrings);
  // console.log("checkingDateStart", checkingDateStart);
  const dateObjsToday = getDatesForToday(
    timeStrings,
    checkingDateStart.getDate(),
    checkingDateStart.getMonth(),
    checkingDateStart.getFullYear()
  );

  // console.log("dateObjsToday", dateObjsToday);

  const dayStartUnix = checkingDateStart.getTime();
  // console.log("dayStartUnix", dayStartUnix);
  // console.log("date", new Date(dayStartUnix));
  let smallest: number = Number.POSITIVE_INFINITY;
  let selDate: number | undefined = undefined;
  for (const unixSlotStart of dateObjsToday) {
    // console.log("unixSlotStart", unixSlotStart, unixSlotStart - dayStartUnix);
    if (
      unixSlotStart - dayStartUnix < 0 && // slot start has passed
      dayStartUnix - unixSlotStart < duration * 60 * 1000 // slot start passed less than 60 minutes
    ) {
      return {
        earliest: unixSlotStart,
        dif: unixSlotStart - dayStartUnix,
        state: "ongoing",
      };
    } else if (
      unixSlotStart - dayStartUnix > 0 && // slot start has not passed
      unixSlotStart - dayStartUnix < smallest // time diff is smaller than prev
    ) {
      smallest = unixSlotStart - dayStartUnix; // save time dif
      selDate = unixSlotStart; // save slot start
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
  year: number
) => {
  return timeStrings.map((item) => {
    return new Date(year, month, date, item.hour, item.minutes, 0, 0).getTime();
  });
};

// days
// times

// now: number - Day
//
