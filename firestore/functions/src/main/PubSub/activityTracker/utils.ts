import * as moment from "moment-timezone";

export const getDayEndIST = (unix: number) => {
  const timeMoment = moment(unix);
  const formattedYMD = timeMoment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  return new Date(`${formattedYMD} 23:59 +5:30`).getTime();
};

export const getDayStartIST = (unix: number) => {
  const timeMoment = moment(unix);

  const formattedYMD = timeMoment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  // const formattedYMD_hm = timeMoment
  //   .tz("Asia/Kolkata")
  //   .format("YYYY-MM-DD h:mma");
  //console.log("formattedYMD", formattedYMD);
  // console.log("formattedYMD_hm", formattedYMD_hm);
  // console.log(
  //   "new Date(`${formattedYMD} 00:00`)",
  //   new Date(`${formattedYMD} 00:00`),
  // );
  return new Date(`${formattedYMD} 00:00 +5:30`).getTime();
  //  +
  // 5 * 60 * 60 * 1000 +
  // 30 * 60 * 1000
};

export const getFormattedDateForUnix = (unix: number, format?: string) => {
  const timeMoment = moment(unix);

  return timeMoment.tz("Asia/Kolkata").format(format ? format : "YYYY-MM-DD");
};

export const getFormattedDateForUnixWithTZ = (
  unix: number,
  timezone: string,
  format?: string,
) => {
  const timeMoment = moment(unix);

  return timeMoment.tz(timezone).format(format ? format : "YYYY-MM-DD");
};

export const getFormattedDateFormat2ForUnix = (unix: number) => {
  const timeMoment = moment(unix);

  return timeMoment.tz("Asia/Kolkata").format("ddd MMM DD YYYY");
};

export const getUnixDayStartForFormattedDate = (dateString: string) => {
  return new Date(`${dateString} 00:05 +5:30`).getTime();
};

export const get1159Adder = () => {
  return 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000;
};

export const formatDate = (date: Date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const getNowISTTime = () => {
  const currentTime = new Date();

  const currentOffset = currentTime.getTimezoneOffset();

  const ISTOffset = 330; // IST offset UTC +5:30

  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000,
  );

  return ISTTime;
};

export const getISTVariantForTime = (currentTime: Date) => {
  // const currentTime = new Date();

  const currentOffset = currentTime.getTimezoneOffset();

  const ISTOffset = 330; // IST offset UTC +5:30

  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000,
  );

  return ISTTime;
};
