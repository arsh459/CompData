import {
  AuthorInterface,
  mediaAspectRatios,
  MediaInterface,
  // MediaSnippet,
} from "./Collection";

export interface CollectionSnippet {
  objectID: string;
  uid: string;
  collectionName: string;
  collectionTagline: string;
  description: string;
  collectionMedia: MediaInterface[];
  mediaAspectRatio: mediaAspectRatios;
  createdOnUnix: number;
  collectionKey: string;

  // listings && tags
  listingNames: string[];
  circuitNames: string[];
  themeTags: string[];
  groupSizeTags: string[];
  regionTags: string[];
  amenitiesTags: string[];
  listingTypes: string[];

  // location
  _geoloc: { lat: number; lng: number }[];
  minPrice: number;
  priceSuffix?: string;
  numNights?: number;

  // rating
  rating?: number;
  numReviews?: number;
  numViews?: number;
  rangeClassification?: "basic" | "premium" | "luxury";
  offbeatClassification?: boolean;

  isTrip: boolean;

  // display only
  //   listingData: { [listingId: string]: CollectionListingSnippet };

  // author
  author: AuthorInterface;
}

// export interface CollectionListingSnippet {
//   listingName: string;
//   listingId: string;
//   listingType: "stay" | "listing" | "googlePlace";
//   media: MediaSnippet;
//   lat: number;
//   lng: number;
// }
