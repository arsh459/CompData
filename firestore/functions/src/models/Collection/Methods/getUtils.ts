import * as admin from "firebase-admin";
import { Trip } from "../../Trip/Trip";
// import * as functions from "firebase-functions";
import { Collection, CollectionListingISO } from "../Collection";

export const getUserCollections = async (
  uid: string,
): Promise<Collection[]> => {
  const collectionsForUser = await admin
    .firestore()
    .collection("collections")
    .where("uid", "==", uid)
    .get();

  const collections: Collection[] = [];
  return collectionsForUser.docs.reduce((acc, item) => {
    acc.push(item.data() as Collection);
    return acc;
  }, collections);
};

export const getCollectionByCollectionId = async (
  collectionId: string,
): Promise<Collection | undefined> => {
  const collectionFetched = await admin
    .firestore()
    .collection("collections")
    .doc(collectionId)
    .get();

  if (collectionFetched.exists) {
    return collectionFetched.data() as Collection;
  }

  return undefined;
};

export const getPublicCollections = async (): Promise<Collection[]> => {
  const collectionsFetched = await admin
    .firestore()
    .collection("collections")
    .where("visibility", "==", "PUBLIC")
    .get();

  const toReturnCollections: Collection[] = [];
  for (const doc of collectionsFetched.docs) {
    if (doc.exists) {
      toReturnCollections.push(doc.data() as Collection);
    }
  }

  return toReturnCollections;
};

export const getPublicTrips = async (): Promise<Trip[]> => {
  const tripsFetched = await admin
    .firestore()
    .collection("tripsV2")
    .where("visibility", "==", "PUBLIC")
    .get();

  const toReturnCollections: Trip[] = [];
  for (const doc of tripsFetched.docs) {
    if (doc.exists) {
      toReturnCollections.push(doc.data() as Trip);
    }
  }

  return toReturnCollections;
};

export const getAllCollections = async (): Promise<Collection[]> => {
  const collectionsFetched = await admin
    .firestore()
    .collection("collections")
    .get();

  const toReturnCollections: Collection[] = [];
  for (const doc of collectionsFetched.docs) {
    if (doc.exists) {
      toReturnCollections.push(doc.data() as Collection);
    }
  }

  return toReturnCollections;
};

export const getCollectionListings = async (
  collectionId: string,
  baseType: "collection" | "trip",
): Promise<CollectionListingISO[] | undefined> => {
  const collectionListings = await admin
    .firestore()
    .collection(baseType === "collection" ? "collections" : "tripsV2")
    .doc(collectionId)
    .collection("listings")
    .get();

  const remoteListings: CollectionListingISO[] = [];
  return collectionListings.docs.reduce((acc, item) => {
    acc.push(item.data() as CollectionListingISO);
    return acc;
  }, remoteListings);
};

export const getCollectionListingsMap = async (
  collectionId: string,
  baseMode: "trip" | "collection",
): Promise<{ [listingId: string]: CollectionListingISO }> => {
  const collectionListings = await admin
    .firestore()
    .collection(baseMode === "collection" ? "collections" : "tripsV2")
    .doc(collectionId)
    .collection("listings")
    .get();

  // functions.logger.log("getting listings", collectionListings.docs);

  const remoteListings: { [listingId: string]: CollectionListingISO } = {};
  const toReturnValue = collectionListings.docs.reduce((acc, item) => {
    if (item.exists) {
      const listing = item.data() as CollectionListingISO;
      acc[listing.listingId] = listing;
    }

    return acc;
  }, remoteListings);

  // functions.logger.log("toReturnValue", toReturnValue);

  return toReturnValue;
};

export const getCollectionListingById = async (
  collectionId: string,
  listingId: string,
): Promise<CollectionListingISO | undefined> => {
  const collectionListing = await admin
    .firestore()
    .collection("collections")
    .doc(collectionId)
    .collection("listings")
    .doc(listingId)
    .get();

  if (collectionListing.exists) {
    return collectionListing.data() as CollectionListingISO;
  }

  return undefined;
};

export const getCollectionByPublicId = async (
  publicId: string,
  baseType: "collection" | "trip",
): Promise<(Collection | Trip)[]> => {
  const collections = await admin
    .firestore()
    .collection(baseType === "trip" ? "tripsV2" : "collections")
    .where("processingPublicIds", "array-contains", publicId)
    .get();

  if (baseType === "collection") {
    const toReturnCollections: Collection[] = [];
    for (const doc of collections.docs) {
      if (doc.exists) {
        toReturnCollections.push(doc.data() as Collection);
      }
    }

    return toReturnCollections;
  } else {
    const toReturnTrips: Trip[] = [];
    for (const doc of collections.docs) {
      if (doc.exists) {
        toReturnTrips.push(doc.data() as Trip);
      }
    }

    return toReturnTrips;
  }
};

export const getCollectionImage = (collection: Collection | Trip): string => {
  const photoMedia = collection.collectionMedia.filter(
    (media) => media.type === "cloud_photo" || media.type === "photo",
  );
  if (photoMedia.length > 0) {
    return photoMedia[0].url;
  }

  return "";
};
