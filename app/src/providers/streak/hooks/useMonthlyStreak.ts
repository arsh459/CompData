import { useCallback, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { goalObj, localGoalObj } from "@models/User/User";
import { getBaseStreak_days } from "./getBaseStreak";
import { useUserContext } from "@providers/user/UserProvider";
import { DateData } from "react-native-calendars";
import { getDaysInMonth } from "date-fns";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export const useMonthlyStreak = () => {
  //   const [sevenDayStreak, setStreak] = useState<number>(0);
  const [goalObjs, setRemoteGoalObjs] = useState<{
    [date: string]: localGoalObj;
  }>({});
  const { today } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [viewDt, setViewDt] = useState<Date>(new Date());
  // const [selectedGoalObj, setSelectedGoalObj] = useState<string | undefined>(
  //   today
  // );

  const onMonthChange = useCallback((obj: DateData) => {
    setLoading(true);
    const days = getDaysInMonth(obj.timestamp);

    setViewDt(new Date(obj.year, obj.month - 1, days, 23, 59, 59, 0));

    weEventTrack("StreakDaysScreen_changeMonth", { month: obj.month });
  }, []);

  const { state } = useAuthContext();
  const { user } = useUserContext();
  useEffect(() => {
    if (state.uid && viewDt) {
      // const now = new Date();
      // const dateToday = viewDt.getDate();
      const monthStart = new Date(
        viewDt.getFullYear(),
        viewDt.getMonth(),
        1,
        0,
        0,
        0,
        0
      );

      //   const daysToStart = dayToday - 1 >= 0 ? dayToday - 1 : 0;

      // wed morning.
      // const nowStartDate = new Date(
      //   viewDt.getFullYear(),
      //   viewDt.getMonth(),
      //   viewDt.getDate(),
      //   0,
      //   0,
      //   0,
      //   0
      // );

      const nowStart = viewDt.getTime();

      const now_St = monthStart.getTime();

      const baseStreak = getBaseStreak_days(
        now_St,
        user?.dailyFPTarget ? user.dailyFPTarget : 100,
        (nowStart - now_St) / (24 * 60 * 60 * 1000)
      );

      const list = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("dailyGoals")
        .where("unix", ">=", now_St)
        .where("unix", "<=", nowStart)
        .orderBy("unix", "asc")
        .onSnapshot((docs) => {
          const remoteGoalObjs: { [date: string]: goalObj } = {};

          if (docs) {
            for (const doc of docs.docs) {
              const document = doc.data() as goalObj | null;
              if (document) {
                remoteGoalObjs[document.date] = document;

                if (document.achievedFP >= document.targetFP) {
                  // streak++;
                }
              }
            }
          }

          const finalGoalObj: { [date: string]: localGoalObj } = {};
          // let selectedObj: localGoalObj | undefined = undefined;
          for (const baseObj of baseStreak) {
            const remoteObj = remoteGoalObjs[baseObj.date];

            if (remoteObj) {
              finalGoalObj[baseObj.date] = {
                ...remoteObj,
                isFuture: baseObj.isFuture,
              };

              // if (remoteObj.date === today) {
              // selectedObj = { ...remoteObj, isFuture: false };
              // }
            } else {
              finalGoalObj[baseObj.date] = baseObj;
            }
          }

          setLoading(false);
          setRemoteGoalObjs(finalGoalObj);
        });

      return () => {
        list();
      };
    }
  }, [state.uid, user?.dailyFPTarget, viewDt, today]);

  return {
    goalObjs,
    onMonthChange,
    loading,
    // setSelectedGoalObj,
    // selectedGoalObj,
  };
};
