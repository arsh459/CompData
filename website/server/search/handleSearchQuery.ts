import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { AlgoliaSearchResponse } from "@models/Algolia/Algolia";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID ? process.env.ALGOLIA_APPLICATION_ID : "",
  process.env.ALGOLIA_KEY ? process.env.ALGOLIA_KEY : ""
);

const index = client.initIndex("activities");

export const handleSearchQuery = async (query: adminDashboardQuery) => {
  // console.log("filters", generateFilterString(query));

  return (await index.search("", {
    page: query.page ? parseInt(query.page) : 0,
    hitsPerPage: 25,
    filters: generateFilterString(query),
    // optionalFilters: generateOptionalFilters(query),
  })) as AlgoliaSearchResponse;
};

export const generateFilterString = (query: adminDashboardQuery) => {
  let returnString = "";
  if (query.player) {
    returnString += ` ${returnString ? "AND" : ""} authorUID:${query.player}`;
  }

  if (query.onlyPositive) {
    returnString += ` ${returnString ? "AND" : ""} calories > 0`;
  }

  if (query.taskId) {
    returnString += ` ${returnString ? "AND" : ""} taskId:${query.taskId}`;
  }

  if (query.game) {
    returnString += ` ${returnString ? "AND" : ""} games:${query.game}`;
  }

  if (query.agent) {
    returnString += ` ${returnString ? "AND" : ""} activeMessage.authorUID:${
      query.agent
    }`;
  }

  if (!query.dE && query.dS) {
    returnString += ` ${returnString ? "AND" : ""} createdOn:${query.dS} TO ${
      parseInt(query.dS) + 24 * 60 * 60 * 1000
    }`;
  } else if (query.dS && query.dE) {
    returnString += ` ${returnString ? "AND" : ""} createdOn:${query.dS} TO ${
      query.dE
    }`;
  }

  if (query.state) {
    returnString += ` ${returnString ? "AND" : ""} reviewStatus:${query.state}`;
  }

  if (query.team) {
    returnString += ` ${returnString ? "AND" : ""} teamId:${query.team}`;
  }

  return returnString.trim();
};

export const generateOptionalFilters = (query: adminDashboardQuery) => {
  const filters: string[] = [];
  if (query.state) {
    filters.push(`reviewStatus:${query.state}`);
  }

  if (query.team) {
    filters.push(`teamId:${query.team}`);
  }

  return filters;
};
