import {
  FBEventInterfaceRequest,
  FBUserData_SB,
  STANDARD_FB_EVENTS,
} from "./interface";
import { DeviceStoreData } from "./store";

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
    action_source: "website",
    data_processing_options: [],

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
    client_user_agent: data.client_user_agent ? data.client_user_agent : "",
    ...(data.fbp ? { fbp: data.fbp } : {}),
    ...(data.fbc ? { fbc: data.fbc } : {}),
  };
};
