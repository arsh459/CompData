import { weEventTrack } from "./userLog";
import { baseQuery } from "@hooks/utils/useScreenTrack";

export const trackPage = (pathname: string, query: baseQuery) => {
  const { utm_source, utm_medium, utm_campaign } = query;

  if (pathname === "/blog/post/[slug]") {
    const sg = query.slug;
    if (typeof sg === "string") {
      // add slug name
      weEventTrack("pageLoad", {
        screenName: pathname,
        blogName: sg,
        ...(utm_source ? { utm_source } : {}),
        ...(utm_medium ? { utm_medium } : {}),
        ...(utm_campaign ? { utm_campaign } : {}),
      });

      return;
    }
  }

  weEventTrack("pageLoad", {
    screenName: pathname,
    ...(utm_source ? { utm_source } : {}),
    ...(utm_medium ? { utm_medium } : {}),
    ...(utm_campaign ? { utm_campaign } : {}),
  });
};
