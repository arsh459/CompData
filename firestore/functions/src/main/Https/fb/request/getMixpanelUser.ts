import axios from "axios";
import { MixpanelUser } from "./mixpanelUser";

export const getMixpanelUser = async (uid: string, distinctId: string) => {
  try {
    const data = JSON.stringify({
      where: `user["user_id"]=="${uid}"`,
      // distinct_id: distinctId,
    });

    const response = await axios({
      url: `${process.env.MIXPANEL_URL}`,
      params: {
        project_id: `${process.env.MIXPANEL_PROJECT_ID}`,
      },
      method: "POST",
      maxBodyLength: Infinity,
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `Basic ${btoa(
          `${process.env.MIXPANEL_USERNAME}:${process.env.MIXPANEL_SECRET}`,
        )}`,
      },
      data: data,
    });

    const mixpanelUserResp = response.data as { results: MixpanelUser[] };
    if (mixpanelUserResp.results.length) {
      return mixpanelUserResp.results[0];
    }

    ///// TRY WITH DISTINCT ID
    const data2 = JSON.stringify({
      distinct_id: distinctId,
    });

    const responseDistinctId = await axios({
      url: `${process.env.MIXPANEL_URL}`,
      params: {
        project_id: `${process.env.MIXPANEL_PROJECT_ID}`,
      },
      method: "POST",
      maxBodyLength: Infinity,
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `Basic ${btoa(
          `${process.env.MIXPANEL_USERNAME}:${process.env.MIXPANEL_SECRET}`,
        )}`,
      },
      data: data2,
    });

    const mixpanelUserResp2 = responseDistinctId.data as {
      results: MixpanelUser[];
    };
    if (mixpanelUserResp2.results.length) {
      return mixpanelUserResp2.results[0];
    }
  } catch (e) {
    return undefined;
  }

  return undefined;
};
