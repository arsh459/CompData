import * as moment from "moment-timezone";
import { UserInterface } from "../../../models/User/User";

export const getDateBucket = (tz: string, unix: number) => {
  return moment(unix).tz(tz).format("YYYY-MM-DD");
};

export const isDateInFuture = (dateString: string, timezone: string) => {
  // Parse the input date using the provided format and timezone
  const inputDate = moment.tz(dateString, "YYYY-MM-DD", timezone);

  // Get the current date in the provided timezone
  const currentDate = moment().tz(timezone);

  // Compare the input date with the current date
  return inputDate.isAfter(currentDate);
};

export const isDateInPast = (dateString: string, timezone: string) => {
  // Parse the input date using the provided format and timezone
  const inputDate = moment.tz(dateString, "YYYY-MM-DD", timezone);

  // Get the current date in the provided timezone
  const currentDate = moment().tz(timezone);
  currentDate.hours(0);
  currentDate.minutes(0);
  currentDate.seconds(0);
  currentDate.milliseconds(0);

  // console.log("inputDate", inputDate);
  // console.log("currentDate", currentDate);

  // Compare the input date with the current date
  return inputDate.isBefore(currentDate);
};

export const getDayStartForTz = (tz: string, unix: number) => {
  // console.log(new Date(unix));

  //   console.log("Here it is", moment(unix).format("hh:mm A DD MM yyyy"));

  const momentTZ = moment(unix).tz(tz);
  //   console.log("Here it now", momentTZ.format("hh:mm A DD MM yyyy"));
  momentTZ.hours(0);
  momentTZ.minutes(0);
  momentTZ.seconds(0);
  momentTZ.milliseconds(0);

  //   console.log(momentTZ.format("hh:mm A DD MM yyyy"));

  return momentTZ.valueOf();
};

export const getDayEndForTz = (tz: string, unix: number) => {
  // console.log(new Date(unix));

  //   console.log("Here it is", moment(unix).format("hh:mm A DD MM yyyy"));

  const momentTZ = moment(unix).tz(tz);
  //   console.log("Here it now", momentTZ.format("hh:mm A DD MM yyyy"));
  momentTZ.hours(0);
  momentTZ.minutes(0);
  momentTZ.seconds(0);
  momentTZ.milliseconds(0);

  //   console.log(momentTZ.format("hh:mm A DD MM yyyy"));

  return momentTZ.endOf("day").valueOf();
};

export const getDayStartForTz_DATE = (tz: string, date: string) => {
  // console.log(new Date(unix));

  const dateSplit = date.split("-");

  if (dateSplit.length === 3) {
    const momentTZ = moment().tz(tz);

    momentTZ.year(parseInt(dateSplit[0]));
    momentTZ.month(parseInt(dateSplit[1]) - 1);
    momentTZ.date(parseInt(dateSplit[2]));
    momentTZ.hours(0);
    momentTZ.minutes(0);
    momentTZ.seconds(0);
    momentTZ.milliseconds(0);

    //   console.log(momentTZ.format("hh:mm A DD MM yyyy"));

    return momentTZ.valueOf();
  }

  return undefined;
};

export const getDayEndForTz_DATE = (tz: string, date: string) => {
  // console.log(new Date(unix));

  const dateSplit = date.split("-");

  if (dateSplit.length === 3) {
    const momentTZ = moment().tz(tz);

    momentTZ.year(parseInt(dateSplit[0]));
    momentTZ.month(parseInt(dateSplit[1]) - 1);
    momentTZ.date(parseInt(dateSplit[2]));
    momentTZ.hours(0);
    momentTZ.minutes(0);
    momentTZ.seconds(0);
    momentTZ.milliseconds(0);

    //   console.log(momentTZ.format("hh:mm A DD MM yyyy"));

    return momentTZ.endOf("day").valueOf();
  }

  return undefined;
};

export const getNotificationTime = (
  tz: string,
  date: number,
  month: number,
  year: number,
  hour: number,
  minute: number,
) => {
  const momentObj = moment().tz(tz);

  momentObj.year(year);
  momentObj.month(month);
  momentObj.date(date);
  momentObj.hours(hour);
  momentObj.minutes(minute);
  momentObj.seconds(0);
  momentObj.milliseconds(0);

  return momentObj.valueOf();
};

export const getTimezone = (user: UserInterface) => {
  if (
    user.recommendationConfig?.timezone &&
    user.recommendationConfig.timezone.tzString
  ) {
    return user.recommendationConfig.timezone.tzString;
  }

  return "Asia/Kolkata";
};

export const getTodayDate = (tz: string) => {
  const now = Date.now();
  const nowStart = getDayStartForTz(tz, now);
  const todayDate = getDateBucket(tz, nowStart);
  return {todayDate , todayUnix: nowStart};
};
