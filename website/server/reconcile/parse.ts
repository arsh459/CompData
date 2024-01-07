import { ParsedUrlQuery } from "querystring";

export const parseReconcileCoachesQuery = (query: ParsedUrlQuery) => {
  return {
    eventId:
      query.eventId && typeof query.eventId === "string" ? query.eventId : "",
  };
};

export const parseTaskQuery = (query: ParsedUrlQuery) => {
  return {
    taskId:
      query.taskId && typeof query.taskId === "string" ? query.taskId : "",
  };
};

export const parseUserActivityQuery = (query: ParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    limit: query.limit && typeof query.limit === "number" ? query.limit : "",
    unix: query.unix && typeof query.unix === "number" ? query.unix : "",
  };
};
