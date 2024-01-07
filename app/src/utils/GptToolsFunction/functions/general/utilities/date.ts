import { format, isAfter } from "date-fns";
export const isInFuture = (date: string) => {
  const dateProvided = new Date(date);
  const dateToday = new Date(format(Date.now(), "yyyy-MM-dd"));
  if (isAfter(dateProvided, dateToday)) return true;

  return false;
};
