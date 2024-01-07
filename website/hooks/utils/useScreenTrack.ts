import { useEffect } from "react";
import { useRouter } from "next/router";
// import { logEvent, getAnalytics, setCurrentScreen } from "firebase/analytics";
import { screenViewEvent } from "@analytics/click/ctaClicks";
// import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useUTM } from "@hooks/auth/useUTM";
import { trackPage } from "@analytics/webengage/user/trackPage";
import { endTrack, startTrack } from "@analytics/webengage/user/userLog";

export interface baseQuery {
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  _branch_match_id?: string;
  _branch_referrer?: string;
  slug?: string;
}

export const useScreenTrack = () => {
  const routers = useRouter();

  const q = routers.query as baseQuery;

  useUTM();
  useEffect(() => {
    if (routers.isReady) {
      // console.log(routers.pathname);
      screenViewEvent(routers.pathname);

      // console.log("q", q);
      trackPage(routers.pathname, q);
      startTrack();
      // weEventTrack("pageLoad", { screenName: routers.pathname });

      //   const analytics = getAnalytics();
      //   const logScreenEvent = (url: string) => {
      //     setCurrentScreen(analytics, url);
      //     logEvent(analytics, "screen_view");
      //   };
      //   routers.events.on("routeChangeComplete", logScreenEvent);
      //   //Remvove Event Listener after un-mount
      //   return () => {
      //     routers.events.off("routeChangeComplete", logScreenEvent);
      //   };

      return () => {
        endTrack(routers.pathname, q);
      };
    }
  }, [routers.isReady, routers.pathname, q]);
};
