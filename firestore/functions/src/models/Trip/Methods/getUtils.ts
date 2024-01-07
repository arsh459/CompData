import { Trip } from "../Trip";
import * as admin from "firebase-admin";

export const getTripBytripId = async (
  tripId: string,
): Promise<Trip | undefined> => {
  const trip = await admin.firestore().collection("tripsV2").doc(tripId).get();

  if (trip.exists) {
    return trip.data() as Trip;
  }

  return undefined;
};

export const getUserTrips = async (uid: string): Promise<Trip[]> => {
  const collectionsForUser = await admin
    .firestore()
    .collection("tripsV2")
    .where("uid", "==", uid)
    .get();

  const collections: Trip[] = [];
  return collectionsForUser.docs.reduce((acc, item) => {
    acc.push(item.data() as Trip);
    return acc;
  }, collections);
};

export const getAllTrips = async (): Promise<Trip[]> => {
  const collectionsFetched = await admin
    .firestore()
    .collection("tripsV2")
    .get();

  const toReturnCollections: Trip[] = [];
  for (const doc of collectionsFetched.docs) {
    if (doc.exists) {
      toReturnCollections.push(doc.data() as Trip);
    }
  }

  return toReturnCollections;
};
