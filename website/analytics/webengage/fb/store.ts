import { create } from "zustand";
import { getCookie, getIPAddress, getUrlParameter } from "./utils";

export interface DeviceStoreData {
  client_ip_address?: string;
  client_user_agent?: string;
  mixpanelDistinctId?: string;
  event_source_url?: string;
  fbc?: string;
  fbp?: string;
}

interface DeviceStore {
  data: DeviceStoreData;

  setDistinctId: (id: string) => void;
  setEventURL: (url: string) => void;
  setFBParams: () => void;

  setIPAddress: () => Promise<void>;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  data: {},
  setIPAddress: async () => {
    const ip = await getIPAddress();
    set((s) => ({ ...s, data: { ...s.data, client_ip_address: ip } }));
  },
  setFBParams: () => {
    const cookie = getCookie("_fbp");
    const fbc = getUrlParameter("fbclid");
    const fbcValue = "fb.1." + Math.floor(Date.now() / 1000) + "." + fbc;

    const userAgent =
      typeof window !== "undefined" ? window.navigator.userAgent : "SSR";

    // console.log("user", userAgent);

    set((state) => ({
      ...state,
      data: {
        ...state.data,
        client_user_agent: userAgent,
        ...(cookie ? { fbp: cookie } : {}),
        ...(fbc ? { fbc: fbcValue } : {}),
      },
    }));
  },

  setDistinctId: (id: string) => {
    set((state) => ({
      ...state,
      data: { ...state.data, mixpanelDistinctId: id },
    }));
  },

  setEventURL: (url: string) => {
    set((state) => {
      return {
        ...state,
        data: {
          ...state.data,
          event_source_url: url,
        },
      };
    });
  },
}));
