import { db } from "@config/firebase";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { Cycle } from "@models/User/User";
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

export const useLastCycle = (uid?: string) => {
  const { todayUnix } = useTodayDate();

  const [lastCycle, setLastCycle] = useState<Cycle>();

  useEffect(() => {
    const getLastCycle = async () => {
      if (uid) {
        const cycles = await getDocs(
          query(
            collection(doc(db, "users", uid), "cycles"),
            where("endUnix", "<=", todayUnix),
            orderBy("endUnix", "desc"),
            limit(1)
          )
        );

        if (cycles.docs.length && cycles.docs[0].data()) {
          const cycleObj = cycles.docs[0].data() as Cycle;

          setLastCycle(cycleObj);
        }
      }
    };

    getLastCycle();
  }, [uid, todayUnix]);

  return { lastCycle };
};
