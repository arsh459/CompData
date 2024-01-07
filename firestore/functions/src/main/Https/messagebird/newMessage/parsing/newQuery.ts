import {
  locationIdentifier,
  endIdentifier,
  dateIdentifier,
  paxIdentifier,
  offbeatIdentifier,
  classicIdentifier,
  basicIdentifier,
  premiumIdentifier,
  luxuryIdentifier,
} from "../../constants/identifiers";
import { TravelQueryInterface } from "../../../../../models/Conversations/Conversation";
// const sugar = require("sugar-date");

export const parseNewQuery = (query: string) => {
  if (checkIfAutomatedQuery(query)) {
    return {
      location: getLocation(query),
      dates: getDates(query),
      pax: getPax(query),
      offbeat: getOffbeat(query),
      rangeClassification: getRange(query),
    } as TravelQueryInterface;
  } else {
    return query;
  }
};

const checkIfAutomatedQuery = (query: string) => {
  if (
    query.search(locationIdentifier) !== -1 &&
    query.search(endIdentifier) !== -1
  ) {
    return true;
  }

  return false;
};

const getLocation = (query: string) => {
  return query.substring(
    query.search(locationIdentifier) + 1,
    query.search(endIdentifier),
  );
};

const getDates = (query: string) => {
  // if dates exist
  if (query.search(dateIdentifier) !== -1) {
    const dateObj: { startDate?: string; endDate?: string } = {};

    // const substring = query.substring(
    //   query.search(dateIdentifier) + 5,
    //   query.length,
    // );

    // const dateSubString = substring.substring(
    //   substring.search(dateIdentifier) + 1,
    //   substring.search(endIdentifier),
    // );

    // const dateComponents = dateSubString.split("-");
    // console.log("dateComponents", dateComponents);

    // if (dateComponents.length > 0) {
    //   dateObj.startDate = sugar.Date.create(dateComponents[0].trim());
    // }

    // if (dateComponents.length > 1) {
    //   dateObj.endDate = sugar.Date.create(dateComponents[1].trim());
    // }

    return dateObj;
  }
  return undefined;
};

const getPax = (query: string) => {
  if (query.search(paxIdentifier) !== -1) {
    const subString = query.substring(
      query.search(paxIdentifier) + 4,
      query.length - 1,
    );

    // console.log("subString", subString);

    // pax string like: 2 adults, 3 children, 4 infants
    const paxString = subString.substring(
      subString.search(paxIdentifier) + 1,
      subString.search(endIdentifier),
    );

    // console.log("paxString", paxString);

    return splitPaxComonents(paxString);
  }

  return undefined;
};

const splitPaxComonents = (paxString: string) => {
  const paxComponents = paxString.split(",");

  const paxQuery: { adults?: number; children?: number; infants?: number } = {};
  if (paxComponents.length > 0) {
    paxQuery.adults = parseInt(paxComponents[0].trim());
  }

  if (paxComponents.length > 1) {
    paxQuery.children = parseInt(paxComponents[1].trim());
  }

  if (paxComponents.length > 2) {
    paxQuery.infants = parseInt(paxComponents[2].trim());
  }

  return paxQuery;
};

const getOffbeat = (query: string) => {
  if (query.search(offbeatIdentifier) !== -1) {
    return "offbeat";
  } else if (query.search(classicIdentifier) !== -1) {
    return "classic";
  }

  return undefined;
};

const getRange = (query: string) => {
  if (query.search(basicIdentifier) !== -1) {
    return "basic";
  } else if (query.search(premiumIdentifier) !== -1) {
    return "premium";
  } else if (query.search(luxuryIdentifier) !== -1) {
    return "luxury";
  }

  return undefined;
};
