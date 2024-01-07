import { ParsedUrlQuery } from "querystring";

export const parsePhoneQuery = (query: ParsedUrlQuery) => {
  return {
    phone: query.phone && typeof query.phone === "string" ? query.phone : "",
  };
};
