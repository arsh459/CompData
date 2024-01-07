import { ParsedUrlQuery } from "querystring";

export const parseUpdateQuery = (query: ParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    date: query.date && typeof query.date === "string" ? query.date : "",
    type: query.type && typeof query.type === "string" ? query.type : "",
    badgeId:
      query.badgeId && typeof query.badgeId === "string" ? query.badgeId : "",
  };

  // return "";
};

export const parseCreateQuery = (query: ParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    type: query.type && typeof query.type === "string" ? query.type : "",
    recreate:
      query.recreate &&
      typeof query.recreate === "string" &&
      query.recreate === "true"
        ? true
        : false,
    days:
      query.days && typeof query.days === "string" ? parseInt(query.days) : 7,
  };

  // return "";
};
