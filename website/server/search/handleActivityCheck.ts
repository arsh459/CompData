import { activityQuery } from "@hooks/tasks/access/useIsTaskAllowed";
import { AlgoliaSearchResponse } from "@models/Algolia/Algolia";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID ? process.env.ALGOLIA_APPLICATION_ID : "",
  process.env.ALGOLIA_KEY ? process.env.ALGOLIA_KEY : ""
);

const index = client.initIndex("activities");

export const handleActivitySearchQuery = async (query: activityQuery) => {
  // console.log("filters", generateFilterString(query));

  return (await index.search("", {
    hitsPerPage: 25,
    filters: generateActivityFilterString(query),
    // optionalFilters: generateOptionalFilters(query),
  })) as AlgoliaSearchResponse;
};

const generateActivityFilterString = (query: activityQuery) => {
  let returnString = "";
  if (query.player) {
    returnString += ` ${returnString ? "AND" : ""} authorUID:${query.player}`;
  }

  if (query.game) {
    returnString += ` ${returnString ? "AND" : ""} games:${query.game}`;
  }

  if (query.dS) {
    returnString += ` ${returnString ? "AND" : ""} createdOn:${
      query.dS
    } TO ${Date.now()}`;
  }

  if (query.taskIds) {
    returnString += ` AND ${query.taskIds.length > 1 ? "(" : ""}`;
    let i: number = 0;
    for (const taskId of query.taskIds) {
      returnString += `${i ? " OR " : ""}taskId:${taskId}`;
      i++;
    }
    returnString += `${query.taskIds.length > 1 ? ")" : ""}`;
  }

  if (query.reviewStatus) {
    returnString += ` AND ${query.reviewStatus.length > 1 ? "(" : ""}`;
    let i: number = 0;
    for (const status of query.reviewStatus) {
      returnString += `${i ? " OR " : ""}reviewStatus:${status}`;
      i++;
    }
    returnString += `${query.reviewStatus.length > 1 ? ")" : ""}`;
  }

  // console.log("returnString", returnString);

  return returnString.trim();
};
