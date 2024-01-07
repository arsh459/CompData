import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { goalObj, localGoalObj, UserInterface } from "@models/User/User";
import { format } from "date-fns";
import { db } from "@config/firebase";
import { getBaseStreak } from "./utils";

const useUserStreak = (user: UserInterface) => {
  const [sevenDayStreak, setStreak] = useState<number>(0);
  const [goalObjs, setRemoteGoalObjs] = useState<localGoalObj[]>([]);
  const [todaysObj, setTodaysObj] = useState<goalObj>();

  useEffect(() => {
    if (user?.uid) {
      const now = new Date();
      const dayToday = now.getDay();

      const daysToMonday = dayToday - 1 >= 0 ? dayToday - 1 : 0;

      const nowStartDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );
      const nowStart = nowStartDate.getTime();
      const nowDate = format(nowStartDate, "yyyy-MM-dd");

      const now_St = nowStart - daysToMonday * 24 * 60 * 60 * 1000;

      const baseStreak = getBaseStreak(
        now_St,
        user?.dailyFPTarget ? user.dailyFPTarget : 100
      );
      // console.log({ baseStreak });

      const collectionRef = collection(db, `users/${user.uid}/dailyGoals`);
      const q = query(
        collectionRef,
        where("unix", ">=", now_St),
        orderBy("unix", "asc")
      );

      const list = onSnapshot(q, (querySnapshot) => {
        const remoteGoalObjs: { [date: string]: goalObj } = {};
        let streak: number = 0;

        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            const document = doc.data() as goalObj | null;
            if (document) {
              remoteGoalObjs[document.date] = document;

              if (document.achievedFP >= document.targetFP) {
                streak++;
              }
            }
          });
        }

        let remTodaysObj: goalObj | undefined;
        const remoteGoalList: localGoalObj[] = [];
        for (const baseObj of baseStreak) {
          const remoteObj = remoteGoalObjs[baseObj.date];

          if (remoteObj) {
            remoteGoalList.push({ ...remoteObj, isFuture: baseObj.isFuture });
          } else {
            remoteGoalList.push(baseObj);
          }

          if (remoteObj?.date === nowDate) {
            remTodaysObj = remoteObj;
          } else if (baseObj.date === nowDate) {
            remTodaysObj = baseObj;
          }
        }

        setTodaysObj(remTodaysObj);
        setRemoteGoalObjs(remoteGoalList);
        setStreak(streak);
      });

      return () => {
        list();
      };
    }
  }, [user?.uid, user?.dailyFPTarget]);

  return {
    sevenDayStreak,
    goalObjs,
    todaysObj,
  };
};

export default useUserStreak;
