import { create } from "zustand";

export interface progressStore {
  update: number;
  toggleUpdate: () => void;
}

export const useProgressStore = create<progressStore>((set, get) => ({
  update: 0,
  toggleUpdate: () => {
    set((prev) => ({
      ...prev,
      update: prev.update + 1,
    }));
  },
}));
