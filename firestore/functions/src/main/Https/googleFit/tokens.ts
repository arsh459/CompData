import axios from "axios";
var FormData = require("form-data");
var qs = require("qs");

export interface GoogleAccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string[];
  token_type: string;
}

export const generateAccessToken = async (
  serverAuthCode?: string,
): Promise<GoogleAccessTokenResponse | undefined> => {
  if (serverAuthCode) {
    const fdata = new FormData();
    fdata.append("grant_type", "authorization_code");
    fdata.append("code", serverAuthCode);
    fdata.append("client_id", process.env.GOOGLE_CLIENT_ID);
    fdata.append("client_secret", process.env.GOOGLE_CLIENT_SECRET);
    fdata.append("redirect_uri", "");

    const response = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...fdata.getHeaders(),
      },
      data: fdata,
    });

    // console.log("response", response);

    const data = response.data as GoogleAccessTokenResponse;

    // console.log("data", response.data);

    if (data.access_token) {
      return data;
    }
  }

  return undefined;
};

export interface RefreshAccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string[];
  token_type: string;
}

export const refreshAccessToken = async (refreshToken: string) => {
  var xData = qs.stringify({
    refresh_token: refreshToken,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "refresh_token",
  });

  // console.log("xData", xData);

  const response = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: xData,
  });

  // console.log("response", response);

  const data = response.data as RefreshAccessTokenResponse;
  if (data.access_token) {
    return data;
  }

  return undefined;
};
