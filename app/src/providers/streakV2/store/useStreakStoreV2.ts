import { create } from "zustand";
import {
  PendingNotification,
  PowerUpType,
  StreakMonthDayInterface,
  streakLabel,
  streakLevelsTypes,
  streakMapInterface,
} from "../interface";
import { getToday } from "@hooks/steps/useTodayDate";
import { StreakDaysListInterface } from "../hooks/useUserStreakV2";
import { processMapToDates } from "../utils/getMonthStreaks";

// const dummyStreakData: streakData = {
//   id: "l5R0MBNGXWgZGwhy5lED",
//   startedOn: 1698796800, // 1st nov
//   activeTill: 1699315200, // 7th nov
//   // activeTill: 1699228800, // 6th nov
//   updatedOn: 1699228800, // 5th nov
//   targetDays: 7,
//   days: 5,
//   streakMap: {
//     "2023-11-01": "hit",
//     "2023-11-02": "hit",
//     "2023-11-03": "hit",
//     "2023-11-04": "freeze",
//     "2023-11-05": "hit",
//     "2023-11-11": "active",
//   },
// };

export interface streakData {
  id: string;
  startedOn: number;
  activeTill: number;
  updatedOn: number;
  targetDays: streakLevelsTypes;
  days: number;
  streakMap: streakMapInterface;
  pendingNotification?: PendingNotification;
  targetFp?: number; // add on creation from users fp target at that time
  streakStatus?: streakStatus;
  userTimeZone?: string;
  streakMonths?: string[];
  pendingActiveHitView?: boolean;
}

export type streakStatus = "active" | "inactive";
export type fetchingState = "fetching" | "fetched" | "none";
export type freezeCounterType = "inc" | "dec" | "reset";

export interface StreakStoreV2 {
  streak?: streakData;
  updateStreak: (data: streakData | undefined) => void;
  fetchStreak: fetchingState;
  showTaskModal: boolean;
  toggleTaskModal: () => void;
  getTodayStreakStatus: () => streakLabel | undefined;
  powerUps?: PowerUpType[];
  setPowerUps?: (data: PowerUpType[]) => void;
  freezeCount: number;
  setFreezCount: (data: freezeCounterType) => void;
  streakMonthDays: StreakMonthDayInterface;
  setStreakMonthDays: (data: StreakMonthDayInterface) => void;
  streakDayList: StreakDaysListInterface[];
  setStreakDayList: (data: StreakDaysListInterface[]) => void;
}

export const useStreakStore = create<StreakStoreV2>((set, get) => ({
  streak: undefined, // dummyStreakData,
  fetchStreak: "none",
  powerUps: undefined,
  freezeCount: 0,
  streakDayList: [],
  setStreakDayList: (data: StreakDaysListInterface[]) => {
    set((state) => ({
      ...state,
      streakDayList: data,
    }));
  },
  streakMonthDays: {},
  setStreakMonthDays: (data: StreakMonthDayInterface) => {
    set((state) => ({
      ...state,
      streakMonthDays: { ...state.streakMonthDays, ...data },
    }));
  },
  setFreezCount: (data: freezeCounterType) => {
    set((state) => ({
      ...state,
      freezeCount:
        data === "inc"
          ? state.freezeCount + 1
          : data === "dec" && state.freezeCount > 0
          ? state.freezeCount - 1
          : data === "reset"
          ? 0
          : state.freezeCount,
    }));
  },
  setPowerUps: (data: PowerUpType[]) => {
    set((state) => ({
      ...state,
      powerUps: data,
    }));
  },
  updateStreak: (streakData: streakData | undefined) => {
    let monthsDays: StreakMonthDayInterface = {};
    if (streakData) {
      monthsDays = processMapToDates(streakData, streakData.streakMap);
    }

    set((state) => ({
      ...state,
      streak: streakData,
      streakMonthDays: {
        ...state.streakMonthDays,
        ...monthsDays,
      },
    }));
  },
  showTaskModal: false,
  toggleTaskModal: () => {
    set((state) => ({
      ...state,
      showTaskModal: !state.showTaskModal,
    }));
  },
  getTodayStreakStatus: () => {
    const { dtString } = getToday();
    const { streak } = get();
    return streak?.streakMap[dtString];
  },
}));
