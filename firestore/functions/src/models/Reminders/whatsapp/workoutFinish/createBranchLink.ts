import axios from "axios";

export const createBranchShortLink = async (
  channel: string,
  feature: string,
  campaign: string,
  dataObj: { [key: string]: string | number },
  uid?: string,
) => {
  try {
    const resp = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      url: "https://api2.branch.io/v1/url",
      data: {
        branch_key: "key_live_ag55WKv4i5tHRerkPDn4cckeAtp7I7qX",
        channel: channel,
        feature: feature,
        campaign: campaign,
        ...dataObj,
        ...(uid ? { identity: uid } : {}),
        analytics: {
          "~channel": channel,
          "~feature": feature,
          "~campaign": campaign,
        },
      },
    });

    const { url } = resp.data as { url: string };

    return url;
  } catch (error) {
    return "";
  }
};
