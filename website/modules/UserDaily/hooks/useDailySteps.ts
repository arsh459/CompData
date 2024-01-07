import { db } from "@config/firebase";
import { StepsDoc } from "@models/User/User";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useDailySteps = (uid: string, st: number, en: number) => {
  const [savedDailySteps, setSavedDailySteps] = useState<{
    [date: string]: StepsDoc;
  }>({});
  useEffect(() => {
    const getDailyGoals = async () => {
      const userDocs = await getDocs(
        query(
          collection(doc(db, "users", uid), "steps"),
          where("unix", ">=", st),
          where("unix", "<=", en),
          orderBy("unix", "asc")
        )
      );

      const dailyGoalObjs: { [date: string]: StepsDoc } = {};
      for (const doc of userDocs.docs) {
        const remoteObj = doc.data() as StepsDoc;
        dailyGoalObjs[remoteObj.date] = remoteObj;
      }

      setSavedDailySteps(dailyGoalObjs);
    };

    getDailyGoals();
  }, [uid, st, en]);

  return {
    savedDailySteps,
  };
};
