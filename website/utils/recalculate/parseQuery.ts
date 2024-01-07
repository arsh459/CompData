import { ParsedUrlQuery } from "querystring";

export const parseRecalculateQuery = (query: ParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
  };

  // return "";
};
