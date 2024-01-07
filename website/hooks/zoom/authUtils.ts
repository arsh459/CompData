import { AuthTokenResponse } from "@utils/zoom/zoomToken";
import axios from "axios";
// import { AuthTokenResponse } from "pages/api/zoom/utils/zoomToken";

export const internalRequestZoomAccessToken = async (zoomCode: string) => {
  const response = await axios({
    url: "/api/zoom/token",
    method: "POST",
    params: {
      code: zoomCode,
    },
  });

  const data = response.data as AuthTokenResponse;
  return data;
};

export const internalRefreshZoomAccessToken = async (token: string) => {
  const response = await axios({
    url: "/api/zoom/refreshToken",
    method: "POST",
    params: {
      token: token,
    },
  });

  const data = response.data as AuthTokenResponse;
  return data;
};
