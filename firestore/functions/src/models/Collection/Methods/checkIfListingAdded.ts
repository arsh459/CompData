import { Trip } from "../../Trip/Trip";
import { Collection, LocationInterface, MediaInterface } from "../Collection";

export const getNewListingsAdded = (
  prev: Collection | Trip,
  now: Collection | Trip
) => {
  const newListingIds: string[] = [];
  const listingIdsDeleted: string[] = [];
  const newPlaceIds: string[] = [];
  const placesToDelete: string[] = [];

  if (now.listingsPresent) {
    Object.keys(now.listingsPresent).forEach((item) => {
      if (prev.listingsPresent && !prev.listingsPresent[item]) {
        newListingIds.push(item);
      }
    });
  }

  if (now.googlePlaces) {
    Object.keys(now.googlePlaces).forEach((item) => {
      if (prev.googlePlaces && !prev.googlePlaces[item]) {
        newPlaceIds.push(item);
      }
    });
  }

  if (prev.listingsPresent) {
    Object.keys(prev.listingsPresent).forEach((item) => {
      if (now.listingsPresent && !now.listingsPresent[item]) {
        listingIdsDeleted.push(item);
      }
    });
  }

  if (prev.googlePlaces) {
    Object.keys(prev.googlePlaces).forEach((item) => {
      if (now.googlePlaces && !now.googlePlaces[item]) {
        placesToDelete.push(item);
      }
    });
  }

  return {
    newIds: newListingIds,
    deletedIds: listingIdsDeleted,
    newPlaceIds: newPlaceIds,
    placesToDelete: placesToDelete,
    // bookingListingsToBeRemoved: getBookingTasksToBeAdded(now),
  };
};

// get booking tasks
// export const getBookingTasksToBeAdded = (collection: Collection) => {
//   const bookingListingsToBeRemoved: string[] = [];

//   if (collection.bookingDetails && collection.listingsPresent) {
//     Object.keys(collection.bookingDetails).forEach((item) => {
//       if (collection.listingsPresent && !collection.listingsPresent[item]) {
//         bookingListingsToBeRemoved.push(item);
//       }
//     });
//   }

//   return bookingListingsToBeRemoved;
// };

export const checkIfMediaUpdate = (
  prev: MediaInterface[],
  now: MediaInterface[]
) => {
  if (now.length !== prev.length) {
    return true;
  }

  for (let i = 0; i < now.length; i++) {
    if (now[i].dayLabel !== prev[i].dayLabel) {
      return true;
    }

    if (
      (now[i].locations && !prev[i].locations) ||
      (!now[i].locations && prev[i].locations) ||
      (now[i].locations &&
        prev[i].locations &&
        now[i].locations?.length !== prev[i].locations?.length)
    ) {
      return true;
    }

    // if both are present of same length
    if (
      now[i].locations &&
      prev[i].locations &&
      areLocationsDifferent(prev[i].locations, now[i].locations)
    ) {
      return true;
    }
  }

  return false;
};

const areLocationsDifferent = (
  prevLocations?: LocationInterface[],
  nowLocations?: LocationInterface[]
) => {
  if (
    nowLocations &&
    prevLocations &&
    nowLocations.length === prevLocations.length
  ) {
    for (let i = 0; i < nowLocations.length; i++) {
      if (nowLocations[i].listingId !== prevLocations[i].listingId) {
        return true;
      }
      if (nowLocations[i].variantId !== prevLocations[i].variantId) {
        return true;
      }

      if (nowLocations[i].qty !== prevLocations[i].qty) {
        return true;
      }
    }
  } else {
    return true;
  }

  return false;
};
