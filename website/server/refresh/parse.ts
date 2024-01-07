import { NextParsedUrlQuery } from "next/dist/server/request-meta";

export const parseRefreshQuery = (
  query: NextParsedUrlQuery
): { type: string } => {
  return {
    type: query.type && typeof query.type === "string" ? query.type : "task",
  };
};
