import { DailyDataObj } from "@hooks/progress/interface";

export type typePropTypes = "mood" | "energy" | "weight";

export type selectedFpSectionType = "All Time" | "Weekly" | "Monthly";

export interface graphDataInterface {
  default?: number;
  bar: number;
  // startDate: string;
  // endDate: string;
  weekStr: string;
  averageValue: number;
  // weekNumber: number;
  // totalOfWeek: number;
  // count: number;
}

export type ProgressCollectionType =
  | "dailyMood"
  | "dailyEnergy"
  | "dailyWeight";

export interface OpDataOverall {
  [date: string]: DailyDataObj;
}

export interface WeekData {
  startDate: string;
  endDate: string;
  weekStr: string;
}

export interface WeekDataWithDateKey {
  [date: string]: WeekData;
}

export interface WeekDataObj {
  [key: string]: number | string;
  date: string;
}

export interface graphData {
  name: string;
  uv: number;
  pv?: string;
  image?: string;
  mood?: number;
  // amt: number;
  cnt: number;
}
