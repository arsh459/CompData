import { ParsedUrlQuery } from "querystring";

export const parseLeaderboardQuery = (query: ParsedUrlQuery) => {
  return {
    gameId:
      query.gameId && typeof query.gameId === "string" ? query.gameId : "",
  };
};

export const parseCreateTeamQuery = (query: ParsedUrlQuery) => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
  };
};
