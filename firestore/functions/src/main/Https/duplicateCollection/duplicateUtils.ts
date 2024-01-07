import {
  Collection,
  CollectionListingISO,
} from "../../../models/Collection/Collection";
import { getAuthor } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { v4 as uuid } from "uuid";
import * as admin from "firebase-admin";
import { getCollectionListings } from "../../../models/Collection/Methods/getUtils";
import { Trip } from "../../../models/Trip/Trip";

export const duplicateCollectionSet = async (
  baseCollection: Collection | Trip,
  targetUser: UserInterface,
  baseType: "collection" | "trip",
): Promise<string> => {
  const newCollection =
    baseType === "collection"
      ? duplicateCollection(baseCollection as Collection, targetUser)
      : duplicateTrip(baseCollection as Trip, targetUser);
  const collectionListings = await getCollectionListings(
    baseCollection.collectionId,
    baseType,
  );

  const newCollectionListings = duplicateCollectionListings(
    collectionListings ? collectionListings : [],
    targetUser,
  );

  return await addCollectionToRemote(
    newCollection,
    newCollectionListings,
    baseType,
  );
};

const duplicateCollection = (
  baseCollection: Collection,
  user: UserInterface,
): Collection => {
  return {
    ...baseCollection,
    collectionId: uuid(),
    uid: user.uid,
    createdOnUnix: new Date().getTime(),
    author: getAuthor(user),
    collectionKey: `${baseCollection.collectionKey}-${
      Math.floor(Math.random() * 90000) + 10000
    }`,
  };
};

const duplicateTrip = (baseCollection: Trip, user: UserInterface): Trip => {
  return {
    ...baseCollection,
    collectionId: uuid(),
    uid: user.uid,
    createdOnUnix: new Date().getTime(),
    author: getAuthor(user),
    collectionKey: `${baseCollection.collectionKey}-${
      Math.floor(Math.random() * 90000) + 10000
    }`,
  };
};

const duplicateCollectionListings = (
  collectionListings: CollectionListingISO[],
  user: UserInterface,
): CollectionListingISO[] => {
  const response: CollectionListingISO[] = [];
  return collectionListings.reduce((acc, item) => {
    acc.push({
      ...item,
      uid: user.uid,
    });

    return acc;
  }, response);
};

export const addCollectionToRemote = async (
  collection: Collection | Trip,
  listings: CollectionListingISO[],
  baseType: "collection" | "trip",
) => {
  const batch = admin.firestore().batch();
  batch.set(
    admin
      .firestore()
      .collection(baseType === "collection" ? "collections" : "tripsV2")
      .doc(collection.collectionId),
    collection,
  );

  listings.map((listing) => {
    batch.set(
      admin
        .firestore()
        .collection(baseType === "collection" ? "collections" : "tripsV2")
        .doc(collection.collectionId)
        .collection("listings")
        .doc(listing.listingId),
      listing,
    );
  });
  await batch.commit();
  return collection.collectionId;
};
