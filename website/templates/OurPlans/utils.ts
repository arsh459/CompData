import { getPrefixSuffix } from "@constants/organization";

export const getPlanMonthHeadings = (durationInDays?: number) => {
  if (!durationInDays) return "";
  const duration = getPrefixSuffix(durationInDays ? durationInDays : 0);
  if (duration) {
    return duration.prefix === 1
      ? "1 Month Trial"
      : `${duration.prefix} Months Plan`;
  }
  return "";
};

export const getNumberOfMonth = (numberDuration?: number) => {
  if (numberDuration === 30) {
    return 1;
  } else if (numberDuration === 90) {
    return 3;
  } else if (numberDuration === 365) {
    return 12;
  }
  return 0;
};
