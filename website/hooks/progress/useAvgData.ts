import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@config/firebase";
import {
  getNearestMondayFromFirstWeekOfMonth,
  getNearestSundayToEndOfLastWeekOfMonth,
} from "@modules/ProgressModule/utils/dateUtils";
import {
  calculateOverallAvg,
  calculateWeeklyAvgsV2,
} from "@modules/ProgressModule/utils/avarageUtils";
import { getEmojiByEnergy } from "@modules/ProgressModule/EnergyTracker/utils";
import { getEmojiByMood } from "@modules/ProgressModule/MoodTracker/utils";
import { AvgData, DailyDataObj } from "./interface";
import {
  OpDataOverall,
  ProgressCollectionType,
  typePropTypes,
} from "@modules/ProgressModule/interface";

const useAvgData = (
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

        const startFromMondayOfMonth = nearestMonday.getTime();
        const endFromSundayOfMonth = nearestSunday.getTime();

        const todayDate = format(new Date(), "yyyy-MM-dd");
        // let allData: goalObj[] = [];
        const opData: OpDataOverall = {};
        // let prevWeekAvg;
        const unsubscribe = onSnapshot(
          query(
            collection(db, `users/${uid}/${collectionName}`),
            where("unix", ">=", startFromMondayOfMonth),
            where("unix", "<=", endFromSundayOfMonth),
            orderBy("unix", "asc")
          ),
          (querySnapshot) => {
            if (querySnapshot) {
              querySnapshot.forEach((doc) => {
                const activity = doc.data() as DailyDataObj;

                if (activity.unix) {
                  opData[activity.date] = activity;
                }
              });

              const overallAvg = calculateOverallAvg(
                Object.values(opData),
                type
              );

              const today = opData[todayDate]
                ? opData[todayDate][type]
                : undefined;

              const { weeks, currentWeekData } = calculateWeeklyAvgsV2(
                opData,
                type,
                nearestMonday,
                nearestSunday
              );

              let prevWeekAvg = 0;
              if (currentWeekData.currentWeekNumber) {
                prevWeekAvg = weeks[currentWeekData.currentWeekNumber - 2]
                  ? weeks[currentWeekData.currentWeekNumber - 2]?.averageValue
                  : 0;
              }

              setAvgData({
                overallAvg: overallAvg,
                today: today,
                weeklyAvgs: weeks,
                currentWeekData: currentWeekData,
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
          }
        );
      }
    } catch (error: any) {
      console.log("error");
    }
  }, [uid, type, collectionName]);

  return { ...avgData, loading, maxEnergy: 3, maxMood: 5 };
};

export default useAvgData;
