import { GooglePlaceDetail } from "../../GooglePlaceDetail/GooglePlaceDetail";
import { getCollectionPlacesMap } from "../../GooglePlaceDetail/Methods/getUtils";
import { isTripFromCollection, Trip } from "../../Trip/Trip";
import {
  Collection,
  CollectionListingISO,
  //    MediaSnippet
} from "../Collection";
import {
  //CollectionListingSnippet,
  CollectionSnippet,
} from "../CollectionSnippet";
import {
  getAggregatedAmenitiesTags,
  getAggregatedGroupSizeTags,
  getAggregatedRegionTags,
  getAggregatedThemeTags,
  getAllListingIds,
  getListingsInCollection,
  getAllListingTypes,
  getUpdatedPlaceIds,
  getNewPriceRangeForListings,
} from "./addMultipleListings";
import { getCollectionListingsMap } from "./getUtils";
import {
  formatCollectionMedia,
  getBookingPlan,
  getTripInclusions,
  getTripPrice,
  // getBookingPlan,
  // getTripInclusions,
  // getTripPrice,
} from "./tripUtils";

export const isValidToCollectionSnippet = (
  collection: Collection | Trip,
): boolean => {
  if (
    collection.collectionId &&
    collection.visibility === "PUBLIC" &&
    collection.collectionName &&
    collection.collectionMedia &&
    collection.collectionMedia.length > 0
  ) {
    return true;
  }

  return false;
};

export const createCollectionSnippet = async (
  collection: Collection | Trip,
  baseType: "collection" | "trip",
): Promise<CollectionSnippet> => {
  // collection map
  const currentListings = await getCollectionListingsMap(
    collection.collectionId,
    baseType,
  );
  const googlePlaces = await getCollectionPlacesMap(
    collection.collectionId,
    baseType,
  );

  const {
    listingNames,
    circuitNames,
    // geoLocs,
    rating,
    num_reviews,
    offbeatClassification,
    rangeClassification,
    // listingSnippetData,
  } = getDetailsForSnippet(currentListings);

  // console.log(
  //   `${
  //     isTripFromCollection(collection)
  //       ? `trip:${collection.collectionName} ${collection.numNights}`
  //       : `Not a trip:${collection.collectionName}`
  //   }`
  // );

  const geoLocs = getGeolocsForTrip(currentListings, googlePlaces);
  const { price, priceSuffix } = getSnippetPrice(collection);

  return {
    objectID: collection.collectionId,
    uid: collection.uid,
    collectionName: collection.collectionName,
    collectionKey: collection.collectionKey ? collection.collectionKey : "",
    collectionTagline: collection.collectionTagline,
    description: collection.description ? collection.description : "",
    collectionMedia: collection.collectionMedia,
    mediaAspectRatio: collection.mediaAspectRatio
      ? collection.mediaAspectRatio
      : 1,
    createdOnUnix: collection.createdOnUnix,
    isTrip: baseType === "trip" ? true : false,

    listingNames: listingNames,
    circuitNames: circuitNames,
    themeTags: Object.keys(collection.themeTags),
    groupSizeTags: Object.keys(collection.groupSizeTags),
    regionTags: Object.keys(collection.regionTags),
    amenitiesTags: Object.keys(collection.amenitiesTags),
    listingTypes: Object.keys(collection.listingTypes),
    numViews: collection.numViews ? collection.numViews : 0,
    // minPrice:
    // collection.minPrice === Number.POSITIVE_INFINITY
    // ? 0
    // : collection.minPrice,
    minPrice: price,
    priceSuffix: priceSuffix,

    // ...(collection.listingTypes && collection.listingTypes.stays
    //   ? { priceSuffix: "night" }
    //   : {}),

    // numNights
    ...(isTripFromCollection(collection) &&
    typeof collection.numNights === "number"
      ? { numNights: collection.numNights }
      : {}),

    _geoloc: geoLocs,
    rating: typeof collection.rating === "number" ? collection.rating : rating,
    numReviews:
      typeof collection.numReviews === "number"
        ? collection.numReviews
        : num_reviews,
    offbeatClassification: collection.offbeatClassification
      ? collection.offbeatClassification
      : offbeatClassification,
    ...(collection.rangeClassification
      ? { rangeClassification: collection.rangeClassification }
      : rangeClassification
      ? { rangeClassification: rangeClassification }
      : {}),

    author: collection.author,
  };
};

const getSnippetPrice = (
  collection: Collection | Trip,
): { price: number; priceSuffix: string } => {
  if (
    isTripFromCollection(collection) &&
    collection.isManaged &&
    typeof collection.userDefinedPrice === "number" &&
    collection.userDefinedPrice !== Number.POSITIVE_INFINITY
  ) {
    return { price: collection.userDefinedPrice, priceSuffix: "person" };
  } else if (
    isTripFromCollection(collection) &&
    !collection.isManaged &&
    typeof collection.tripPrice === "number" &&
    collection.tripPrice !== Number.POSITIVE_INFINITY
  ) {
    return { price: collection.tripPrice, priceSuffix: "" };
  } else if (
    isTripFromCollection(collection) &&
    !collection.isManaged &&
    typeof collection.minPrice === "number" &&
    collection.minPrice !== Number.POSITIVE_INFINITY
  ) {
    return {
      price: collection.minPrice,
      priceSuffix:
        collection.listingTypes && collection.listingTypes.stays ? "night" : "",
    };
  } else if (
    !isTripFromCollection(collection) &&
    typeof collection.minPrice === "number" &&
    collection.minPrice !== Number.POSITIVE_INFINITY
  ) {
    return {
      price: collection.minPrice,
      priceSuffix:
        collection.listingTypes && collection.listingTypes.stays ? "night" : "",
    };
  }

  return {
    price: 0,
    priceSuffix: "",
  };
};

const getGeolocsForTrip = (
  listings: { [id: string]: CollectionListingISO },
  places: { [id: string]: GooglePlaceDetail },
) => {
  const geoLocs: { lat: number; lng: number }[] = [];

  Object.values(listings).forEach((listing) => {
    if (listing.lat && listing.lng) {
      geoLocs.push({
        lat: listing.lat,
        lng: listing.lng,
      });
    }
  });

  Object.values(places).forEach((place) => {
    if (place.geometry) {
      geoLocs.push({
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      });
    }
  });

  return geoLocs;
};

export const getDetailsForSnippet_List = (
  listings: CollectionListingISO[],
  // places: GooglePlaceDetail[]
) => {
  const listingNames: string[] = [];
  const circuitNames: { [circuitName: string]: boolean } = {};
  const ratings: number[] = [];
  const numReviews: number[] = [];
  const baseRangeClassification: string[] = [];
  let offbeatClassification: boolean = false;

  listings.forEach((listing) => {
    listingNames.push(listing.listingName);
    if (listing.circuitName) {
      circuitNames[listing.circuitName] = true;
    }
    // if (listing.lat && listing.lng) {
    //   geoLocs.push({
    //     lat: listing.lat,
    //     lng: listing.lng,
    //   });
    // }

    if (
      typeof listing.rating === "number" &&
      typeof listing.num_reviews === "number"
    ) {
      ratings.push(listing.rating);
      numReviews.push(listing.num_reviews);
    }

    // offbeat classification
    if (
      typeof listing.offbeatClassification === "boolean" &&
      listing.offbeatClassification
    ) {
      offbeatClassification = listing.offbeatClassification;
    }

    // range classification
    if (listing.rangeClassification) {
      baseRangeClassification.push(listing.rangeClassification);
    }

    // listingSnippetData[listing.listingId] = {
    //   listingName: listing.listingName,
    //   listingId: listing.listingId,
    //   listingType: listing.listingType === "stays" ? "stay" : "listing",
    //   lat: listing.lat,
    //   lng: listing.lng,
    //   media: getMediaSnippet(listing),
    // };
  });

  // places.forEach((place) => {
  // if (place.name) {
  // listingNames.push(place.name);
  // }
  // if (place.geometry) {
  //   geoLocs.push({
  //     lat: place.geometry.location.lat,
  //     lng: place.geometry.location.lng,
  //   });
  // }

  // if (
  // typeof place.rating === "number" &&
  // typeof place.user_ratings_total === "number"
  // ) {
  // ratings.push(place.rating);
  // numReviews.push(place.user_ratings_total);
  // }
  // });

  // if (place.name && place.geometry) {
  //   listingSnippetData[place.place_id] = {
  //     listingName: place.name,
  //     listingId: place.place_id,
  //     listingType: "googlePlace",
  //     lat: place.geometry.location.lat,
  //     lng: place.geometry.location.lng,
  //     media: getMediaSnippetForPlace(place),
  //   };
  // }

  const weightedRating = weightedMean(ratings, numReviews);
  const rangeClassification = getRangeClassification(baseRangeClassification);

  return {
    listingNames: listingNames,
    circuitNames: Object.keys(circuitNames),
    // geoLocs: geoLocs,
    rating: weightedRating ? weightedRating : -1,
    num_reviews: sumOfArray(numReviews),
    offbeatClassification: offbeatClassification,
    rangeClassification: rangeClassification,
    // listingSnippetData: listingSnippetData,
  };
};

export const getDetailsForSnippet = (
  listings: { [id: string]: CollectionListingISO },
  // places: { [id: string]: GooglePlaceDetail }
) => {
  return getDetailsForSnippet_List(
    Object.values(listings),
    // Object.values(places)
  );

  // const listingNames: string[] = [];
  // const circuitNames: { [circuitName: string]: boolean } = {};
  // const ratings: number[] = [];
  // const numReviews: number[] = [];
  // const baseRangeClassification: string[] = [];
  // let offbeatClassification: boolean = false;
  // //   const listingSnippetData: { [id: string]: CollectionListingSnippet } = {};

  // Object.values(listings).forEach((listing) => {
  //   listingNames.push(listing.listingName);
  //   if (listing.circuitName) {
  //     circuitNames[listing.circuitName] = true;
  //   }
  //   // if (listing.lat && listing.lng) {
  //   //   geoLocs.push({
  //   //     lat: listing.lat,
  //   //     lng: listing.lng,
  //   //   });
  //   // }

  //   if (
  //     typeof listing.rating === "number" &&
  //     typeof listing.num_reviews === "number"
  //   ) {
  //     ratings.push(listing.rating);
  //     numReviews.push(listing.num_reviews);
  //   }

  //   // offbeat classification
  //   if (
  //     typeof listing.offbeatClassification === "boolean" &&
  //     listing.offbeatClassification
  //   ) {
  //     offbeatClassification = listing.offbeatClassification;
  //   }

  //   // range classification
  //   if (listing.rangeClassification) {
  //     baseRangeClassification.push(listing.rangeClassification);
  //   }

  //   // listingSnippetData[listing.listingId] = {
  //   //   listingName: listing.listingName,
  //   //   listingId: listing.listingId,
  //   //   listingType: listing.listingType === "stays" ? "stay" : "listing",
  //   //   lat: listing.lat,
  //   //   lng: listing.lng,
  //   //   media: getMediaSnippet(listing),
  //   // };
  // });

  // Object.values(places).forEach((place) => {
  //   if (place.name) {
  //     listingNames.push(place.name);
  //   }
  //   // if (place.geometry) {
  //   //   geoLocs.push({
  //   //     lat: place.geometry.location.lat,
  //   //     lng: place.geometry.location.lng,
  //   //   });
  //   // }

  //   if (
  //     typeof place.rating === "number" &&
  //     typeof place.user_ratings_total === "number"
  //   ) {
  //     ratings.push(place.rating);
  //     numReviews.push(place.user_ratings_total);
  //   }

  //   // if (place.name && place.geometry) {
  //   //   listingSnippetData[place.place_id] = {
  //   //     listingName: place.name,
  //   //     listingId: place.place_id,
  //   //     listingType: "googlePlace",
  //   //     lat: place.geometry.location.lat,
  //   //     lng: place.geometry.location.lng,
  //   //     media: getMediaSnippetForPlace(place),
  //   //   };
  //   // }
  // });

  // const weightedRating = weightedMean(ratings, numReviews);
  // const rangeClassification = getRangeClassification(baseRangeClassification);

  // return {
  //   listingNames: listingNames,
  //   circuitNames: Object.keys(circuitNames),
  //   // geoLocs: geoLocs,
  //   rating: weightedRating,
  //   num_reviews: sumOfArray(numReviews),
  //   offbeatClassification: offbeatClassification,
  //   rangeClassification: rangeClassification,
  //   // listingSnippetData: listingSnippetData,
  // };
};

/**
const getMediaSnippet = (listing: CollectionListingISO): MediaSnippet => {
  if (listing.coverImage && listing.coverImage.photo_reference) {
    return {
      photo_reference: listing.coverImage.photo_reference,
      type: "googlePhoto",
    };
  } else if (listing.coverImage && listing.coverImage.url) {
    return {
      url: listing.coverImage.url,
      type: "photo",
    };
  } else if (listing.images && listing.images.length > 0) {
    return {
      url: listing.images[0].url ? listing.images[0].url : "",
      type: "photo",
    };
  } else {
    return { url: "", type: "photo" };
  }
};

const getMediaSnippetForPlace = (place: GooglePlaceDetail): MediaSnippet => {
  if (place.photos && place.photos.length > 0) {
    return {
      type: "googlePhoto",
      photo_reference: place.photos[0].photo_reference,
    };
  } else {
    return { url: "", type: "photo" };
  }
};
 */

const weightedMean = (arrValues: number[], arrWeights: number[]) => {
  const result = arrValues
    .map(function (value, i) {
      const weight = arrWeights[i];
      const sum = value * weight;

      return [sum, weight];
    })
    .reduce(
      function (p, c) {
        return [p[0] + c[0], p[1] + c[1]];
      },
      [0, 0],
    );

  return result[0] / result[1];
};

const sumOfArray = (array: number[]) => {
  let sum: number = 0;
  for (const elem of array) {
    sum += elem;
  }

  return sum;
};

const getRangeClassification = (
  ranges: string[],
): "basic" | "premium" | "luxury" | "" => {
  if (ranges.includes("luxury")) {
    return "luxury";
  }

  if (ranges.includes("premium")) {
    return "premium";
  }

  if (ranges.includes("basic")) {
    return "basic";
  }

  return "";
};

export const getTripNights = (trip: Trip) => {
  let numNights: number = -1;
  trip.collectionMedia.forEach((media) => {
    // day label
    if (media.dayLabel) {
      const mediaNights = getLocationNights(media.dayLabel);
      if (mediaNights > numNights) {
        numNights = mediaNights;
      }
    }
  });

  return numNights;
};

export const getLocationNights = (dayLabel: string) => {
  const days = getDayRange(dayLabel);
  let numNights: number = -1;
  try {
    for (const day of days) {
      if (day > numNights) {
        numNights = day;
      }
    }
  } catch (error) {
    console.log("error", error);
  }

  return numNights;
};

const getDayRange = (dayLabel: string) => {
  return dayLabel.split("-").map((item) => Number.parseInt(item));
};

const createListingMap = (listings: CollectionListingISO[]) => {
  const listingMap: { [listingId: string]: CollectionListingISO } = {};
  return listings.reduce((acc, item) => {
    acc[item.listingId] = item;
    return acc;
  }, listingMap);
};

export const getUpdatedCollection = (
  prevCollection: Collection,
  listings: CollectionListingISO[],
  placesToAdd: string[],
  placesToRemove: string[],
  placesToSwitch: { [placeId: string]: CollectionListingISO },
  serverTrigger?: boolean,
): Collection => {
  // listingmap
  const listingMap = createListingMap(listings);

  // price range for all listings ()
  const { minPrice, maxPrice } = getNewPriceRangeForListings(listings);

  // trip additional information
  const {
    circuitNames,
    rating,
    num_reviews,
    offbeatClassification,
    rangeClassification,
  } = getDetailsForSnippet_List(listings);

  // listing types
  const listingTypes = getAllListingTypes(listings);
  const newCollectionMedia = formatCollectionMedia(
    prevCollection.collectionMedia,
    listingMap,
    placesToRemove,
    placesToSwitch,
  );

  const collectionWithoutTrip: Collection = {
    ...prevCollection,
    collectionMedia: newCollectionMedia,
    listingsInCollection: getListingsInCollection(listings),
    themeTags: getAggregatedThemeTags(listings),
    groupSizeTags: getAggregatedGroupSizeTags(listings),
    amenitiesTags: getAggregatedAmenitiesTags(listings),
    regionTags: getAggregatedRegionTags(listings),
    listingsPresent: getAllListingIds(listings),
    googlePlaces: getUpdatedPlaceIds(
      prevCollection.googlePlaces ? prevCollection.googlePlaces : {},
      placesToAdd,
      placesToRemove,
    ),
    listingTypes: listingTypes,
    minPrice: minPrice,
    maxPrice: maxPrice,

    rating: rating,
    numReviews: num_reviews,
    ...(rangeClassification
      ? { rangeClassification: rangeClassification }
      : {}),
    offbeatClassification: offbeatClassification,
    circuitNames: circuitNames,

    // to prevent infinte loop
    ...(serverTrigger ? {} : { updateListings: false }),
  };

  return collectionWithoutTrip;

  // return

  // const tripInclusion = getTripInclusions(collectionWithoutTrip);

  // console.log("tripInclusion accomodation", tripInclusion.accomodation);

  // return {
  // ...collectionWithoutTrip,
  // inclusions: tripInclusion,
  // };
};

export const getUpdatedTrip = (
  trip: Trip,
  listings: CollectionListingISO[],
  placesToAdd: string[],
  placesToDelete: string[],
  placesToSwitch: { [placeId: string]: CollectionListingISO },
  serverTrigger?: boolean,
): Trip => {
  // listingmap
  const listingMap = createListingMap(listings);

  // price range for all listings ()
  const { minPrice, maxPrice } = getNewPriceRangeForListings(listings);

  // nights
  const nights = getTripNights(trip);

  // trip additional information
  const {
    circuitNames,
    rating,
    num_reviews,
    offbeatClassification,
    rangeClassification,
  } = getDetailsForSnippet_List(listings);

  // listing types
  const listingTypes = getAllListingTypes(listings);
  const newCollectionMedia = formatCollectionMedia(
    trip.collectionMedia,
    listingMap,
    placesToDelete,
    placesToSwitch,
  );
  // booking plan
  const bookingPlan = getBookingPlan(newCollectionMedia, listingMap);

  // trip price
  const tripPrice = getTripPrice(newCollectionMedia, bookingPlan);

  const collectionWithoutTrip: Trip = {
    ...trip,
    collectionMedia: newCollectionMedia,
    themeTags: getAggregatedThemeTags(listings),
    groupSizeTags: getAggregatedGroupSizeTags(listings),
    amenitiesTags: getAggregatedAmenitiesTags(listings),
    regionTags: getAggregatedRegionTags(listings),
    listingsPresent: getAllListingIds(listings), // reconcile
    googlePlaces: getUpdatedPlaceIds(
      trip.googlePlaces ? trip.googlePlaces : {},
      placesToAdd,
      placesToDelete,
    ),
    listingTypes: listingTypes,
    minPrice: minPrice,
    maxPrice: maxPrice,

    rating: rating,
    numReviews: num_reviews,
    ...(rangeClassification
      ? { rangeClassification: rangeClassification }
      : { rangeClassification: "" }),
    offbeatClassification: offbeatClassification,
    circuitNames: circuitNames,
    numNights: nights,
    ...(listingTypes["stays"] ? { priceSuffix: "night" } : { priceSuffix: "" }),
    bookingDetails: bookingPlan,
    tripPrice: tripPrice,

    // to prevent infinte loop
    ...(serverTrigger ? {} : { updateListings: false }),
  };

  return {
    ...collectionWithoutTrip,
    ...(!trip.isManaged
      ? { inclusions: getTripInclusions(collectionWithoutTrip) }
      : {}),
  };
};
