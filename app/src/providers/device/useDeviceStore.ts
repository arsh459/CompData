import { create } from "zustand";
import DeviceInfo from "react-native-device-info";
import { getLocales, getTimeZone } from "react-native-localize";
import { Dimensions, Platform } from "react-native";
import { getIPAddress } from "./utils/getIP";
import ReactNativeIdfaAaid from "@sparkfabrik/react-native-idfa-aaid";

export interface DeviceStoreData {
  client_ip_address?: string;
  mixpanelDistinctId?: string;
  madid?: string;
  anonId?: string;
  advertiser_tracking_enabled?: 0 | 1;
  application_tracking_enabled?: 0 | 1;
  version?: string;
  event_source_url?: string;
  osVersion?: string;
  deviceName?: string;
  locale?: string;
  timezoneAbb?: string;
  carrier?: string;
  country?: string;
  width?: number;
  height?: number;
  maxStorageInGB?: number;
  freeStorageInGB?: number;
  tz?: string;
  install_referrer?: string;
  installer_package?: string;
}

interface DeviceStore {
  data: DeviceStoreData;

  setDistinctId: (id: string) => void;
  setEventURL: (url: string) => void;
  setDeviceInfo: () => Promise<void>;
  setLocaleInfo: () => Promise<void>;
  setIPAddress: () => Promise<void>;
  setAdValue: () => Promise<void>;
  setAnonId: (id: string) => void;
  setAdvertisingEnabled: (
    advertiser_tracking_enabled?: 0 | 1,
    application_tracking_enabled?: 0 | 1
  ) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  data: {},
  setIPAddress: async () => {
    const ip = await getIPAddress();
    set((s) => ({ ...s, data: { ...s.data, client_ip_address: ip } }));
  },

  setDistinctId: (id: string) => {
    set((state) => ({
      ...state,
      data: { ...state.data, mixpanelDistinctId: id },
    }));
  },
  setDeviceInfo: async () => {
    const [
      version,
      modelName,
      diskCapacity,
      freeStorage,
      installReferrer,
      installer_package,
      carrier,
    ] = await Promise.all([
      DeviceInfo.getVersion(),
      DeviceInfo.getModel(),
      DeviceInfo.getTotalDiskCapacity(),
      DeviceInfo.getFreeDiskStorage(),
      DeviceInfo.getInstallReferrer(),
      DeviceInfo.getInstallerPackageName(),
      DeviceInfo.getCarrier(),
    ]);

    const GBSpace = diskCapacity / 1000000000;
    const freeGBSpace = freeStorage / 1000000000;

    set((state) => {
      return {
        ...state,
        data: {
          ...state.data,
          version,
          deviceName: modelName,
          ...(Platform.Version ? { osVersion: `${Platform.Version}` } : {}),
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          maxStorageInGB: GBSpace,
          freeStorageInGB: freeGBSpace,
          install_referrer: installReferrer,
          installer_package: installer_package,
          carrier,
        },
      };
    });
  },
  setLocaleInfo: async () => {
    const [localesArr, tz] = await Promise.all([getLocales(), getTimeZone()]);

    let locale: string = "";
    let countryCode: string = "";
    for (const localeD of localesArr) {
      if (localeD.languageTag) {
        locale = localeD.languageTag;
        countryCode = localeD.countryCode;
        break;
      }
    }

    set((state) => {
      return {
        ...state,
        data: {
          ...state.data,
          tz,
          country: countryCode,
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          locale,
        },
      };
    });
  },
  setAdValue: async () => {
    const adInfo = await ReactNativeIdfaAaid.getAdvertisingInfo();

    set((state) => {
      return {
        ...state,

        data: {
          ...state.data,
          madid: adInfo.id ? adInfo.id : "",
        },
      };
    });
  },

  setAnonId: (id: string) => {
    set((state) => ({ ...state, data: { ...state.data, anonId: id } }));
  },

  setAdvertisingEnabled: (
    advertiser_tracking_enabled?: 0 | 1,
    application_tracking_enabled?: 0 | 1
  ) => {
    set((state) => ({
      ...state,
      data: {
        ...state.data,
        advertiser_tracking_enabled:
          Platform.OS === "android" ? 1 : advertiser_tracking_enabled,
        application_tracking_enabled:
          Platform.OS === "android" ? 1 : application_tracking_enabled,
      },
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
