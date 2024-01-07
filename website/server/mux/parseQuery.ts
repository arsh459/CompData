import { ParsedUrlQuery } from "querystring";

export const parseMuxQuery = (query: ParsedUrlQuery): { url: string } => {
  return {
    url: query.url && typeof query.url === "string" ? query.url : "",
  };
};
