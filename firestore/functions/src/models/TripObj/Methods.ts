import { TripObjInterface, OperatingWindow } from "./Trip";
import { ListingInterface } from "..//ListingObj/Listing";
import { getCoordinatesOfListing } from "..//ListingObj/Methods";
import { fetchOne } from "../../utils/firestore/fetchOne";

import { getFormattedOperatingWindows, getFormattedTrip } from "./utils";
import * as admin from "firebase-admin";

export const getCurrentTripState = (
  allTasks: { [name: string]: ListingInterface },
  tripObj: TripObjInterface,
  window: OperatingWindow,
) => {
  // console.log('trip', tripObj.trip);
  // console.log('window', window);
  // console.log(tripObj.trip[window.windowId][-1]);

  // if previous tasks are present
  const arrLen = tripObj.trip[window.windowId].length;
  // console.log('arrLen', arrLen);
  if (arrLen > 0) {
    return {
      ...getCoordinatesOfListing(
        allTasks[tripObj.trip[window.windowId][arrLen - 1].listingId],
      ),
      timeStart: tripObj.trip[window.windowId][arrLen - 1].timeEnd,
    };
  }

  return {
    lat: tripObj.tripState.starts[window.windowId].lat,
    lng: tripObj.tripState.starts[window.windowId].lng,
    timeStart: window.timeStart,
  };
};

export const getTripById = async (tripId: string) => {
  // const tripObj = await fetchOne("trips", tripId);
  // console.log('remoteTripObj', tripObj.data());
  // return await tPromise.decode(TripObj, tripObj.data());
};

export const getTripById_UNSAFE = async (
  tripId: string,
): Promise<TripObjInterface | undefined> => {
  const tripObj = await fetchOne("trips", tripId);
  const data = tripObj.data();

  if (data !== undefined) {
    return data as TripObjInterface;
  }

  return undefined;
};

export const covertTripObjToFormat = (trip: TripObjInterface) => {
  return {
    ...trip,
    operatingWindows: getFormattedOperatingWindows(trip.operatingWindows),
    trip: getFormattedTrip(trip.trip),
    timeStart: trip.timeStart.format(),
    timeEnd: trip.timeEnd.format(),
  };
};

export const getAllSavedTripsForUser = async (
  uid: string,
): Promise<TripObjInterface[]> => {
  const savedTrips = await admin
    .firestore()
    .collection("trips")
    .where("uid", "==", uid)
    .where("saved", "==", true)
    .get();

  const trips: TripObjInterface[] = [];
  return savedTrips.docs.reduce((acc, item) => {
    acc.push(item.data() as TripObjInterface);
    return acc;
  }, trips);
};
