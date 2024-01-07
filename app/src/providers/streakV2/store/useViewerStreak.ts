import { create } from "zustand";
import { streakData } from "./useStreakStoreV2";

export interface ViewerStreakStore {
  streak?: streakData;
  setStreak: (newStreak: streakData | undefined) => void;
}

export const useViewerStreakStore = create<ViewerStreakStore>((set, get) => ({
  setStreak: (newStreak: streakData | undefined) => {
    set((state) => ({ ...state, streak: newStreak }));
  },
}));
