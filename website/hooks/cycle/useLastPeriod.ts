import { db } from "@config/firebase";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { PeriodDateObj } from "@models/User/User";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useLastPeriod = (uid?: string) => {
  const { todayUnix } = useTodayDate();

  const [lastPeriod, setLastPeriod] = useState<PeriodDateObj>();

  useEffect(() => {
    const getLastPeriod = async () => {
      if (uid) {
        const periods = await getDocs(
          query(
            collection(doc(db, "users", uid), "periodDates"),
            where("type", "==", "PERIOD"),
            where("unix", "<=", todayUnix),
            orderBy("unix", "desc"),
            limit(1)
          )
        );

        if (periods.docs.length && periods.docs[0].data()) {
          const periodObj = periods.docs[0].data() as PeriodDateObj;

          setLastPeriod(periodObj);
        }
      }
    };

    getLastPeriod();
  }, [uid, todayUnix]);

  return { lastPeriod };
};
