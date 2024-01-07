import { create } from "zustand";
import { PermissionStatus, RESULTS } from "react-native-permissions";

export interface ChatVoicePremissionStoreInterface {
  premissionStatusVoice: PermissionStatus;
  storagePermissionGranted: boolean;
  setStoragePermissionGranted: (data: boolean) => void;
  //   storagePermissionGranted:
  //   requestPremission: () => void;
  setPremissionStatusVoice: (status: PermissionStatus) => void;
}

export const useChatVoicePremissionStore =
  create<ChatVoicePremissionStoreInterface>((set) => ({
    premissionStatusVoice: RESULTS.DENIED,
    storagePermissionGranted: false,
    setStoragePermissionGranted: (data: boolean) => {
      set((state) => ({
        ...state,
        storagePermissionGranted: data,
      }));
    },
    // requestPremission: () => {},
    setPremissionStatusVoice: (status: PermissionStatus) => {
      set((state) => ({
        ...state,
        premissionStatusVoice: status,
      }));
    },
  }));
