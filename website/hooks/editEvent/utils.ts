import { eventDrawer } from "@components/drawers/constants";
import { DrawerElement } from "@components/drawers/Drawer";
import { EventInterface } from "@models/Event/Event";

export const getNewDrawerForEvent = (data: EventInterface) => {
  const newDrawer: DrawerElement[] = [];
  return eventDrawer.reduce((acc, item) => {
    if (
      (item.value === "name" ||
        item.value === "description" ||
        item.value === "courseGoal" ||
        item.value === "googleDescription" ||
        item.value === "googleTitle" ||
        item.value === "eventKey" ||
        item.value === "eventType" ||
        item.value === "joinURL") &&
      data[item.value]
    ) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (
      (item.value === "name" ||
        item.value === "description" ||
        item.value === "courseGoal" ||
        item.value === "googleDescription" ||
        item.value === "googleTitle" ||
        item.value === "eventKey" ||
        item.value === "eventType" ||
        item.value === "joinURL") &&
      !data[item.value]
    ) {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (
      item.value === "program" &&
      data.program &&
      data.program.length > 0
    ) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (item.value === "program") {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (
      item.value === "cost" &&
      typeof data[item.value] === "number" &&
      data[item.value] >= 0
    ) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (item.value === "cost") {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (item.value === "media" && data.media.length > 0) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (item.value === "media" && data.media.length === 0) {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (
      item.value === "current-event" &&
      data.name &&
      // data.cost &&
      data.description &&
      data.joinURL &&
      data.media.length > 0
    ) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (
      item.value === "current-event" &&
      (!data.name ||
        // !data.cost ||
        !data.description ||
        !data.joinURL ||
        data.media.length === 0)
    ) {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (
      item.value === "schedule" &&
      data.eventDateTimeList &&
      data.eventDateTimeList.length > 0
    ) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (item.value === "schedule") {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (
      item.value === "whoIsItFor" &&
      data.whoIsItFor &&
      data.whoIsItFor.length > 0
    ) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (item.value === "whoIsItFor") {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (item.value === "faq" && data.faq && data.faq.length > 0) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (item.value === "faq") {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (
      item.value === "programDetails" &&
      data.programDetails &&
      data.programDetails.length > 0
    ) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (item.value === "programDetails") {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (
      item.value === "cohorts" ||
      item.value === "cohortSize" ||
      item.value === "cohortStarts" ||
      item.value === "registerBy" ||
      item.value === "cohortJoinURL"
    ) {
      acc.push(item);
    } else if (item.value === "googleSEOImg" && data.googleSEOImg) {
      acc.push({ ...item, elementLabel: "live" });
    } else if (item.value === "googleSEOImg") {
      acc.push({ ...item, elementLabel: "todo" });
    } else if (item.value === "favIconImg") {
      acc.push(item);
    } else if (item.value === "thumbnail") {
      acc.push(item);
    }

    return acc;
  }, newDrawer);
};
