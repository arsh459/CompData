import { Collection, CollectionListingISO } from "../Collection";
import * as admin from "firebase-admin";
import { GooglePlacesResult } from "../../GooglePlaceResult/GooglePlaceResult";
import { getGooglePlaceDetailsForList } from "../../GooglePlaceDetail/Methods/getUtils";
import { getUpdatedCollection, getUpdatedTrip } from "./isValid";
import { getTripListings } from "./tripUtils";
import { Trip } from "../../Trip/Trip";
// import * as functions from "firebase-functions";

export const updateCollectionWithListingIds = async (
  prevCollection: Collection | Trip,
  placesToAdd: string[],
  listingsToRemove: string[],
  placesToRemove: string[],
  currentCollectionListings: { [listingId: string]: CollectionListingISO },
  baseType: "trip" | "collection",
  serverTrigger?: boolean,
) => {
  if (prevCollection.listingsPresent) {
    // get collection listings
    const { reAddListings, toRemoveListings } = await getTripListings(
      prevCollection,
      currentCollectionListings,
      baseType,
    );

    // console.log("listings readded got");

    const places = await getGooglePlaceDetailsForList(placesToAdd);
    // console.log('places', places);

    // functions.logger.log("reAddListings", reAddListings);
    // for (const li of reAddListings) {
    //   // functions.logger.log("listing to add", li.listingId);
    // }

    // update remote
    await updateCollectionWithListings(
      prevCollection,
      reAddListings,
      places,
      [...listingsToRemove, ...toRemoveListings], // remove listings that are invalid
      placesToRemove,
      {},
      baseType,
      serverTrigger,
    );
  }
};

export const updateCollectionWithListings = async (
  collection: Collection | Trip,
  listings: CollectionListingISO[],
  placeObjsToAdd: GooglePlacesResult[],
  listingsToRemove: string[],
  placesToDelete: string[],
  placesToSwitch: { [placeId: string]: CollectionListingISO },
  baseType: "trip" | "collection",
  serverTrigger?: boolean,
) => {
  // functions.logger.log("baseType", baseType);

  if (baseType === "collection") {
    const newCollection = getUpdatedCollection(
      collection as Collection,
      listings,
      placeObjsToAdd.map((place) => place.place_id),
      placesToDelete,
      placesToSwitch,
      serverTrigger,
    );

    // functions.logger.log("newCollection", newCollection);

    await updateRemote_TripCollection(
      newCollection,
      listings,
      placeObjsToAdd,
      listingsToRemove,
      placesToDelete,
      baseType,
    );
  } else {
    const newCollection = getUpdatedTrip(
      collection as Trip,
      listings,
      placeObjsToAdd.map((place) => place.place_id),
      placesToDelete,
      placesToSwitch,
      serverTrigger,
    );
    await updateRemote_TripCollection(
      newCollection,
      listings,
      placeObjsToAdd,
      listingsToRemove,
      placesToDelete,
      baseType,
    );
  }
};

export const updateRemote_TripCollection = async (
  collection: Collection | Trip,
  listings: CollectionListingISO[],
  placeObjsToAdd: GooglePlacesResult[],
  listingsToRemove: string[],
  placesToDelete: string[],
  baseType: "trip" | "collection",
) => {
  const batch = admin.firestore().batch();
  // batch.update(
  //   admin
  //     .firestore()
  //     .collection(baseType === "trip" ? "tripsV2" : "collections")
  //     .doc(collection.collectionId),
  //   collection,
  // );

  // Re-add all listings
  listings.map((listing) => {
    batch.set(
      admin
        .firestore()
        .collection(baseType === "trip" ? "tripsV2" : "collections")
        .doc(collection.collectionId)
        .collection("listings")
        .doc(listing.listingId),
      listing,
      { merge: true }, // merge
    );
  });

  // remove listings not needed
  listingsToRemove.map((listing) => {
    batch.delete(
      admin
        .firestore()
        .collection(baseType === "trip" ? "tripsV2" : "collections")
        .doc(collection.collectionId)
        .collection("listings")
        .doc(listing),
    );
  });

  // Add required places
  placeObjsToAdd.map((googlePlace) => {
    batch.set(
      admin
        .firestore()
        .collection(baseType === "trip" ? "tripsV2" : "collections")
        .doc(collection.collectionId)
        .collection("googlePlaces")
        .doc(googlePlace.place_id),
      googlePlace,
      { merge: true }, // merge
    );
  });

  // Remove deleted places
  placesToDelete.map((place) => {
    batch.delete(
      admin
        .firestore()
        .collection(baseType === "trip" ? "tripsV2" : "collections")
        .doc(collection.collectionId)
        .collection("googlePlaces")
        .doc(place),
    );
  });

  await batch.commit();
};
