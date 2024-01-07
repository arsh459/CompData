import { ParsedUrlQuery } from "querystring";

export const parseAWSQuery = (query: ParsedUrlQuery) => {
  return {
    filename:
      query.filename && typeof query.filename === "string"
        ? query.filename
        : "",
    uid: query.filename && typeof query.uid === "string" ? query.uid : "",
    contentType:
      query.contentType && typeof query.contentType === "string"
        ? query.contentType
        : "",
  };
};
