import { flagObj, selectedLob } from "../ListingDetail/interface";
import { ListingInterface } from "../ListingObj/Listing";

export type mediaAspectRatios = 1 | 1.77 | 0.8;

export interface Collection {
  collectionId: string;
  uid: string;
  collectionName: string;
  collectionKey?: string;
  collectionTagline: string;
  description?: string;
  collectionMedia: MediaInterface[];
  mediaAspectRatio?: mediaAspectRatios;
  uploadedPhotos?: MediaInterface[];
  uploadedVideos?: MediaInterface[];
  collectionType: "trip" | "collection";
  numLikes: number;
  numComments: number;
  numViews?: number;
  createdOnUnix: number;
  deeplinkURI: string;
  saved: boolean; // dep
  featured?: boolean;
  listingsPresent?: { [listingId: string]: boolean };
  googlePlaces?: { [placeId: string]: boolean };

  // processing media
  processingMedia?: "PENDING" | "PROCESSING" | "DONE";
  processingPublicIds?: string[];

  // server side
  updateListings?: boolean;
  groupSizeTags: flagObj;
  themeTags: flagObj;
  regionTags: flagObj;
  amenitiesTags: flagObj;
  listingTypes: { [listingType: string]: boolean };
  minPrice: number;
  maxPrice: number;
  author: AuthorInterface;
  visibility?: "PRIVATE" | "PUBLIC";
  rating?: number;
  numReviews?: number;
  rangeClassification?: "basic" | "premium" | "luxury" | "";
  offbeatClassification?: boolean;
  circuitNames?: string[];

  listingsInCollection?: ListingCollectionSnippet[];

  // // trip related
  // numNights?: number;
  // inclusions?: TripInclusion;
  // priceSuffix?: string;
  // tripPrice?: number;
  // bookingDetails?: {
  //   [listingId: string]: { [variantId: string]: TripBookingInterface };
  // }; // default to cheapest variant
}

// export interface TripBookingInterface {
//   price: number;
//   pax: number;
//   tat: number;
//   variantId: string;
//   name: string;
// }

export interface ListingCollectionSnippet {
  listingId: string;
  listingType: selectedLob;
  variantId?: string;
  variantOptionId?: string;
}

export interface AuthorInterface {
  name: string;
  imageURI: string;
  allFollowers: number;
  tagline: string;
  bio: string;
}

// export interface TripInclusion {
//   accomodation?: boolean;
//   meals?: "PARTIAL" | "ALL" | "NONE";
//   activities?: boolean;
//   transportation?: "PARTIAL" | "ALL" | "NONE";
//   equipment?: boolean;
// }

export interface MediaInterface {
  url: string;
  type:
    | "video"
    | "photo"
    | "googlePhoto"
    | "photoLocalURI"
    | "videoLocalURI"
    | "cloud_photo"
    | "cloud_video";
  transformations?: string[];
  locations?: LocationInterface[];
  dayLabel?: string;
  hidden?: boolean; // to hide from timeline

  // timeline elements
  timelineLabel?: string;
  timelineDescription?: string;

  thumbnail?: string;

  // cloud_photo | cloud_video
  cloudinaryUploadParams?: CloudinaryUploadParams;
}

export interface MediaSnippet {
  url?: string;
  type:
    | "video"
    | "photo"
    | "googlePhoto"
    | "photoLocalURI"
    | "videoLocalURI"
    | "cloud_photo"
    | "cloud_video";
  cloudinaryUploadParams?: CloudinaryUploadParams;
  photo_reference?: string;
}

export interface LocationInterface {
  lat: number;
  lng: number;
  key: string; // listingId for existing listing, placeId for GooglePlace
  listingId: string;
  listingName: string;
  googlePlaceId: string;
  locationType?: locationType;
  circuitName?: string;

  // booking related
  variantId?: string;
  qty?: number;
}

export type locationType = "googlePlace" | "listing" | "stays";

export interface CloudinaryUploadParams {
  asset_id: string;
  public_id: string;
  format: string;
  resource_type: string;
  secure_url: string;
}

export interface CollectionListing extends ListingInterface {
  listingHeading: string;
  listingTagline: string;
  listingDescription: string;
  index: number;
  uid: string;
  day?: number;
}

export interface CollectionListingISO extends ListingInterface {
  listingHeading: string;
  listingTagline: string;
  listingDescription: string;
  index: number;
  uid: string;
  day?: number;
}

export interface Comment {
  author: string;
  imageURI: string;
  allFollowers: number;
  authorTagline: string;
  uid: string;
  comment: string;
  images: string[];
  videos: string[];
  createdOn: number;
}

export interface Like {
  author: string;
  uid: string;
  imageURI: string;
  likedOn: number;
}

export interface View {
  viewerId: string;
  viewerName?: string;
  viewerImage?: string;
  visitedOn: number;
  status: "REQUEST" | "REJECTED" | "ACCEPTED" | "CREDITED";

  creatorId: string;
  isTrip?: boolean;
}
