import {
  diagnosedPeriodType,
  fitnessGoalTypes,
  FoodEnum,
} from "@models/User/User";
import {
  mansiUID,
  maitreeUID,
  monaUID,
  nishaUID,
  sauravUID,
} from "@templates/joinBoatTemplate/V6/utils";
import { format } from "date-fns";
import * as moment from "moment-timezone";

export const getUserAgentName = (doctorId?: string) => {
  if (doctorId === monaUID) {
    return "Dr Mona";
  } else if (doctorId === maitreeUID) {
    return "Dr Maitree";
  } else if (doctorId === mansiUID) {
    return "Mansi";
  } else if (doctorId === nishaUID) {
    return "Nisha";
  } else if (doctorId === sauravUID) {
    return "Saurav";
  } else if (doctorId) {
    return "Unknown";
  }

  return "NA";
};

export const getUserListCardColors = (value?: fitnessGoalTypes) => {
  if (value === "pcos_pcod" || value === "regularise_cycle") {
    return {
      borderColor: "#FDC1DD",
      textColor: "#F62088",
    };
  } else if (value === "lose_weight") {
    return {
      borderColor: "#D8C1FD",
      textColor: "#0000FF",
    };
  } else {
    return {
      borderColor: "#C4E1E0",
      textColor: "#128983",
    };
  }
};

export const calculateUserBMI = (height?: number, weight?: number) => {
  if (typeof height === "number" && typeof weight === "number") {
    return (weight / Math.pow((height * 2.54) / 100, 2)).toFixed(2);
  }
  return undefined;
};

export const getArrayString = (arr?: string[]) => arr?.join(", ");

export const getBooleanStringData = (state?: boolean, data?: string) => {
  if (!state) {
    return "None";
  }

  if (state && !data) {
    return `Yes. Patient hasn't provided specifics`;
  }

  return `Yes\n${data}`;
};

export const getTrueKeysString = (
  obj?: Record<string, boolean | undefined>
): string => {
  if (!obj) {
    return "";
  }

  const trueKeys = Object.keys(obj).filter((key) => obj[key] === true);

  if (trueKeys.length === 0) {
    return "";
  }

  return trueKeys.join(", ");
};

export const formatUnixTimestamp = (unixTimestamp: number) => {
  const dateIST = new Date(unixTimestamp);
  return format(dateIST, "dd MMM, h:mma");
};

export const unixToDestinationTimezone = (
  localUnix: number,
  targetTimezone?: string
): number | undefined => {
  const localTargetTime = unixToTimeInTimezone(localUnix);

  const hrMinString = localTargetTime.split(":");
  if (hrMinString.length === 2) {
    const timeInTimezone = moment.tz(
      targetTimezone ? targetTimezone : "Asia/Kolkata"
    );
    timeInTimezone.hour(parseInt(hrMinString[0]));
    timeInTimezone.minute(parseInt(hrMinString[1]));
    timeInTimezone.second(0);

    const unixTimestamp = timeInTimezone.unix();

    return unixTimestamp * 1000;
  }
};

export function unixToTimeInTimezone(
  unixTimestamp: number,
  timezone?: string
): string {
  // Convert the Unix timestamp to a JavaScript Date object
  const date = new Date(unixTimestamp); // Unix timestamp is in seconds, JS Date expects milliseconds

  // Use the Intl.DateTimeFormat API to format the date in the desired timezone
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...(timezone ? { timeZone: timezone } : {}),
  };

  const timeString = new Intl.DateTimeFormat("en-US", options).format(date);

  return timeString;
}

export const getLocalUnixForUnix = (
  unixTimestamp: number,
  timezone: string
) => {
  const updatedString = unixToTimeInTimezone(unixTimestamp, timezone);
  const newDate = new Date();

  const hrMinString = updatedString.split(":");
  if (hrMinString.length === 2) {
    const localDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      parseInt(hrMinString[0]),
      parseInt(hrMinString[1]),
      0,
      0
    );

    return localDate.getTime();
  }

  return undefined;
};

export const formatFoodTimings = (
  mealTimes: Partial<Record<FoodEnum, number>>,
  userTimezone: string
) => {
  const formattedTimes: string[] = [];

  Object.keys(FoodEnum).forEach((each) => {
    const timestamp = mealTimes[each as FoodEnum];
    if (!timestamp) {
      return "";
    }

    const formattedHHMM = unixToTimeInTimezone(timestamp, userTimezone);
    // console.log("formattedHHMM", formattedHHMM, each);

    // const formattedTime = format(timestamp, "h:mma");
    const formattedMeal = `${formattedHHMM} ${
      each[0].toUpperCase() + each.slice(1)
    }`;
    formattedTimes.push(formattedMeal);
  });

  return formattedTimes.join(", ");
};

export const getCommaSepratedIssues = (
  obj?: Record<string, boolean | undefined>,
  text?: string
): string => {
  if (!obj && !text) {
    return "";
  }
  const value = getTrueKeysString(obj);
  if (text) {
    return `${value}, ${text}`;
  } else {
    return value;
  }
  return "NA";
};

export const getLastPCOSDate = (
  diagnosedPeriod?: diagnosedPeriodType,
  signupTime?: number
) => {
  if (!diagnosedPeriod) {
    return "NA";
  }

  if (diagnosedPeriod && signupTime) {
    if (diagnosedPeriod === "just_got_diagnosed") {
      return format(signupTime, "do MMMM yy");
    } else if (diagnosedPeriod === "3_6_months") {
      return format(signupTime - 4.5 * 30 * 24 * 60 * 60 * 1000, "do MMMM yy");
    } else if (diagnosedPeriod === "more_than_6_months") {
      return `before ${format(
        signupTime - 6 * 30 * 24 * 60 * 60 * 1000,
        "do MMMM yy"
      )}`;
    }
  }

  return diagnosedPeriod;
};
