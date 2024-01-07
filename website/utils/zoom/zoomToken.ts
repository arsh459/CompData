import {
  client_id,
  client_secret,
  redirect_uri,
} from "@hooks/zoom/interface/constants";
import axios from "axios";

export interface AuthTokenResponse {
  access_token: string;
  token_type: "bearer";
  refresh_token: string;
  expires_in: number;
  scope: "user:read:admin";
}

export const requestZoomAccessToken = async (zoomCode: string) => {
  // try {
  const response = await axios({
    url: "https://zoom.us/oauth/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    },
    params: {
      grant_type: "authorization_code",
      code: zoomCode,
      redirect_uri: redirect_uri,
    },
  });

  const data = response.data as AuthTokenResponse;
  return data;
};

export const refreshZoomAccessToken = async (token: string) => {
  // try {
  const response = await axios({
    url: "https://zoom.us/oauth/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    },
    params: {
      grant_type: "refresh_token",
      refresh_token: token,
    },
  });

  const data = response.data as AuthTokenResponse;
  return data;
};
