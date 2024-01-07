import { RouteKeys } from "@routes/MainStack";
import { create } from "zustand";

interface navProvider {
  continueCallback: () => void;
  setContinueCallback: (func: () => void) => void;

  finalCallback: () => void;
  setFinalCallback: (func: () => void) => void;

  finalScreen?: RouteKeys;
  setFinalScreen: (finalScreen: RouteKeys) => void;
}

export const usePostNavigationProvider = create<navProvider>((set) => ({
  continueCallback: () => {},
  setContinueCallback(func) {
    set((state) => ({
      ...state,
      continueCallback: func,
    }));
  },

  finalCallback: () => {},
  setFinalCallback(func) {
    set((state) => ({
      ...state,
      continueCallback: func,
    }));
  },

  setFinalScreen: (screenToCall: RouteKeys) => {
    set((state) => ({ ...state, finalScreen: screenToCall }));
  },
}));
