import { isAfter } from "date-fns";

export const isAfterNoon = () => {
  const now = new Date();
  const noon = new Date();
  noon.setHours(12, 0, 0, 0);
  return isAfter(now, noon);
};
