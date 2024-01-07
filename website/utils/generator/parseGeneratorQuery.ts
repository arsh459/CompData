import { ParsedUrlQuery } from "querystring";

export const parseTaskGeneratorQuery = (query: ParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    badgeId:
      query.badgeId && typeof query.badgeId === "string" ? query.badgeId : "",
    type: query.type && typeof query.type === "string" ? query.type : "",
    recreate:
      query.recreate && typeof query.type === "boolean"
        ? query.recreate
        : typeof query.type === "string" && query.type === "true"
        ? true
        : false,
    deletePrevious:
      query.deletePrevious && typeof query.deletePrevious === "boolean"
        ? query.deletePrevious
        : typeof query.deletePrevious === "string" &&
          query.deletePrevious === "true"
        ? true
        : false,
  };

  // return "";
};
