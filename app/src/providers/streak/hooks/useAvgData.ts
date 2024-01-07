import { useEffect, useState } from "react";
import { format } from "date-fns";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  calculateOverallAvg,
  calculatePrevWeekAvg,
  calculateWeeklyAvgsV2,
  getNearestMondayFromFirstWeekOfMonth,
  getNearestSundayToEndOfLastWeekOfMonth,
  OpDataOverall,
  typePropTypes,
  WeekDataObj,
} from "@modules/JourneyLogHome/utils";
import { goalObj } from "@models/User/User";

export interface CurrentWeekData {
  currentWeekAvg: number;
  weekDataObj: WeekDataObj[];
}
interface AvgData {
  overallAvg: number;
  today?: number;
  weeklyAvgs: {
    startDate: string;
    endDate: string;
    weekStr: string;
    averageValue: number;
    weekNumber: number;
    totalOfWeek: number;
  }[];
  currentWeekData: WeekDataObj[];
  currentWeekAvg: number;
  prevWeekAvg?: number;
}

const useAvgData = (type: typePropTypes, uid?: string) => {
  const [avgData, setAvgData] = useState<AvgData>({
    overallAvg: 0,
    today: undefined,
    weeklyAvgs: [],
    currentWeekData: [],
    prevWeekAvg: undefined,
    currentWeekAvg: 0,
  });

  useEffect(() => {
    try {
      if (uid && type) {
        const nearestMonday = getNearestMondayFromFirstWeekOfMonth();

        const nearestSunday = getNearestSundayToEndOfLastWeekOfMonth();

        const startFromMondayOfMonth = nearestMonday.getTime();
        const endFromSundayOfMonth = nearestSunday.getTime();

        const todayDate = format(new Date(), "yyyy-MM-dd");
        // let allData: goalObj[] = [];
        const opData: OpDataOverall = {};
        const unsubscribe = firestore()
          .collection("users")
          .doc(uid)
          .collection("dailyGoals")
          .where("unix", ">=", startFromMondayOfMonth)
          .where("unix", "<=", endFromSundayOfMonth)
          .orderBy("unix", "asc")
          .onSnapshot((querySnapshot) => {
            if (querySnapshot) {
              const remoteData: goalObj[] = [];

              for (const doc of querySnapshot.docs) {
                const activity = doc.data() as goalObj;
                if (activity.unix) {
                  remoteData.push(activity);
                  opData[activity.date] = activity;
                }
              }

              // allData = remoteData as goalObj[];

              const overallData = remoteData;

              const overallAvg = calculateOverallAvg(overallData, type);
              const todayData = opData[todayDate]
                ? opData[todayDate][type]
                : undefined;

              const today = todayData;
              const { weeks, currentWeekData } = calculateWeeklyAvgsV2(
                opData,
                type,
                nearestMonday,
                nearestSunday
              );

              const prevWeekAvg = calculatePrevWeekAvg(overallData, type);

              setAvgData({
                overallAvg: overallAvg,
                today: today,
                weeklyAvgs: weeks,
                currentWeekData: currentWeekData.weekDataObj,
                currentWeekAvg: currentWeekData.currentWeekAvg,
                prevWeekAvg: prevWeekAvg,
              });
            }

            return () => {
              unsubscribe();
            };
          });
      }
    } catch (error: any) {
      console.log("error");
      crashlytics().recordError(error);
    }
  }, [uid, type]);

  const currentWeek = {
    currentWeekAvg: avgData.currentWeekAvg,
    weekDataObj: avgData.currentWeekData,
  };

  return {
    overallAvg: avgData.overallAvg,
    today: avgData.today,
    weeklyAvgs: avgData.weeklyAvgs,
    currentWeekData: currentWeek,
    prevWeekAvg: avgData.prevWeekAvg,
  };
};

export default useAvgData;

// for (let i = 0; i < 12; i++) {
//   // Get the date for the first day of the month
//   const currentDate = new Date(2023, i, 1);

//   // Get the nearest Monday and Sunday for the month
//   const nearestMonday = getNearestMondayFromFirstWeekOfMonth(currentDate);
//   const nearestSunday = getNearestSundayToEndOfLastWeekOfMonth(currentDate);
// }
