import { Platform } from "react-native";
import {
  EXTObj,
  FBAppData,
  FBEventInterfaceRequest,
  FBUserData_SB,
  STANDARD_FB_EVENTS,
} from "./interface";
import { DeviceStoreData } from "@providers/device/useDeviceStore";

export const createConversionAPIData = (
  eventName: STANDARD_FB_EVENTS,
  eventId: string,
  uid: string,
  data: DeviceStoreData,
  currency?: string,
  value?: string | number
): FBEventInterfaceRequest => {
  return {
    mixpanelDistinctId: data.mixpanelDistinctId ? data.mixpanelDistinctId : uid,
    event_name: eventName,
    event_time: Math.round(Date.now() / 1000),
    user_data: createFBUser(
      uid,
      data
      // data.country
    ),
    event_source_url: data.event_source_url ? data.event_source_url : "",
    event_id: eventId,
    action_source: "app",
    data_processing_options: [],
    app_data: createFBAppData(data),
    ...(currency && value ? { custom_data: { currency, value } } : {}),
  };
};

const createFBUser = (
  uid: string,
  data: DeviceStoreData
  //   client_user_agent: string
): FBUserData_SB => {
  return {
    uid,
    external_id: uid,
    client_ip_address: data.client_ip_address ? data.client_ip_address : "",
    madid: data.madid ? data.madid : "",
    anon_id: data.anonId ? data.anonId : "",
  };
};

const createEXTObj = (data: DeviceStoreData): EXTObj => {
  return {
    version: Platform.OS === "android" ? "a2" : "i2",
    packageName: "com.socialboat.socialboat",
    ...(data.version
      ? { versionName: data.version, versionNameLong: `${data.version} long` }
      : {}),
    ...(data.osVersion ? { osVersion: data.osVersion } : {}),
    ...(data.deviceName ? { deviceModelName: data.deviceName } : {}),
    ...(data.locale ? { locale: data.locale } : {}),
    ...(data.tz ? { tz: data.tz } : {}),
    ...(data.carrier ? { carrier: data.carrier } : {}),

    ...(data.width ? { width: `${data.width}` } : {}),
    ...(data.height ? { height: `${data.height}` } : {}),
    ...(data.maxStorageInGB ? { totalStorage: `${data.maxStorageInGB}` } : {}),
    ...(data.freeStorageInGB ? { freeStorage: `${data.freeStorageInGB}` } : {}),
  };
};

const createFBAppData = (data: DeviceStoreData): FBAppData => {
  return {
    advertiser_tracking_enabled:
      typeof data.advertiser_tracking_enabled === "number"
        ? data.advertiser_tracking_enabled
        : 1,

    application_tracking_enabled:
      typeof data.advertiser_tracking_enabled === "number"
        ? data.advertiser_tracking_enabled
        : 0,

    install_referrer: data.install_referrer ? data.install_referrer : "",
    installer_package: data.installer_package ? data.installer_package : "",
    url_schemes: ["com.socialboat.socialboat", "socialboat"],
    extObj: createEXTObj(data),
  };
};
