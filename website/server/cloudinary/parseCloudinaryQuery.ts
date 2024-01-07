import { ParsedUrlQuery } from "querystring";

export const parseCloudinaryQuery = (query: ParsedUrlQuery) => {
  return {
    img: query.img && typeof query.img === "string" ? query.img : "",
  };
};
