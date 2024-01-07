import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { goalObj, localGoalObj } from "@models/User/User";
import { getBaseStreak } from "./getBaseStreak";
import { useUserContext } from "@providers/user/UserProvider";
import { format } from "date-fns";

export const useUserStreak = () => {
  const [sevenDayStreak, setStreak] = useState<number>(0);
  const [goalObjs, setRemoteGoalObjs] = useState<localGoalObj[]>([]);
  const [todaysObj, setTodaysObj] = useState<goalObj>();

  const { state } = useAuthContext();
  const { user } = useUserContext();

  useEffect(() => {
    if (state.uid) {
      const now = new Date();
      const dayToday = now.getDay();

      const daysToMonday = dayToday - 1 >= 0 ? dayToday - 1 : 0;

      // wed morning.
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

      const list = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("dailyGoals")
        .where("unix", ">=", now_St)
        .orderBy("unix", "asc")
        .onSnapshot((docs) => {
          const remoteGoalObjs: { [date: string]: goalObj } = {};
          let streak: number = 0;

          if (docs) {
            for (const doc of docs.docs) {
              const document = doc.data() as goalObj | null;
              if (document) {
                remoteGoalObjs[document.date] = document;

                if (document.achievedFP >= document.targetFP) {
                  streak++;
                }
              }
            }
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
  }, [state.uid, user?.dailyFPTarget]);

  return {
    sevenDayStreak,
    goalObjs,
    todaysObj,
  };
};
