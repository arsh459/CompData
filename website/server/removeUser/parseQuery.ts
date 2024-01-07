import { ParsedUrlQuery } from "querystring";

export const parseLeaveTeamQuery = (query: ParsedUrlQuery) => {
  return {
    eventId:
      query.eventId && typeof query.eventId === "string" ? query.eventId : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
  };
};

export const parseUserDumpQuery = (query: ParsedUrlQuery) => {
  return {
    start:
      query.start && typeof query.start === "string"
        ? parseInt(query.start)
        : -1,
    end: query.end && typeof query.end === "string" ? parseInt(query.end) : -1,
    key: query.key && typeof query.key === "string" ? query.key : "",
  };
};
