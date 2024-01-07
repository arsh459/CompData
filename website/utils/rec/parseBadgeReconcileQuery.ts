import { ParsedUrlQuery } from "querystring";

export const parseBadgeReconcileQuery = (query: ParsedUrlQuery) => {
  return {
    badgeId:
      query.badgeId && typeof query.badgeId === "string" ? query.badgeId : "",
    reconcile:
      query.reconcile &&
      typeof query.reconcile === "string" &&
      query.reconcile === "true"
        ? true
        : false,
  };

  // return "";
};
