import { dayMS } from "@providers/period/periodStore";
import { differenceInMinutes, differenceInHours, format } from "date-fns";

export const calculateTimeDifference = (
  startDateUnix: number,
  endDateUnix?: number
) => {
  if (startDateUnix && endDateUnix) {
    // Convert Unix timestamps to JavaScript Date objects
    const startDate = new Date(startDateUnix); // Multiply by 1000 to convert seconds to milliseconds
    const endDate = new Date(endDateUnix);

    const minutesDifference = differenceInMinutes(endDate, startDate);
    const hoursDifference = differenceInHours(endDate, startDate);

    // Calculate minutes remaining after subtracting hours
    const remainingMinutes = minutesDifference - hoursDifference * 60;

    return { hours: hoursDifference, minutes: remainingMinutes };
  } else {
    return { hours: "-", minutes: "-" };
  }
};

export const getTimeLeftString = (endTime?: number) => {
  if (!endTime) {
    return {};
  }

  const msDiff = endTime - Date.now();
  const msDiffAbs = Math.abs(msDiff);

  const daysLeft = msDiffAbs / dayMS;
  const daysLeftRound = Math.floor(daysLeft);

  const daysRemainder = daysLeft - daysLeftRound;

  const hrsLeft = daysRemainder * 24;
  const hrsLeftRound = Math.floor(hrsLeft);

  const hrsRemainder = hrsLeft - hrsLeftRound;

  const minutesLeft = hrsRemainder * 60;

  return {
    days: daysLeftRound,
    hours: hrsLeftRound,
    minutes: Math.round(minutesLeft),
    msDiff: msDiff,
  };
};

function calculateRemainingTimeToFuture(targetTimeMillis: number) {
  const currentTimeMillis = Date.now();
  const timeDifferenceMillis = targetTimeMillis - currentTimeMillis;
  if (timeDifferenceMillis <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
    };
  }
  const remainingDays = Math.floor(
    timeDifferenceMillis / (1000 * 60 * 60 * 24)
  );
  const remainingHours = Math.floor(
    (timeDifferenceMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const remainingMinutes = Math.floor(
    (timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60)
  );
  return {
    days: remainingDays,
    hours: remainingHours,
    minutes: remainingMinutes,
  };
}

export const getTimestringToShow = (start?: number, end?: number) => {
  const now = Date.now();

  if (start && now < start) {
    const { days, hours, minutes } = getTimeLeftString(start);
    if (days) {
      return `Starting in ${days}D ${hours}H`;
    } else {
      return `Starting in ${hours}H ${minutes}M`;
    }
  }

  if (end && now < end) {
    const { days, hours, minutes } = getTimeLeftString(end);
    if (days) {
      return `Ending in ${days}D ${hours}H`;
    } else {
      return `Ending in ${hours}H ${minutes}M`;
    }
  }

  if (end && now > end) {
    return `Ended on ${format(new Date(end), "hh:mm a dd MMM")}`;
  }

  return "";
};

export function getChallengeTimingString(start?: number, end?: number) {
  const now = Date.now();
  if (end && now > end) {
    return undefined;
  }
  if (start && now < start) {
    const { days, hours, minutes } = calculateRemainingTimeToFuture(start);
    if (!days && !minutes && !hours) {
      return undefined;
    }
    if (days > 1 && hours > 1) return `in ${days} days ${hours} hours`;
    else if (days > 1 && hours <= 1) return `in ${days} days`;
    else if (days === 1 && hours > 1) return `in ${days} day ${hours} hours`;
    else if (days === 1 && hours <= 1) `in ${days} day`;
    else if (days < 1) {
      return `in ${hours} ${hours > 1 ? "hours" : "hour"} ${minutes} ${
        minutes > 1 ? "minutes" : "minute"
      }`;
    }
  }

  return undefined;
}

export function timimgGap(start?: number) {
  const now = Date.now();
  if (start && now < start) {
    const { days, hours, minutes } = calculateRemainingTimeToFuture(start);
    if (!days && !minutes && !hours) {
      return undefined;
    }
    if (days > 1 && hours > 1) return `in ${days} days ${hours} hours`;
    else if (days > 1 && hours <= 1) return `in ${days} days`;
    else if (days === 1 && hours > 1) return `in ${days} day ${hours} hours`;
    else if (days === 1 && hours <= 1) `in ${days} day`;
    else if (days < 1) {
      return `in ${hours} ${hours > 1 ? "hours" : "hour"} ${minutes} ${
        minutes > 1 ? "minutes" : "minute"
      }`;
    }
  }

  return undefined;
}
