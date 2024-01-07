import { logEvent, getAnalytics, setCurrentScreen } from "firebase/analytics";

export const joinGroupEvent = async (group_id: string) => {
  try {
    if (typeof window != undefined) {
      const analytics = getAnalytics();
      // console.log("here");
      logEvent(analytics, "join_group", {
        group_id: group_id,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const screenViewEvent = async (url: string) => {
  try {
    if (typeof window != undefined) {
      const analytics = getAnalytics();
      setCurrentScreen(analytics, url);
      logEvent(analytics, "screen_view");
    }
  } catch (error) {
    console.log("error", error);
  }
};
