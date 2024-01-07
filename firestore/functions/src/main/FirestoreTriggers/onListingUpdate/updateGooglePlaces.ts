import * as admin from "firebase-admin";
import {
  Collection,
  CollectionListingISO,
  // CollectionListingISO,
} from "../../../models/Collection/Collection";
import { getCollectionListingsMap } from "../../../models/Collection/Methods/getUtils";
import { updateCollectionWithListings } from "../../../models/Collection/Methods/updateWithListings";
// import { GooglePlacesResult } from "../../../models/GooglePlaceResult/GooglePlaceResult";
import { getListingSnippetFromDetail } from "../../../models/ListingDetail/convertUtils";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
import { Trip } from "../../../models/Trip/Trip";

export const updatePlacesInCollection = async (
  listingNow: ListingDetailInterface,
  listingPrev?: ListingDetailInterface
) => {
  if (
    (listingNow.placeId && listingPrev && !listingPrev.placeId) || // new placeId is added
    (listingNow.placeId && !listingPrev) // new listing with placeId
  ) {
    const collectionsToAdd = await getCollectionsWithPlace(
      listingNow.placeId.trim()
    );

    const tripsToAdd = await getTripsWithPlace(listingNow.placeId.trim());

    await handlePlaceToCollection(
      collectionsToAdd,
      listingNow.placeId.trim(),
      // undefined,
      // listingNow.placeId.trim(),
      listingNow,
      // undefined,
      "collection"
    );

    await handlePlaceToCollection(
      tripsToAdd,
      listingNow.placeId.trim(),
      listingNow,
      "trip"
    );
  }
};

const getCollectionsWithPlace = async (place_id: string) => {
  const collectionsToUpdate = await admin
    .firestore()
    .collection("collections")
    .where(`googlePlaces.${place_id}`, "==", true)
    .get();

  const collections: Collection[] = [];
  for (const col of collectionsToUpdate.docs) {
    if (col.exists) {
      collections.push(col.data() as Collection);
    }
  }

  return collections;
};

const getTripsWithPlace = async (place_id: string) => {
  const tripsToUpdate = await admin
    .firestore()
    .collection("tripsV2")
    .where(`tripsV2.${place_id}`, "==", true)
    .get();

  const collections: Trip[] = [];
  for (const trp of tripsToUpdate.docs) {
    if (trp.exists) {
      collections.push(trp.data() as Trip);
    }
  }

  return collections;
};

export const handlePlaceToCollection = async (
  collections: Collection[] | Trip[],
  placeToReplace: string,
  listingToAdd: ListingDetailInterface,
  baseType: "trip" | "collection"
) => {
  for (const col of collections) {
    const currentListings = await getCollectionListingsMap(
      col.collectionId,
      baseType
    );

    const newListing: CollectionListingISO = {
      ...getListingSnippetFromDetail(listingToAdd),
      listingHeading: "",
      listingTagline: "",
      listingDescription: "",
      index: Object.keys(currentListings).length,
      uid: col.uid,
    };

    currentListings[listingToAdd.listingId] = newListing;

    // remove listing
    // if (listingToRemove && currentListings[listingToRemove]) {
    //   delete currentListings[listingToRemove];
    // }

    const listingList = Object.values(currentListings);

    // update remote
    await updateCollectionWithListings(
      col,
      listingList,
      [],
      [],
      [placeToReplace],
      { [placeToReplace]: newListing },
      baseType,
      true
    );

    /**
    const { minPrice, maxPrice } = getNewPriceRangeForListings(listingList);
    const batch = admin.firestore().batch();

    // update collection/trip
    batch.update(
      admin
        .firestore()
        .collection(baseMode === "collection" ? "collections" : "tripsV2")
        .doc(col.collectionId),
      {
        themeTags: getAggregatedThemeTags(listingList),
        groupSizeTags: getAggregatedGroupSizeTags(listingList),
        amenitiesTags: getAggregatedAmenitiesTags(listingList),
        regionTags: getAggregatedRegionTags(listingList),
        listingTypes: getAllListingTypes(listingList),
        listingsPresent: getAllListingIds(listingList), // reconcile with current listings
        minPrice: minPrice,
        maxPrice: maxPrice,
      }
    );

    // remove place
    if (placeToRemove) {
      batch.update(
        admin
          .firestore()
          .collection(baseMode === "collection" ? "collections" : "tripsV2")
          .doc(col.collectionId),
        {
          [`googlePlaces.${placeToRemove}`]: admin.firestore.FieldValue.delete(),
        }
      );

      // add all listings
      batch.delete(
        admin
          .firestore()
          .collection(baseMode === "collection" ? "collections" : "tripsV2")
          .doc(col.collectionId)
          .collection("googlePlaces")
          .doc(placeToRemove)
      );
    }

    // add place
    if (placeToAdd) {
      batch.update(
        admin
          .firestore()
          .collection(baseMode === "collection" ? "collections" : "tripsV2")
          .doc(col.collectionId),
        {
          [`googlePlaces.${placeToAdd.place_id}`]: true,
        }
      );

      batch.set(
        admin
          .firestore()
          .collection(baseMode === "collection" ? "collections" : "tripsV2")
          .doc(col.collectionId)
          .collection("googlePlaces")
          .doc(placeToAdd.place_id),
        placeToAdd,
        { merge: true } // merge
      );
    }

    // add listing
    if (listingToAdd && currentListings[listingToAdd.listingId]) {
      batch.set(
        admin
          .firestore()
          .collection(baseMode === "collection" ? "collections" : "tripsV2")
          .doc(col.collectionId)
          .collection("listings")
          .doc(listingToAdd.listingId),
        currentListings[listingToAdd.listingId],
        { merge: true } // merge
      );
    }

    // remove listing
    if (listingToRemove) {
      batch.delete(
        admin
          .firestore()
          .collection(baseMode === "collection" ? "collections" : "tripsV2")
          .doc(col.collectionId)
          .collection("listings")
          .doc(listingToRemove)
      );
    }

    // save batch result
    await batch.commit();
     */
  }
};
