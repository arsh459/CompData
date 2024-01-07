import { useIsForeground } from "@hooks/utils/useIsForeground";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export const getToday = () => {
  const nowDate = new Date();

  return {
    dtString: format(nowDate, "yyyy-MM-dd"),
    unix: new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      nowDate.getDate(),
      0,
      0,
      0,
      0
    ).getTime(),
  };
};

const initNowDate = new Date();

export const useTodayDate = () => {
  const [date, setTodayDate] = useState<string>(
    format(initNowDate, "yyyy-MM-dd")
  );
  const [dateUnix, setTodayUnix] = useState<number>(
    new Date(
      initNowDate.getFullYear(),
      initNowDate.getMonth(),
      initNowDate.getDate(),
      0,
      0,
      0,
      0
    ).getTime()
  );

  const { appStateVisible } = useIsForeground();

  useEffect(() => {
    if (appStateVisible === "active") {
      const dtInit = getToday();
      setTodayUnix((p) => (dtInit.unix !== p ? dtInit.unix : p));
      setTodayDate((p) => (dtInit.dtString !== p ? dtInit.dtString : p));
      const interval = setInterval(() => {
        const dt = getToday();
        setTodayUnix((p) => (dt.unix !== p ? dt.unix : p));
        setTodayDate((p) => (dt.dtString !== p ? dt.dtString : p));
      }, 5 * 60 * 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [appStateVisible]);

  return {
    date: date,
    dateUnix: dateUnix,
  };
};
