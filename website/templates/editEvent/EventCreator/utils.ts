import { formLabelValues } from "@components/drawers/constants";

export const getNextRouteV2 = (
  key: formLabelValues
): {
  nextRoute: formLabelValues;
  divId?: string;
  previousRoute?: formLabelValues;
  prevDevId?: string;
} => {
  return key === "current-event"
    ? {
        nextRoute: "name",
        divId: "program",
      }
    : key === "name"
    ? {
        nextRoute: "eventType",
        divId: "media",
      }
    : key === "eventType"
    ? {
        nextRoute: "media",
        divId: "media",
      }
    : key === "media"
    ? {
        nextRoute: "cost",
        divId: "media",
      }
    : key === "cost"
    ? {
        nextRoute: "description",
        divId: "description",
      }
    : key === "description"
    ? {
        nextRoute: "cohorts",
        divId: "cohorts",
      }
    : key === "cohorts"
    ? {
        nextRoute: "cohortSize",
        divId: "cohorts",
      }
    : key === "cohortSize"
    ? {
        nextRoute: "cohortStarts",
        divId: "cohorts",
      }
    : key === "cohortStarts"
    ? {
        nextRoute: "registerBy",
        divId: "cohorts",
      }
    : key === "registerBy"
    ? {
        nextRoute: "current-event",
      }
    : {
        nextRoute: "name",
        divId: "media",
      };
};

export const getNextRoute = (
  key: formLabelValues
): {
  nextRoute: formLabelValues;
  divId?: string;
  previousRoute?: formLabelValues;
  prevDevId?: string;
} => {
  return key === "current-event"
    ? {
        nextRoute: "eventType",
        divId: "media",
      }
    : key === "eventType"
    ? { nextRoute: "name", divId: "media" }
    : key === "name"
    ? {
        nextRoute: "program",
        divId: "program",
        previousRoute: "current-event",
        prevDevId: "name",
      }
    : key === "program"
    ? { nextRoute: "cohorts", divId: "cohorts", previousRoute: "joinURL" }
    : key === "cohorts"
    ? {
        nextRoute: "cohortSize",
        divId: "cohorts",
        previousRoute: "faq",
        prevDevId: "faq",
      }
    : key === "cohortSize"
    ? {
        nextRoute: "cohortStarts",
        divId: "cohorts",
        previousRoute: "cohorts",
        prevDevId: "cohorts",
      }
    : key === "cohortStarts"
    ? {
        nextRoute: "registerBy",
        divId: "media",
        previousRoute: "cohortSize",
        prevDevId: "cohorts",
      }
    : key === "registerBy"
    ? {
        nextRoute: "cohortJoinURL",
        divId: "media",
        previousRoute: "registerBy",
        prevDevId: "cohorts",
      }
    : key === "cohortJoinURL"
    ? {
        nextRoute: "eventKey",
        divId: "media",
        previousRoute: "current-event",
        prevDevId: "program",
      }
    : key === "eventKey"
    ? {
        nextRoute: "courseGoal",
        divId: "goal",
        previousRoute: "name",
        prevDevId: "media",
      }
    : key === "courseGoal"
    ? {
        nextRoute: "programDetails",
        divId: "goal",
        previousRoute: "eventKey",
        prevDevId: "media",
      }
    : key === "programDetails"
    ? {
        nextRoute: "cost",
        divId: "media",
        previousRoute: "courseGoal",
        prevDevId: "goal",
      }
    : key === "cost"
    ? {
        nextRoute: "description",
        divId: "description",
        previousRoute: "programDetails",
        prevDevId: "goal",
      }
    : key === "description"
    ? {
        nextRoute: "whoIsItFor",
        divId: "whoIsItFor",
        previousRoute: "cost",
        prevDevId: "media",
      }
    : key === "whoIsItFor"
    ? {
        nextRoute: "media",
        divId: "media",
        previousRoute: "description",
        prevDevId: "description",
      }
    : key === "media"
    ? {
        nextRoute: "joinURL",
        divId: "media",
        previousRoute: "whoIsItFor",
        prevDevId: "whoIsItFor",
      }
    : key === "joinURL"
    ? {
        nextRoute: "faq",
        divId: "faq",
        previousRoute: "media",
        prevDevId: "media",
      }
    : key === "faq"
    ? {
        nextRoute: "googleTitle",
        divId: "cohorts",
        previousRoute: "cohortStarts",
        prevDevId: "cohorts",
      }
    : key === "googleTitle"
    ? {
        nextRoute: "googleDescription",
        divId: "cohorts",
        previousRoute: "registerBy",
        prevDevId: "cohorts",
      }
    : key === "googleDescription"
    ? {
        nextRoute: "googleSEOImg",
        previousRoute: "googleTitle",
      }
    : key === "googleSEOImg"
    ? { nextRoute: "favIconImg", previousRoute: "googleDescription" }
    : key === "favIconImg"
    ? {
        nextRoute: "current-event",
        divId: "media",
        previousRoute: "googleSEOImg",
      }
    : { nextRoute: "name", divId: "media", previousRoute: "current-event" };
};
