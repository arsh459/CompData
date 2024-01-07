import { ParsedUrlQuery } from "querystring";

export const parseViewQuery = (query: ParsedUrlQuery) => {
  return {
    eventId:
      query.eventId && typeof query.eventId === "string" ? query.eventId : "",
    ownerUID:
      query.ownerUID && typeof query.ownerUID === "string"
        ? query.ownerUID
        : "",
  };
};
