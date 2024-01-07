// import { dayRecommendationType } from "@models/User/User";
import { format } from "date-fns";

export const getPastText = (todayUnix: number, startUnix?: number) => {
  if (startUnix) {
    // const todayUnix = new Date(today).getTime();
    return getStartStatus(startUnix, todayUnix);
  }

  return;
};

export const getPastTextDiet = (todayUnix?: number, startUnix?: number) => {
  if (startUnix && todayUnix) {
    // const todayUnix = new Date(today).getTime();
    return getStartStatus(startUnix, todayUnix);
  }

  return;
};

const getStartStatus = (startUnix: number, today: number) => {
  const startDateObj = new Date(startUnix);
  const startUnixNow = new Date(
    startDateObj.getFullYear(),
    startDateObj.getMonth(),
    startDateObj.getDate(), // 1
    0,
    0,
    0,
    0
  ).getTime();

  const now = Date.now();

  if (today < startUnixNow && today > now) {
    return `Your plan will start on ${format(
      new Date(startUnixNow),
      "d MMMM"
    )}`;
  } else if (today < startUnixNow && today <= now) {
    return `Your plan was started on ${format(
      new Date(startUnixNow),
      "d MMMM"
    )}`;
  }

  return undefined;
};
