import analytics from "@react-native-firebase/analytics";
import { UserInterface } from "@models/User/User";
import { MIXPANEL_KEY } from "react-native-dotenv";
import * as Sentry from "@sentry/react-native";
import { AppEventsLogger, AEMReporterIOS } from "react-native-fbsdk-next";

// import { mixpanel } from "App";

import { Mixpanel } from "mixpanel-react-native";
import { createUserToLog, createUserToLog_string } from "../utils";
import { BranchSubscriptionEvent } from "react-native-branch";
import { PermissionStatus } from "react-native-permissions";
import { GFitAuthorization } from "@providers/GoogleFit/hooks/useGoogleOAuth";
import { DNParseResult } from "@providers/dnLinks/hooks/handleLink";
import crashlytics from "@react-native-firebase/crashlytics";

// import { evaluateStatus } from "@providers/GoogleFit/hooks/utils";

const trackAutomaticEvents = true;

const mixpanel = new Mixpanel(MIXPANEL_KEY, trackAutomaticEvents);
mixpanel.init();

// const webengage = new WebEngage();

export const getMixpanelDistinctId = async () => {
  // return "";
  return mixpanel.getDistinctId();
};

export const flushMixpanel = async () => {
  mixpanel.flush();
};

export const fpEventLog = (eventName: string) => {
  try {
    AppEventsLogger.logEvent(eventName);
    AEMReporterIOS.logAEMEvent(eventName, 0);
  } catch (error: any) {
    console.log("error in fb", error);
    crashlytics().recordError(error);
  }
};

const fbEvents: { [eventName: string]: boolean } = {
  slot_request: true,
  auth_clickAppleSignIn: true,
  auth_clickGoogleSignIn: true,
  auth_clickGetOtp: true,
  zohoSlotBooked: true,
  fScanRoadmap_clickNext: true,
  ProScreen_clickPlan: true,
  paymentFailed: true,
  paymentDone: true,
};

export const weEventTrack = async (
  eventName: string,
  eventParamObj: { [key: string]: string | number }
) => {
  // try {
  //   // console.log("logged", eventName, eventParamObj);
  //   // webengage.track(eventName, eventParamObj);
  //   // console.log("weEventTrack_success", eventName, eventParamObj);
  // } catch (error: any) {
  //   console.log("weEventTrack_error", error);
  //   crashlytics().recordError(error);
  // }
  if (fbEvents[eventName]) {
    try {
      console.log("logging fp eventy", eventName);
      fpEventLog(eventName);
    } catch (error) {
      console.log("error in fb", error);
    }
  }

  // firebase
  try {
    analytics().logEvent(eventName, eventParamObj);
  } catch (error: any) {
    console.log("error in ga", error);
    crashlytics().recordError(error);
  }

  try {
    mixpanel.track(eventName, eventParamObj);
  } catch (error: any) {
    console.log("error in mixpanel", error);
    crashlytics().recordError(error);
  }

  // try {
  //   Sentry.addBreadcrumb({
  //     type: ''
  //   })
  // } catch (error: any){

  // }
};

interface branchAttributes {
  branch_referring_link?: string;
  branch_referrer?: string;
  branch_campaign?: string;
  branch_channel?: string;
  branch_click_ts?: number;
  branch_feature?: string;
}

type branchKeys =
  | "branch_referring_link"
  | "branch_referrer"
  | "branch_campaign"
  | "branch_channel"
  | "branch_click_ts"
  | "branch_feature";

export const linkAtt = async (resp: DNParseResult) => {
  if (resp.route === "BlogScreen") {
    weEventTrack("deeplink_loadV2", {
      navTo: resp.route,
      title: resp.params.BlogScreenProps?.name
        ? resp.params.BlogScreenProps?.name
        : "unknown",
    });
  } else if (resp.route === "ReelView") {
    weEventTrack("deeplink_loadV2", {
      navTo: resp.route,
      taskId: resp.params.ReelScreenProps?.taskId
        ? resp.params.ReelScreenProps?.taskId
        : "unknown",
    });
  } else if (resp.route === "RecipeeDetailScreen") {
    weEventTrack("deeplink_loadV2", {
      navTo: resp.route,
      taskId: resp.params.RecipeeScreenProps?.taskId
        ? resp.params.RecipeeScreenProps?.taskId
        : "unknown",
    });
  } else {
    weEventTrack("deeplink_loadV2", { navTo: resp.route });
  }
};

export const userAttribute = async (params: BranchSubscriptionEvent) => {
  const dtToAttribute: branchAttributes = {};

  if (params.params?.["~referring_link"]) {
    dtToAttribute.branch_referring_link = params.params?.["~referring_link"];
  }

  if (params.params?.["+referrer"]) {
    dtToAttribute.branch_referrer = params.params?.["+referrer"];
  }

  if (params.params?.["~campaign"]) {
    dtToAttribute.branch_campaign = params.params?.["~campaign"];
  }

  if (params.params?.["~channel"]) {
    dtToAttribute.branch_channel = params.params?.["~channel"];
  }

  if (params.params?.["+click_timestamp"]) {
    dtToAttribute.branch_click_ts = params.params?.["+click_timestamp"];
  }

  if (params.params?.["~feature"]) {
    dtToAttribute.branch_feature = params.params?.["~feature"];
  }

  for (const key of Object.keys(dtToAttribute)) {
    const val = dtToAttribute[key as branchKeys];
    mixpanel.getPeople().set(key, val);

    analytics().setUserProperty(key, `${val}`);
  }
};

export const setProUser = async (isPro: boolean) => {
  mixpanel.getPeople().set("isPro", isPro);

  analytics().setUserProperty("isPro", isPro ? "TRUE" : "FALSE");
};

export const setUserAdLink = async (link: string) => {
  mixpanel.getPeople().set("fbLink", link);
  analytics().setUserProperty("fbLink", link);
};

export const setUserNotificationPermission = async (
  notPermissions: PermissionStatus
) => {
  mixpanel.getPeople().set("notificationPermission", notPermissions);
};

export const setUserMotionPermission = async (permission: PermissionStatus) => {
  mixpanel.getPeople().set("motionAccess", permission);
};

export const setUserGAuthAccess = async (permission: GFitAuthorization) => {
  mixpanel.getPeople().set("googleAuth", permission);
};

export const userLog = async (user?: UserInterface) => {
  if (user?.uid) {
    const uLog = createUserToLog(user);
    const uLogString = createUserToLog_string(user);

    try {
      AppEventsLogger.setUserID(user.uid);
    } catch (e) {
      console.log("error in setting uid");
    }

    try {
      crashlytics().setUserId(user.uid);
      crashlytics().setAttributes(uLogString);
    } catch (error: any) {
      crashlytics().recordError(error);
    }

    try {
      Sentry.setUser({ id: user.uid, username: user.name ? user.name : "" });
    } catch (error: any) {}

    try {
      mixpanel.identify(user.uid);
      for (const key of Object.keys(uLog)) {
        const val = uLog[key];
        mixpanel.getPeople().set(key, val);
      }
    } catch (error: any) {
      crashlytics().recordError(error);
    }

    try {
      analytics().setUserId(user.uid);
      analytics().setUserProperties(uLogString);
    } catch (error: any) {
      console.log("error in ga 2", error);
      crashlytics().recordError(error);
    }

    try {
      // webengage.user.login(user.uid);
      // for (const key of Object.keys(uLog)) {
      // const val = uLog[key];
      // webengage.user.setAttribute(key, val);
      // }
    } catch (error: any) {
      console.log("userLog_error", error);
      crashlytics().recordError(error);
    }
  }
};
