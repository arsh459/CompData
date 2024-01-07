import { useEffect, useState } from "react";
import { format } from "date-fns";
import firestore from "@react-native-firebase/firestore";
import {
  calculateOverallAvg,
  calculateWeeklyAvgsV2,
  getEmojiByEnergy,
  getEmojiByMood,
  getNearestMondayFromFirstWeekOfMonth,
  getNearestSundayToEndOfLastWeekOfMonth,
  OpDataOverall,
  ProgressCollectionType,
  typePropTypes,
  WeekDataObj,
} from "@modules/JourneyLogHome/utils";
import {
  dailyEnergyObj,
  dailyMoodObj,
  dailyWeightObj,
} from "@models/User/User";
import crashlytics from "@react-native-firebase/crashlytics";

export interface CurrentWeekData {
  currentWeekAvg: number;
  weekDataObj: WeekDataObj[];
  currentWeekNumber?: number;
  weekString: string;
  weekStatus: string;
}

export interface WeeklyAvgObj {
  startDate: string;
  endDate: string;
  weekStr: string;
  averageValue: number;
  weekNumber: number;
  totalOfWeek: number;
  count: number;
}

interface AvgData {
  overallAvg: number;
  today?: number;
  weeklyAvgs: WeeklyAvgObj[];
  currentWeekData?: CurrentWeekData; // WeekDataObj[];
  currentWeekAvg: number;
  currentWeekNumber: number;
  prevWeekAvg?: number;
  monthlyStatus: string;
  monthlyText: string;
}
export interface DailyDataObj
  extends dailyMoodObj,
    dailyWeightObj,
    dailyEnergyObj {}

const useAvgDataV2 = (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  uid?: string
) => {
  const [avgData, setAvgData] = useState<AvgData>({
    overallAvg: 0,
    today: undefined,
    weeklyAvgs: [],
    // currentWeekData: {},
    prevWeekAvg: undefined,
    currentWeekAvg: 0,
    currentWeekNumber: 0,
    monthlyStatus: "",
    monthlyText: "",
    // weeklyStatus: "",
    // weeklyText: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      if (uid && type && collectionName) {
        setLoading(true);
        const nearestMonday = getNearestMondayFromFirstWeekOfMonth();

        const nearestSunday = getNearestSundayToEndOfLastWeekOfMonth();
        // const valMS = getNearestMondayFromFirstWeekOfMonth(
        //   new Date("2023-01-11")
        // );
        // const valME = getNearestSundayToEndOfLastWeekOfMonth(
        //   new Date("2023-01-11")
        const startFromMondayOfMonth = nearestMonday.getTime();
        const endFromSundayOfMonth = nearestSunday.getTime();

        const todayDate = format(new Date(), "yyyy-MM-dd");
        // let allData: goalObj[] = [];
        const opData: OpDataOverall = {};
        let prevWeekAvg;
        const unsubscribe = firestore()
          .collection("users")
          .doc(uid)
          .collection(collectionName)
          .where("unix", ">=", startFromMondayOfMonth)
          .where("unix", "<=", endFromSundayOfMonth)
          .orderBy("unix", "asc")
          .onSnapshot((querySnapshot) => {
            if (querySnapshot) {
              // const remoteData: DailyDataObj[] = [];

              for (const doc of querySnapshot.docs) {
                const activity = doc.data() as DailyDataObj;

                if (activity.unix) {
                  // remoteData.push(activity);
                  opData[activity.date] = activity;
                }
              }

              // allData = remoteData as goalObj[];

              // const overallData = remoteData;

              const overallAvg = calculateOverallAvg(
                Object.values(opData),
                type
              );

              const today = opData[todayDate]
                ? opData[todayDate][type]
                : undefined;

              // const today = todayData;
              const { weeks, currentWeekData } = calculateWeeklyAvgsV2(
                opData,
                type,
                nearestMonday,
                nearestSunday
              );

              if (currentWeekData.currentWeekNumber) {
                // prevWeekAvg = weeks[currentWeekData.currentWeekNumber - 1]
                //   ? weeks[currentWeekData.currentWeekNumber - 1]?.averageValue
                //   : calculatePrevWeekAvg(overallData, type);
                prevWeekAvg = weeks[currentWeekData.currentWeekNumber - 1]
                  ? weeks[currentWeekData.currentWeekNumber - 1]?.averageValue
                  : 0;
              } else {
                prevWeekAvg = 0;
              }

              setAvgData({
                overallAvg: overallAvg,
                today: today,
                weeklyAvgs: weeks,
                currentWeekData: currentWeekData, // currentWeekData.weekDataObj,
                currentWeekAvg: currentWeekData.currentWeekAvg,
                currentWeekNumber: currentWeekData.currentWeekNumber,
                prevWeekAvg: prevWeekAvg,
                monthlyStatus:
                  type === "energy"
                    ? getEmojiByEnergy(Math.ceil(overallAvg)).text
                    : type === "mood"
                    ? getEmojiByMood(Math.ceil(overallAvg)).text
                    : "",
                monthlyText: `Your overall ${type} for the month is`,
              });
            }
            setLoading(false);
            return () => {
              unsubscribe();
            };
          });
      }
    } catch (error: any) {
      console.log("error");
      crashlytics().recordError(error);
    }
  }, [uid, type, collectionName]);

  return { ...avgData, loading };
};

export default useAvgDataV2;
