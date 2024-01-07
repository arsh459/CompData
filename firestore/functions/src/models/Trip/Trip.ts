import {
  AuthorInterface,
  Collection,
  mediaAspectRatios,
  MediaInterface,
} from "../Collection/Collection";
import { flagObj } from "../ListingDetail/interface";

export interface Trip {
  collectionId: string;
  collectionKey?: string;
  uid: string;
  collectionName: string;
  collectionTagline: string;
  description: string;
  collectionMedia: MediaInterface[];
  mediaAspectRatio: mediaAspectRatios;
  createdOnUnix: number;
  listingsPresent: { [listingId: string]: boolean };
  googlePlaces: { [placeId: string]: boolean };
  numLikes: number;
  numComments: number;
  numViews?: number;

  // processing media
  processingMedia: "PENDING" | "PROCESSING" | "DONE";
  processingPublicIds: string[];

  deeplinkURI: string;

  // server side
  updateListings: boolean;
  groupSizeTags: flagObj;
  themeTags: flagObj;
  regionTags: flagObj;
  amenitiesTags: flagObj;
  listingTypes: { [listingType: string]: boolean };
  minPrice: number;
  maxPrice: number;
  author: AuthorInterface;
  visibility: "PRIVATE" | "PUBLIC";
  rating: number;
  numReviews: number;
  rangeClassification?: "basic" | "premium" | "luxury" | "";
  offbeatClassification: boolean;
  circuitNames: string[];

  // trip related
  isTrip: boolean;
  minPax?: number;
  numNights?: number;
  inclusions?: TripInclusion;
  userTripInclusions?: string;
  userTripExclusions?: string;
  userDefinedPrice?: number;
  isManaged?: boolean;
  priceSuffix?: string;
  tripPrice?: number;
  bookingDetails?: {
    [listingId: string]: { [variantId: string]: TripBookingInterface };
  }; // default to cheapest variant
}

export interface TripInclusion {
  accomodation?: boolean;
  meals?: "PARTIAL" | "ALL" | "NONE";
  activities?: boolean;
  transportation?: "PARTIAL" | "ALL" | "NONE";
  equipment?: boolean;
}

export interface TripBookingInterface {
  price: number;
  pax: number;
  tat: number;
  variantId: string;
  name: string;
}

export function isTripFromCollection(
  input: Collection | Trip | undefined,
): input is Trip {
  return (input as Trip).isTrip === true;
}
