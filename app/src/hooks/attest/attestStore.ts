import { create } from "zustand";

export type attestStateTypes = "pending" | "failed" | "done";

interface attestState {
  state: attestStateTypes;
  setAttest: (newState: attestStateTypes) => void;
  retry: number;
  setRetry: () => void;
}

export const useAttestStore = create<attestState>((set, get) => ({
  state: "pending",
  retry: 0,
  setRetry: () =>
    set((state) => ({ ...state, retry: state.retry + 1, state: "pending" })),
  setAttest: (newState: attestStateTypes) =>
    set((state) => ({ ...state, state: newState })),
}));
