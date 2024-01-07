import { ParsedUrlQuery } from "querystring";

export const parseMergeQuery = (query: ParsedUrlQuery) => {
  return {
    phoneUID:
      query.phoneUID && typeof query.phoneUID === "string"
        ? query.phoneUID
        : "",
    annonymUID:
      query.annonymUID && typeof query.annonymUID === "string"
        ? query.annonymUID
        : "",
  };
};
