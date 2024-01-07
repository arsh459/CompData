// import {ListingInterface} from '../../ListingSnippet/ListingSnippet';
import { GooglePlacesResult } from "../../GooglePlaceResult/GooglePlaceResult";
import { flagObj, selectedLob } from "../../ListingDetail/interface";
import { findCheapestVariant_pricePax } from "../../ListingDetail/Methods";
import { ListingInterface } from "../../ListingObj/Listing";
import { PricePaxInterface } from "../../ListingObj/PricePaxObj";
import { CollectionListingISO, ListingCollectionSnippet } from "../Collection";

export const getNewPriceRange = (
  variants: PricePaxInterface[],
  minPrice: number,
  maxPrice: number,
) => {
  const cheapestVariant = findCheapestVariant_pricePax(variants);
  let newMin = minPrice;
  if (
    cheapestVariant &&
    cheapestVariant.price &&
    cheapestVariant.price < minPrice
  ) {
    newMin = cheapestVariant.price;
  }

  let newMax = maxPrice;
  if (
    cheapestVariant &&
    cheapestVariant.price &&
    cheapestVariant.price > maxPrice
  ) {
    newMax = cheapestVariant.price;
  }

  return {
    minPrice: newMin,
    maxPrice: newMax,
  };
};

export const getNewPriceRangeForListings = (
  listings: (CollectionListingISO | ListingInterface)[],
  // oldMinPrice: number,
  // oldMaxPrice: number,
) => {
  let newMinPrice = Number.POSITIVE_INFINITY;
  let newMaxPrice = Number.NEGATIVE_INFINITY;
  listings.map((listing) => {
    const newPriceRange = getNewPriceRange(
      listing.pricePaxVariants,
      newMinPrice,
      newMaxPrice,
    );

    if (newPriceRange.minPrice < newMinPrice) {
      newMinPrice = newPriceRange.minPrice;
    }

    if (newPriceRange.maxPrice > newMaxPrice) {
      newMaxPrice = newPriceRange.maxPrice;
    }
  });

  return {
    minPrice: newMinPrice,
    maxPrice: newMaxPrice,
  };
};

export const getAggregatedThemeTags = (
  listings: (CollectionListingISO | ListingInterface)[],
): flagObj => {
  const response: flagObj = {};
  return listings.reduce((acc, item) => {
    const newAcc = {
      ...acc,
      ...item.themeTags,
    };
    return newAcc;
  }, response);
};

export const getListingsInCollection = (
  listings: (CollectionListingISO | ListingInterface)[],
): ListingCollectionSnippet[] => {
  const response: ListingCollectionSnippet[] = [];
  return listings.reduce((acc, item) => {
    acc.push({
      listingId: item.listingId,
      listingType: item.listingType as selectedLob,
    });
    return acc;
  }, response);
};

export const getAggregatedGroupSizeTags = (
  listings: (CollectionListingISO | ListingInterface)[],
): flagObj => {
  const response: flagObj = {};
  return listings.reduce((acc, item) => {
    const newAcc = {
      ...acc,
      ...item.groupSizeTags,
    };
    return newAcc;
  }, response);
};

export const getAggregatedAmenitiesTags = (
  listings: (CollectionListingISO | ListingInterface)[],
): flagObj => {
  const response: flagObj = {};
  return listings.reduce((acc, item) => {
    const newAcc = {
      ...acc,
      ...item.amenitiesTags,
    };
    return newAcc;
  }, response);
};

export const getAggregatedRegionTags = (
  listings: (CollectionListingISO | ListingInterface)[],
): flagObj => {
  const response: flagObj = {};
  return listings.reduce((acc, item) => {
    const newAcc = {
      ...acc,
      ...item.regionTags,
    };
    return newAcc;
  }, response);
};

export const getAllListingTypes = (
  listings: (CollectionListingISO | ListingInterface)[],
) => {
  const response: flagObj = {};
  return listings.reduce((acc, item) => {
    const newAcc = {
      ...acc,
      [item.listingType]: true,
    };
    return newAcc;
  }, response);
};

export const getAllListingIds = (
  listings: (CollectionListingISO | ListingInterface)[],
) => {
  const response: flagObj = {};
  return listings.reduce((acc, item) => {
    const newAcc = {
      ...acc,
      [item.listingId]: true,
    };
    return newAcc;
  }, response);
};

export const getUpdatedPlaceIds = (
  previousPlaces: { [placeId: string]: boolean },
  placesToAdd: string[],
  placesToRemove: string[],
) => {
  const newPlaces: flagObj = {};
  const allPlaces = {
    ...previousPlaces,
    ...placesToAdd.reduce((acc, item) => ({ [item]: true }), newPlaces),
  };

  for (const rmPlace of placesToRemove) {
    delete allPlaces[rmPlace];
  }

  return allPlaces;
};

export const getAllPlaceIds = (placesToAdd: GooglePlacesResult[]) => {
  const response: flagObj = {};
  return placesToAdd.reduce((acc, item) => {
    const newAcc = {
      ...acc,
      [item.place_id]: true,
    };
    return newAcc;
  }, response);
};
