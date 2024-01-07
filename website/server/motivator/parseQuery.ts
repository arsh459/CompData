import { ParsedUrlQuery } from "querystring";

export const parseMotivatorQuery = (
  query: ParsedUrlQuery
): { uid: string; coach: string; adSource: string } => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    coach: query.coach && typeof query.coach === "string" ? query.coach : "",
    adSource:
      query.adSource && typeof query.adSource === "string"
        ? query.adSource
        : "",
  };
};

export const parseCheckQuery = (query: ParsedUrlQuery): { uid: string } => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
  };
};
