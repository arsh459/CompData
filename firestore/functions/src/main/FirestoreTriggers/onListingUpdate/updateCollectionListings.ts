import * as admin from "firebase-admin";
import {
  Collection,
  CollectionListingISO,
} from "../../../models/Collection/Collection";
import { getCollectionListingsMap } from "../../../models/Collection/Methods/getUtils";
import { updateCollectionWithListings } from "../../../models/Collection/Methods/updateWithListings";
import { getListingSnippetFromDetail } from "../../../models/ListingDetail/convertUtils";
// import {getListingSnippetFromDetail} from '../../../models/ListingDetail/convertUtils';
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
import { isDetailValid } from "../../../models/ListingDetail/Methods";
import { Trip } from "../../../models/Trip/Trip";

export const updateListingsInCollection = async (
  listing: ListingDetailInterface,
) => {
  // check if listing is valid
  if (isDetailValid(listing)) {
    await updateListingsInCollectionTrip(listing, "add");
  } else {
    await updateListingsInCollectionTrip(listing, "delete");
  }
  // if valid update in trip && collection
  // if invalid remove from trip && collection
};

export const updateListingsInCollectionTrip = async (
  listing: ListingDetailInterface,
  action: "add" | "delete",
) => {
  // const listingSnippet = getListingSnippetFromDetail(listing);
  const collectionsToUpdate = await admin
    .firestore()
    .collection("collections")
    .where(`listingsPresent.${listing.listingId}`, "==", true)
    .get();

  const tripsToUpdate = await admin
    .firestore()
    .collection("tripsV2")
    .where(`listingsPresent.${listing.listingId}`, "==", true)
    .get();

  // update listings in collection
  for (const collectionToUpdate of collectionsToUpdate.docs) {
    if (collectionToUpdate.exists) {
      const collection = collectionToUpdate.data() as Collection;

      if (action === "add") {
        await updateListingInCollectionTrip(collection, listing, "collection");
      } else {
        await removeListingInCollectionTrip(collection, listing, "collection");
      }
    }
  }

  // update trips in collection
  for (const tripToUpdate of tripsToUpdate.docs) {
    if (tripToUpdate.exists) {
      const trip = tripToUpdate.data() as Trip;

      if (action === "add") {
        await updateListingInCollectionTrip(trip, listing, "trip");
      } else {
        await removeListingInCollectionTrip(trip, listing, "trip");
      }
    }
  }
};

const updateListingInCollectionTrip = async (
  collection: Collection | Trip,
  listing: ListingDetailInterface,
  baseType: "collection" | "trip",
) => {
  const {
    [listing.listingId]: prevListing,
    ...rest
  } = await getCollectionListingsMap(collection.collectionId, baseType);

  const newCollectionListings = [
    ...Object.values(rest),
    getUpdatedCollectionListing(
      listing,
      prevListing,
      collection.uid,
      Object.keys(rest).length,
    ),
  ];

  // update collection
  await updateCollectionWithListings(
    collection,
    newCollectionListings,
    [],
    [],
    [],
    {},
    baseType,
    true,
  );
};

const removeListingInCollectionTrip = async (
  collection: Collection | Trip,
  listing: ListingDetailInterface,
  baseType: "collection" | "trip",
) => {
  const {
    [listing.listingId]: prevListing,
    ...rest
  } = await getCollectionListingsMap(collection.collectionId, baseType);

  const newCollectionListings = Object.values(rest);

  // update collection
  await updateCollectionWithListings(
    collection,
    newCollectionListings,
    [],
    [listing.listingId],
    [],
    {},
    baseType,
    true,
  );
};

const getUpdatedCollectionListing = (
  newListing: ListingDetailInterface,
  prevListing: CollectionListingISO | undefined,
  uid: string,
  newIndex: number,
): CollectionListingISO => {
  if (prevListing) {
    return {
      ...getListingSnippetFromDetail(newListing),
      listingHeading: prevListing.listingHeading,
      listingTagline: prevListing.listingTagline,
      listingDescription: prevListing.listingDescription,
      index: prevListing.index,
      uid: prevListing.uid,
    };
  } else {
    return {
      ...getListingSnippetFromDetail(newListing),
      listingHeading: "",
      listingTagline: "",
      listingDescription: "",
      index: newIndex,
      uid: uid,
    };
  }
};
