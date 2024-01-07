import { create } from "zustand";

export interface TargetInterface {
  taskId: string;
  nextTarget?: TargetInterface;
}

export interface PreviewTaskStore {
  target?: TargetInterface;
  setTarget: (newTarget: TargetInterface) => void;
}

export const usePreviewTaskStore = create<PreviewTaskStore>((set) => ({
  target: undefined,
  setTarget: (val) => set((state) => ({ ...state, target: val })),
}));
