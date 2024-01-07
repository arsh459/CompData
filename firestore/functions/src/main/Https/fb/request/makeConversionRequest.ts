import axios from "axios";
import { FBEventInterface } from "../interface";

export const makeConversionRequest = async (
  eventObj: FBEventInterface,
  test_event_code?: string,
) => {
  await axios({
    url: `https://graph.facebook.com/${process.env.FB_API_VERSION}/${process.env.PIXEL_ID}/events/?access_token=${process.env.FB_ACCESS_TOKEN}`,
    method: "POST",
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      data: [eventObj],
      ...(test_event_code ? { test_event_code } : {}),
    }),
  });
};
