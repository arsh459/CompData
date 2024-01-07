import { create } from "zustand";

export interface roadmapUpdateStore {
  updateMap: boolean;
  setUpdate: (newVal: boolean) => void;
}

export const useRoadmapUpdateStore = create<roadmapUpdateStore>((set, get) => ({
  updateMap: false,
  setUpdate: (newVal: boolean) => {
    set((prev) => ({
      ...prev,
      updateMap: newVal,
    }));
  },
}));
