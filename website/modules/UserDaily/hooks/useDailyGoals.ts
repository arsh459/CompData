import { db } from "@config/firebase";
import { goalObj } from "@models/User/User";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useDailyGoals = (uid: string, st: number, en: number) => {
  const [savedDailyGoals, setSavedDailyGoals] = useState<{
    [date: string]: goalObj;
  }>({});
  const [dts, setDateObjs] = useState<string[]>([]);
  useEffect(() => {
    const getDailyGoals = async () => {
      const userDocs = await getDocs(
        query(
          collection(doc(db, "users", uid), "dailyGoals"),
          where("unix", ">=", st),
          where("unix", "<=", en),
          orderBy("unix", "asc")
        )
      );

      const remoteDts: string[] = [];
      const dailyGoalObjs: { [id: string]: goalObj } = {};
      for (const doc of userDocs.docs) {
        const remoteObj = doc.data() as goalObj;
        dailyGoalObjs[remoteObj.date] = remoteObj;
        remoteDts.push(remoteObj.date);
      }

      setDateObjs(remoteDts);
      setSavedDailyGoals(dailyGoalObjs);
    };

    getDailyGoals();
  }, [uid, st, en]);

  return {
    savedDailyGoals,
    dts,
  };
};
