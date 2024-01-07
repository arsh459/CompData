import { Collection, View } from "../../../models/Collection/Collection";
import { getUserCollections } from "../../../models/Collection/Methods/getUtils";
import {
  getCollectionViews,
  getCollectionViewsObj,
} from "../../../models/Collection/Methods/viewUtils";
import { getUserLeads } from "../../../models/Lead/Methods/getUtils";
import { getUserTrips } from "../../../models/Trip/Methods/getUtils";
import { getUserBookings } from "../../../models/BookingRequestISO/Methods/getUtils";
import { Trip } from "../../../models/Trip/Trip";
import {
  getEarningSum,
  getRangeEarningByUserId,
} from "../../../models/Earning/Methods";
// import * as functions from "firebase-functions";

export const getAllUserCollectionViews = async (
  collections: Collection[] | Trip[],
  min: number,
  max: number,
  baseType: "collection" | "trip"
): Promise<View[]> => {
  const allViews: View[] = [];
  for (const collection of collections) {
    const views = await getCollectionViews(
      collection.collectionId,
      min,
      max,
      baseType
    );

    // functions.logger.log("views of collection", views);

    allViews.push(...views);
  }

  return allViews;
};

export const getAllUserCollectionViewsInObj = async (
  collections: Collection[] | Trip[],
  min: number,
  max: number,
  baseType: "collection" | "trip"
): Promise<{ [docId: string]: View }> => {
  let allViews: { [docId: string]: View } = {};
  for (const collection of collections) {
    const views = await getCollectionViewsObj(
      collection.collectionId,
      min,
      max,
      baseType
    );

    // functions.logger.log("views of collection", views);

    allViews = { ...allViews, ...views };
  }

  return allViews;
};

export const handleViewFetchRequest = async (
  uid: string,
  oneMonthAgoDate: number,
  oneMonthAgoDate_1: number,
  twoWeekAgoDate: number,
  twoWeekAgoDate_1: number
) => {
  // for collections
  const allCollections = await getUserCollections(uid);
  const allTrips = await getUserTrips(uid);

  // functions.logger.log("allCollections", allCollections.length);
  // functions.logger.log("allTrips", allTrips.length);

  const collectionViewsToShift_month = await getAllUserCollectionViews(
    allCollections,
    oneMonthAgoDate_1,
    oneMonthAgoDate,
    "collection"
  );
  const tripViewsToShift_month = await getAllUserCollectionViews(
    allTrips,
    oneMonthAgoDate_1,
    oneMonthAgoDate,
    "trip"
  );

  // functions.logger.log(
  // "collectionViewsToShift_month",
  // collectionViewsToShift_month.length
  // );
  // functions.logger.log("tripViewsToShift_month", tripViewsToShift_month.length);

  const collectionViewsToShift_week = await getAllUserCollectionViews(
    allCollections,
    twoWeekAgoDate_1,
    twoWeekAgoDate,
    "collection"
  );
  const tripViewsToShift_week = await getAllUserCollectionViews(
    allTrips,
    twoWeekAgoDate_1,
    twoWeekAgoDate,
    "trip"
  );

  return {
    views_month_reduce:
      collectionViewsToShift_month.length + tripViewsToShift_month.length,
    views_week_reduce:
      collectionViewsToShift_week.length + tripViewsToShift_week.length,
  };
};

export const handleLeadFetchRequest = async (
  uid: string,
  oneMonthAgoDate: number,
  oneMonthAgoDate_1: number,
  twoWeekAgoDate: number,
  twoWeekAgoDate_1: number
) => {
  const leadsInRange = await getUserLeads(
    uid,
    oneMonthAgoDate_1,
    twoWeekAgoDate
  );

  // functions.logger.log("leads", leadsInRange);

  const bookingsInRange = await getUserBookings(
    uid,
    oneMonthAgoDate_1,
    twoWeekAgoDate
  );

  // functions.logger.log("bookingsInRange", bookingsInRange);

  return {
    leads_month_reduce:
      leadsInRange.filter(
        (item) =>
          item.createdOn >= oneMonthAgoDate_1 &&
          item.createdOn <= oneMonthAgoDate
      ).length +
      bookingsInRange.filter(
        (item) =>
          item.unixCreationTime >= oneMonthAgoDate_1 &&
          item.unixCreationTime <= oneMonthAgoDate
      ).length,

    leads_week_reduce:
      leadsInRange.filter(
        (item) =>
          item.createdOn >= twoWeekAgoDate_1 && item.createdOn <= twoWeekAgoDate
      ).length +
      bookingsInRange.filter(
        (item) =>
          item.unixCreationTime >= twoWeekAgoDate_1 &&
          item.unixCreationTime <= twoWeekAgoDate
      ).length,
  };
};

export const handleEarningFetchRequest = async (
  uid: string,
  oneMonthAgoDate: number,
  oneMonthAgoDate_1: number,
  twoWeekAgoDate: number,
  twoWeekAgoDate_1: number
) => {
  const earningsInRange = await getRangeEarningByUserId(
    uid,
    twoWeekAgoDate,
    oneMonthAgoDate_1
  );

  return {
    earnings_month_reduce: getEarningSum(
      earningsInRange.filter(
        (item) =>
          item.createdOn >= oneMonthAgoDate_1 &&
          item.createdOn <= oneMonthAgoDate
      )
    ),

    earnings_week_reduce: getEarningSum(
      earningsInRange.filter(
        (item) =>
          item.createdOn >= twoWeekAgoDate_1 && item.createdOn <= twoWeekAgoDate
      )
    ),
  };
};
