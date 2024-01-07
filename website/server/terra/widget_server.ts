import axios from "axios";
import { ParsedUrlQuery } from "querystring";

export const headers = {
  "dev-id": "socialboat-nelOx34niU",
  "X-API-Key": "2Wv3GukGkT4zaRkaKsAe1Zx80iF3Rcc11rXyRUOi",
};

interface SuccessWidgetResponse {
  session_id: string;
  status: "success";
  url: string;
}

export const terraWidgetExternalCall = async (
  uid: string,
  leaderKey?: string,
  eventKey?: string,
  workout?: boolean
) => {
  try {
    const response = await axios({
      url: "https://api.tryterra.co/v2/auth/generateWidgetSession",
      method: "POST",
      headers: headers,
      data: {
        providers:
          "GOOGLE,FITBIT,GARMIN,PELOTON,WAHOO,ZWIFT,SUUNTO,FREESTYLELIBRE,WITHINGS,OURA,TRAININGPEAKS,POLAR,EIGHT",
        reference_id: uid,
        auth_success_redirect_url: `https://socialboat.live/${leaderKey}/${eventKey}/workout?state=success&tab=connect_your_wearable`,
        auth_failure_redirect_url: `https://socialboat.live/${leaderKey}/${eventKey}/workout?state=failed&tab=connect_your_wearable`,

        // auth_success_redirect_url: `http://localhost:3000/fitness?uid=${uid}&state=success&leaderKey=${leaderKey}`,
        // auth_failure_redirect_url: `http://localhost:3000/fitness?uid=${uid}&state=fail&leaderKey=${leaderKey}`,
      },
    });

    const data = response.data as SuccessWidgetResponse;
    // console.log("data", data);
    return {
      url: data.url,
      sessionId: data.session_id,
    };
  } catch (error) {
    console.log("error");
    return {
      url: "",
      sessionId: "",
    };
  }
};

export const parseWidgetQuery = (query: ParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    leaderKey:
      query.leaderKey && typeof query.leaderKey === "string"
        ? query.leaderKey
        : "",
    eventKey:
      query.eventKey && typeof query.eventKey === "string"
        ? query.eventKey
        : "",
    workout:
      query.eventKey &&
      typeof query.workout === "string" &&
      query.workout === "true"
        ? true
        : false,
  };
};
