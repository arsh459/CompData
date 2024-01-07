import { create } from "zustand";

export type netState = "unknown" | "connected" | "disconnected";

interface netStore {
  isConnected?: netState;
  retry: number;
  setRetryNetwork: () => void;
  setConnectionStatus: (newState: netState) => void;
}

export const useNetStore = create<netStore>((set, get) => ({
  isConnected: "unknown",
  setConnectionStatus: (newState: netState) => {
    set((state) => ({ ...state, isConnected: newState }));
  },
  retry: 0,
  setRetryNetwork: () => {
    set((state) => ({
      ...state,
      retry: state.retry++,
      isConnected: "unknown",
    }));
  },
}));
