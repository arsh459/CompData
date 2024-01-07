import { UserInterface } from "@models/User/User";
import { getStartTime } from "@modules/ProPlanModule/utils";
import { format } from "date-fns";

export const hasWorkoutStarted = (user?: UserInterface) => {
  if (user?.badgeId) {
    const startTime = getStartTime(user, user.badgeId, "workout");

    if (user.badgeId === user.badgeIdEnrolled && user.badgeId && startTime) {
      return true;
    } else {
      return false;
    }
  }
};

export const getTimeOfDay = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    return "Evening";
  } else {
    return "Night";
  }
};

export const getPastText = (todayUnix: number, startUnix?: number) => {
  if (startUnix) {
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
