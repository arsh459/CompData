import { format } from "date-fns";

const initNowDate = new Date();

export const useTodayDate = () => {
  return {
    today: format(initNowDate, "yyyy-MM-dd"),
    todayUnix: new Date(
      initNowDate.getFullYear(),
      initNowDate.getMonth(),
      initNowDate.getDate(),
      0,
      0,
      0,
      0
    ).getTime(),
  };
};
