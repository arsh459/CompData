import { UserInterface } from "@models/User/User";
import { analytics } from "@config/firebase";

import { logEvent, setUserId, setUserProperties } from "firebase/analytics";
import mixpanel from "@config/mixpanel";
import { createUserToLog, createUserToLog_string } from "../utils";
import { baseQuery } from "@hooks/utils/useScreenTrack";

declare global {
  interface Window {
    // webengage: any;
    fbq: any;
  }
}

export const getMixpanelDistinctId = async () => {
  // return "";
  return mixpanel.get_distinct_id();
};

export const utmSourceTrack = (utm_source: string) => {
  // if (window && window.webengage) {
  //   window.webengage.user.setAttribute("utm_source", utm_source);
  // }
};

export const startTrack = () => {
  mixpanel.time_event("page_viewed");
};

export const endTrack = (pathname: string, query: baseQuery) => {
  if (pathname === "/blog/post/[slug]") {
    const sg = query.slug;
    if (typeof sg === "string") {
      mixpanel.track("page_viewed", { screenName: pathname, blogName: sg });

      return;
    }
  }

  mixpanel.track("page_viewed", { screenName: pathname });
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
  try {
    // if (window && window.webengage) {
    // window.webengage.track(eventName, eventParamObj);
    mixpanel.track(eventName, eventParamObj);
    // }
  } catch (error) {}

  if (analytics)
    try {
      // analytics().logEvent(eventName, eventParamObj);
      logEvent(analytics, eventName, eventParamObj);
    } catch (error) {}

  if (fbEvents[eventName] && window && window.fbq)
    try {
      window.fbq("trackCustom", eventName, eventParamObj);
      // analytics().logEvent(eventName, eventParamObj);
      // console.log(window.fbq);
    } catch (error) {
      console.log("fb event fail", error);
    }
};

export const userLog = async (user: UserInterface) => {
  if (user?.uid) {
    const uLog = createUserToLog(user);
    const uLogString = createUserToLog_string(user);

    try {
      mixpanel.identify(user.uid);
      mixpanel.people.set(uLog);
    } catch (error) {
      console.log("mixpanel init error");
    }

    // console.log("user", user.phone, user.phone === "+914444444444");

    if (analytics) {
      try {
        setUserId(analytics, user.uid);
        setUserProperties(analytics, uLogString);
      } catch (error) {
        console.log("error in ga 2", error);
      }
    }

    // if (window && window.webengage) {
    //   try {
    //     window.webengage.user.login(user.uid);

    //     for (const key of Object.keys(uLog)) {
    //       const val = uLog[key];
    //       window.webengage.user.setAttribute(key, val);
    //     }
    //   } catch (error) {
    //     console.log("userLog_error", error);
    //   }
    // }
  }
};
