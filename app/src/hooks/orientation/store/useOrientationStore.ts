import { create } from "zustand";
import * as ScreenOrientation from "expo-screen-orientation";

interface OrientationStore {
  orientation: ScreenOrientation.Orientation;
  setOrientation: (newVal: ScreenOrientation.Orientation) => void;
}

export const useOrientationStore = create<OrientationStore>((set) => ({
  orientation: ScreenOrientation.Orientation.PORTRAIT_UP,
  setOrientation: (newVal: ScreenOrientation.Orientation) =>
    set((state) => ({ ...state, orientation: newVal })),
}));
