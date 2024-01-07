import { logEvent, getAnalytics } from "firebase/analytics";

export const generalClickEvent = async (
  eventId: string,
  params: { [key: string]: string }
) => {
  try {
    if (typeof window != undefined) {
      const analytics = getAnalytics();
      // console.log("here");
      logEvent(analytics, eventId, params);
    }
  } catch (error) {
    console.log("error", error);
  }
};
