import { ParsedUrlQuery } from "querystring";

export const parseNotificationQuery = (query: ParsedUrlQuery) => {
  return {
    cohortId:
      query.cohortId && typeof query.cohortId === "string"
        ? query.cohortId
        : "",
    templateId:
      query.templateId && typeof query.templateId === "string"
        ? query.templateId
        : "",
  };
};
