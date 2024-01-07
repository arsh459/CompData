import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { goalObj } from "@models/User/User";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

// import { useTodayDate } from "@hooks/steps/useTodayDate";
// import { uuidv4 } from "react-native-compressor";
// import { useUserContext } from "@providers/user/UserProvider";

export const useTodaysGoal = (overridedDate?: string) => {
  //   const [sevenDayStreak, setStreak] = useState<number>(0);
  //   const [goalObjs, setRemoteGoalObjs] = useState<goalObj[]>([]);
  const [todaysObj, setTodaysObj] = useState<goalObj>();

  // const { user } = useUserContext();

  const { state, today } = useAuthContext();
  // const [refresh] = useState<number>(0);
  // const { date } = useTodayDate();

  // useEffect(() => {
  //   if (state.uid && date) {
  //     const getTodaysObj = async () => {
  //       const todaysGoalObj = await firestore()
  //         .collection("users")
  //         .doc(state.uid)
  //         .collection("dailyGoals")
  //         .where("date", "==", date)
  //         .get();

  //       if (todaysGoalObj.docs.length === 0) {
  //         const now = new Date();
  //         const nowStartDate = new Date(
  //           now.getFullYear(),
  //           now.getMonth(),
  //           now.getDate(),
  //           0,
  //           0,
  //           0,
  //           0
  //         );

  //         const newGoalObj: goalObj = {
  //           id: uuidv4(),
  //           unix: nowStartDate.getTime(),
  //           targetFP: user?.dailyFPTarget ? user.dailyFPTarget : 20,
  //           date: date,
  //           achievedFP: 0,
  //           nbWorkouts: 0,
  //         };

  //         await firestore()
  //           .collection("users")
  //           .doc(state.uid)
  //           .collection("dailyGoals")
  //           .doc(newGoalObj.id)
  //           .set(newGoalObj);

  //         setRefresh((p) => p + 1);
  //       }
  //     };

  //     getTodaysObj();
  //   }
  // }, [date, state.uid, user?.dailyFPTarget]);
  //   const { user } = useUserContext();

  // console.log("daily", todaysObj, overridedDate, today);

  useEffect(() => {
    if (state.uid) {
      weEventTrack("getting_daily_goal", {
        date: overridedDate ? overridedDate : today,
      });
      const list = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("dailyGoals")
        .where("date", "==", overridedDate ? overridedDate : today)
        .onSnapshot((docs) => {
          if (docs && docs.docs && docs.docs.length) {
            const remObj = docs.docs[0].data() as goalObj;
            setTodaysObj(remObj);
            // updateStreakOnFpChange(remObj.targetFP , remObj.achievedFP)
          } else {
            setTodaysObj(undefined);
          }
        });

      return () => {
        list();
      };
    }
  }, [state.uid, overridedDate, today]);

  return {
    todaysObj,
  };
};
