import { UserInterface } from "../../../../models/User/User";
import {
  FBAppData,
  FBAppDataRequest,
  FBEventInterface,
  FBEventInterfaceRequest,
  FBUserData,
} from "../interface";
import {
  // computeSHA256,
  normaliseName,
  normalisePhone,
  normalizeCity,
} from "./createHash";
import { MixpanelUser } from "./mixpanelUser";
import { getTZStringInUser, getTimezoneAbbreviation } from "./utils";

export const makeFBRequestData = (
  user: UserInterface,
  eventData: FBEventInterfaceRequest,
  mpUser?: MixpanelUser,
): FBEventInterface => {
  // console.log();
  // console.log();
  // console.log("Mixpanel User DISTINCT_ID:", mpUser?.$distinct_id);

  return {
    event_name: eventData.event_name,
    event_id: eventData.event_id,
    event_time: eventData.event_time,
    event_source_url: eventData.event_source_url,
    action_source: eventData.action_source,
    data_processing_options: [],
    ...(eventData.app_data
      ? { app_data: createFBUserAppData(user, eventData.app_data, mpUser) }
      : {}),
    user_data: createFBUserProfile(user, eventData, mpUser),
    ...(eventData.custom_data ? { custom_data: eventData.custom_data } : {}),
  };
};

const createFBUserAppData = (
  user: UserInterface,
  app_data: FBAppDataRequest,
  mpUser?: MixpanelUser,
): FBAppData => {
  const appData = {
    advertiser_tracking_enabled: app_data?.advertiser_tracking_enabled,
    application_tracking_enabled: app_data?.application_tracking_enabled,
    ...(app_data?.install_referrer
      ? { install_referrer: app_data?.install_referrer }
      : {}),
    ...(app_data?.installer_package
      ? { installer_package: app_data?.installer_package }
      : {}),
    ...(app_data?.url_schemes ? { url_schemes: app_data.url_schemes } : {}),
    extinfo: createExtArray(user, app_data, mpUser),
  };

  // console.log();
  // console.log();
  // console.log("APP_DATA", appData);

  return appData;
};

const createExtArray = (
  user: UserInterface,
  app_data: FBAppDataRequest,
  mpUser?: MixpanelUser,
): string[] => {
  const tzString = getTZStringInUser(user, app_data, mpUser);

  const tzAbb = getTimezoneAbbreviation(tzString);

  const extArray = [
    app_data.extObj.version,
    app_data.extObj.packageName,
    app_data.extObj.versionName ? app_data.extObj.versionName : "",
    app_data.extObj.versionNameLong ? app_data.extObj.versionNameLong : "",
    app_data.extObj.osVersion
      ? app_data.extObj.osVersion
      : fallbackOS(app_data.extObj.version, mpUser),
    app_data.extObj.deviceModelName
      ? app_data.extObj.deviceModelName
      : fallbackMPDevice(app_data.extObj.version, mpUser),
    app_data.extObj.locale ? app_data.extObj.locale : "",
    tzAbb,
    app_data.extObj.carrier ? app_data.extObj.carrier : "",
    app_data.extObj.width ? `${parseInt(app_data.extObj.width)}` : "",
    app_data.extObj.height ? `${parseInt(app_data.extObj.height)}` : "",
    "",
    "",
    app_data.extObj.totalStorage ? app_data.extObj.totalStorage : "",
    app_data.extObj.freeStorage ? app_data.extObj.freeStorage : "",
    tzString,
  ];

  // console.log();
  // console.log();
  console.log("extArray Length", extArray.length);
  // console.log("extArray", extArray);

  return extArray;
};

const createFBUserProfile = (
  user: UserInterface,
  eventData: FBEventInterfaceRequest,
  mpUser?: MixpanelUser,
): FBUserData => {
  const { fn, ln } = normaliseName(user.name ? user.name : "");

  const userProfile = {
    ...(user.email
      ? { em: user.email }
      : mpUser?.$properties.email
      ? { em: mpUser.$properties.email }
      : {}),
    ...(user.phone ? { ph: normalisePhone(user.phone) } : {}),
    ...(fn ? { fn: fn } : {}),
    ...(ln ? { ln: ln } : {}),
    ge: user.gender === "male" ? "m" : "f",

    ...(eventData.user_data.db ? { db: eventData.user_data.db } : {}),
    ...(eventData.user_data.zp
      ? { zp: normalizeCity(eventData.user_data.zp) }
      : {}),

    // mixpanel data
    ...(mpUser?.$properties.$city
      ? { ct: normalizeCity(mpUser?.$properties.$city) }
      : {}),
    ...(mpUser?.$properties.$region
      ? { st: normalizeCity(mpUser?.$properties.$region) }
      : {}),
    ...(mpUser?.$properties.$country_code
      ? { country: normalizeCity(mpUser?.$properties.$country_code) }
      : {}),
    // mixpanel data

    external_id: user.uid,
    client_ip_address: eventData.user_data.client_ip_address,
    ...(eventData.user_data.client_user_agent
      ? { client_user_agent: eventData.user_data.client_user_agent }
      : {}),
    ...(eventData.user_data.fbc ? { fbc: eventData.user_data.fbc } : {}),
    ...(eventData.user_data.fbp ? { fbp: eventData.user_data.fbp } : {}),
    ...(eventData.user_data.anon_id
      ? { anon_id: eventData.user_data.anon_id }
      : {}),
    ...(eventData.user_data.madid ? { madid: eventData.user_data.madid } : {}),
  };

  // console.log();
  // console.log();
  // console.log("USER PROFILE", userProfile);

  return userProfile;
};

const fallbackMPDevice = (version: "i2" | "a2", mpUser?: MixpanelUser) => {
  if (mpUser) {
    if (version === "a2" && mpUser.$properties.$android_model) {
      return mpUser.$properties.$android_model;
    } else if (version === "i2" && mpUser.$properties.$ios_device_model) {
      return mpUser.$properties.$ios_device_model;
    }
  }

  return "";
};

const fallbackOS = (version: "i2" | "a2", mpUser?: MixpanelUser) => {
  if (mpUser) {
    if (version === "a2" && mpUser.$properties.$android_os_version) {
      return mpUser.$properties.$android_os_version;
    } else if (version === "i2" && mpUser.$properties.$ios_version) {
      return mpUser.$properties.$ios_version;
    }
  }

  return "";
};
