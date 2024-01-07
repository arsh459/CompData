import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { activityQuery } from "@hooks/tasks/access/useIsTaskAllowed";
import { reviewStatus } from "@models/Activities/Activity";
import { ParsedUrlQuery } from "querystring";

export const parseSearchQuery = (
  query: ParsedUrlQuery
): adminDashboardQuery => {
  return query as adminDashboardQuery;
};

export const parseAlgoliaActivityQuery = (
  query: ParsedUrlQuery
): activityQuery => {
  return {
    player:
      query.player && typeof query.player === "string" ? query.player : "",
    dS: query.dS && typeof query.dS === "string" ? query.dS : "",
    game: query.game && typeof query.game === "string" ? query.game : "",
    reviewStatus:
      query[`reviewStatus[]`] && typeof query[`reviewStatus[]`] === "string"
        ? ([query[`reviewStatus[]`]] as reviewStatus[])
        : query[`reviewStatus[]`] && typeof query[`reviewStatus[]`] === "object"
        ? (query[`reviewStatus[]`] as reviewStatus[])
        : [],
    taskIds:
      query[`taskIds[]`] && typeof query[`taskIds[]`] === "string"
        ? [query[`taskIds[]`]]
        : query[`taskIds[]`] && typeof query[`taskIds[]`] === "object"
        ? query[`taskIds[]`]
        : [],
  };
};
