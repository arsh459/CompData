import { ParsedUrlQuery } from "querystring";

export const parseZoomTokenQuery = (query: ParsedUrlQuery) => {
  if (query.code && typeof query.code === "string") {
    return query.code;
  }

  return "";
};

export const parseZoomRefreshTokenQuery = (query: ParsedUrlQuery) => {
  if (query.token && typeof query.token === "string") {
    return query.token;
  }

  return "";
};

export const parseZoomMeetingsQuery = (query: ParsedUrlQuery) => {
  return {
    userId:
      query.userId && typeof query.userId === "string" ? query.userId : "",
    token: query.token && typeof query.token === "string" ? query.token : "",
  };
};
