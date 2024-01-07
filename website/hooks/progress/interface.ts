import {
  dailyEnergyObj,
  dailyMoodObj,
  dailyWeightObj,
} from "@models/User/User";
import { WeekDataObj } from "@modules/ProgressModule/interface";

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

export interface AvgData {
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
