import { getListingSnippetFromDetail } from "../../ListingDetail/convertUtils";
import { ListingDetailInterface } from "../../ListingDetail/interface";
import {
  findCheapestVariant_pricePax,
  getDetail_brute,
} from "../../ListingDetail/Methods";
import { PricePaxInterface } from "../../ListingObj/PricePaxObj";
import {
  Collection,
  CollectionListingISO,
  LocationInterface,
  MediaInterface,
  // TripBookingInterface,
  // TripInclusion,
} from "../Collection";
import { TripBookingInterface, TripInclusion, Trip } from "../../Trip/Trip";
import { getLocationNights } from "./isValid";
// import * as functions from "firebase-functions";

export const getTripInclusions = (
  trip: Trip,
  //   listings: CollectionListingISO[]
) => {
  const tripInclusion: TripInclusion = {};
  if (trip.listingTypes["stays"]) {
    tripInclusion.accomodation = true;
  }

  // need to change
  tripInclusion.meals = "NONE";

  // need to change
  if (trip.listingTypes["cabs"]) {
    tripInclusion.transportation = "PARTIAL";
  }

  tripInclusion.equipment = false;

  // need to change
  if (
    trip.listingTypes["activities"] ||
    // trip.listingTypes["attractions"] ||
    trip.listingTypes["events"]
  ) {
    tripInclusion.activities = true;
  }

  return tripInclusion;
};

const getUpdatedPriceVariant = (
  listing: CollectionListingISO,
  variantId: string,
) => {
  const filteredVariant = listing.pricePaxVariants.filter(
    (variant) => variant.variantId === variantId,
  );

  if (filteredVariant.length > 0) {
    return filteredVariant[0];
  }

  return undefined;
};

export const getTripListings = async (
  collection: Collection | Trip,
  currentCollectionListings: { [listingId: string]: CollectionListingISO },
  baseType: "trip" | "collection",
) => {
  const response: CollectionListingISO[] = [];
  const toRemoveListings: string[] = [];
  if (collection.listingsPresent) {
    const lAd = Object.keys(collection.listingsPresent);

    // functions.logger.log("lAd", lAd);

    for (let index = 0; index < lAd.length; index++) {
      const detail = await getDetail_brute(lAd[index]);

      // functions.logger.log("index", index);
      // functions.logger.log("lAd[index]", lAd[index]);
      // functions.logger.log("getTripListings", detail?.listingId);

      if (
        detail &&
        detail.variants.length > 0 &&
        ifPresentInTrip(lAd[index], collection.collectionMedia, baseType)
      ) {
        // functions.logger.log("adding");

        response.push(
          createCollectionListing(
            detail,
            collection.uid,
            lAd.length + index,
            currentCollectionListings[lAd[index]],
          ),
        );
      } else {
        toRemoveListings.push(lAd[index]);
      }
    }
  }

  return {
    reAddListings: response,
    toRemoveListings: toRemoveListings,
  };
};

const ifPresentInTrip = (
  listingId: string,
  collectionMedia: MediaInterface[],
  baseType: "trip" | "collection",
) => {
  if (baseType === "collection") {
    return true;
  } else {
    for (const media of collectionMedia) {
      if (media.locations) {
        for (const location of media.locations) {
          if (location.listingId === listingId) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

export const getBookingPlan = (
  collectionMedia: MediaInterface[],
  listingsMap: { [listingId: string]: CollectionListingISO },
) => {
  const newBookingPlan: {
    [listingId: string]: { [variantId: string]: TripBookingInterface };
  } = {};

  for (const media of collectionMedia) {
    if (media.locations) {
      for (const location of media.locations) {
        // if required variant exists
        if (location.variantId && listingsMap[location.listingId]) {
          const listingVariant = getListingVariant(
            listingsMap[location.listingId],
            location.variantId,
          );

          if (listingVariant && newBookingPlan[location.listingId]) {
            newBookingPlan[location.listingId][
              location.variantId
            ] = getBookingVariantFromPricePax(listingVariant);
          } else if (listingVariant && !newBookingPlan[location.listingId]) {
            newBookingPlan[location.listingId] = {};
            newBookingPlan[location.listingId][
              location.variantId
            ] = getBookingVariantFromPricePax(listingVariant);
          }
        }
        // else if (!location.variantId && listingsMap[location.listingId]) {
        //   const listingVariant = getListingVariant(
        //     listingsMap[location.listingId],
        //     undefined
        //   );

        //   if (listingVariant) {
        //     newBookingPlan[location.listingId][
        //       listingVariant.variantId
        //     ] = getBookingVariantFromPricePax(listingVariant);
        //   }
        // }
      }
    }
  }

  return newBookingPlan;
};

const getMediaVariantId = (
  location: LocationInterface,
  listing: CollectionListingISO,
  //   collection: Collection,
  //   listing: CollectionListingISO
) => {
  if (location.variantId) {
    return location.variantId;
  } else {
    const cheapestVariant = findCheapestVariant_pricePax(
      listing.pricePaxVariants,
    );

    if (cheapestVariant) {
      return cheapestVariant.variantId;
    }
  }

  return undefined;

  //   const listingVariants: { [variantId: string]: TripBookingInterface } = {};
  //   if (
  //     collection.bookingDetails &&
  //     collection.bookingDetails[listing.listingId]
  //   ) {
  //     for (const variantId of Object.keys(
  //       collection.bookingDetails[listing.listingId]
  //     )) {
  //       const newPricePaxVariant = getListingVariant(listing, variantId);
  //       if (newPricePaxVariant) {
  //         const newTripBookingVariant = getBookingVariantFromPricePax(
  //           // collection.bookingDetails[listing.listingId][variantId],
  //           newPricePaxVariant
  //         );

  //         listingVariants[variantId] = newTripBookingVariant;
  //       }
  //     }
  //   } else {
  //     const newPricePaxVariant = getListingVariant(listing, undefined);
  //     if (newPricePaxVariant) {
  //       const newTripBookingVariant = getBookingVariantFromPricePax(
  //         // undefined,
  //         newPricePaxVariant
  //       );

  //       listingVariants[newTripBookingVariant.variantId] = newTripBookingVariant;
  //     }
  //   }

  //   return listingVariants;
};

export const getListingVariant = (
  listing: CollectionListingISO,
  variantId: string | undefined,
) => {
  // if listing variants are present
  if (variantId) {
    const updatedVariant = getUpdatedPriceVariant(listing, variantId);
    if (updatedVariant) {
      return updatedVariant;
    }
  } else if (!variantId) {
    const cheapestVariant = findCheapestVariant_pricePax(
      listing.pricePaxVariants,
    );

    if (cheapestVariant) {
      return cheapestVariant;
    }
  }

  return undefined;
};

const getBookingVariantFromPricePax = (
  newPricePax: PricePaxInterface,
): TripBookingInterface => {
  return {
    price: newPricePax.price,
    pax: newPricePax.pax,
    tat: newPricePax.tat,
    variantId: newPricePax.variantId,
    name: newPricePax.name ? newPricePax.name : "Variant",
  };
};

export const getTripPrice = (
  collectionMedia: MediaInterface[],
  bookingPlan: {
    [listingId: string]: { [variantId: string]: TripBookingInterface };
  },
) => {
  //   let tripPrice: number = 0;
  const tripPriceObject: { [tIndex: string]: number } = {};
  for (const media of collectionMedia) {
    if (media.locations) {
      for (const location of media.locations) {
        if (
          location.variantId &&
          bookingPlan[location.listingId] &&
          bookingPlan[location.listingId][location.variantId]
        ) {
          const nights = getLocationNights(
            media.dayLabel ? media.dayLabel : "1",
          );
          const qty = location.qty ? location.qty : 1;
          const price =
            bookingPlan[location.listingId][location.variantId].price;

          const key: string = String([
            media.dayLabel ? media.dayLabel : `untitled`,
            location.listingId,
            location.variantId,
          ]);

          if (
            !tripPriceObject[key] ||
            (tripPriceObject[key] &&
              tripPriceObject[key] < price * nights * qty)
          ) {
            tripPriceObject[key] = price * nights * qty;
          }
        }
      }
    }
  }

  return Object.values(tripPriceObject).reduce((a, b) => a + b, 0);
};

const createCollectionListing = (
  detail: ListingDetailInterface,
  uid: string,
  newIndex: number,
  collectionListingRemote?: CollectionListingISO,
): CollectionListingISO => {
  if (collectionListingRemote) {
    return collectionListingRemote;
  } else {
    return {
      ...getListingSnippetFromDetail(detail),
      listingHeading: "",
      listingTagline: "",
      listingDescription: "",
      index: newIndex,
      uid: uid,
    };
  }
};

export const formatCollectionMedia = (
  collectionMedia: MediaInterface[],
  listingMap: { [listingId: string]: CollectionListingISO },
  placesToRemove: string[],
  placesToSwitch: { [placeId: string]: CollectionListingISO },
): MediaInterface[] => {
  const formattedMedia: MediaInterface[] = [];
  return collectionMedia.reduce((acc, item) => {
    if (item.locations) {
      const updatedLocations: LocationInterface[] = [];
      item.locations = item.locations.reduce((accLoc, loc) => {
        // if listingId is present
        if (listingMap[loc.listingId]) {
          const mediaVariantId = getMediaVariantId(
            loc,
            listingMap[loc.listingId],
          );

          //   console.log("mediaVariantId", mediaVariantId);
          accLoc.push({
            ...loc,
            lat: listingMap[loc.listingId].lat,
            lng: listingMap[loc.listingId].lng,
            listingName: listingMap[loc.listingId].listingName,
            circuitName: listingMap[loc.listingId].circuitName,
            ...(mediaVariantId ? { variantId: mediaVariantId } : {}),
          });
        }
        // google place switched to listing
        else if (loc.googlePlaceId && placesToSwitch[loc.googlePlaceId]) {
          const mediaVariantId = getMediaVariantId(
            loc,
            placesToSwitch[loc.googlePlaceId],
          );

          accLoc.push({
            ...loc,
            lat: placesToSwitch[loc.googlePlaceId].lat,
            lng: placesToSwitch[loc.googlePlaceId].lng,
            listingName: placesToSwitch[loc.googlePlaceId].listingName,
            circuitName: placesToSwitch[loc.googlePlaceId].circuitName,
            ...(mediaVariantId ? { variantId: mediaVariantId } : {}),
          });
        }
        // google place present
        else if (
          loc.googlePlaceId &&
          !placesToRemove.includes(loc.googlePlaceId)
        ) {
          accLoc.push(loc);
        }

        return accLoc;
      }, updatedLocations);
    }

    // add media interface
    acc.push(item);

    return acc;
  }, formattedMedia);
};
