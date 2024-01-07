import { VariantInterface } from "../ListingObj/PricePaxObj";
import { OperatingHoursInterface } from "../ListingObj/OperatingHoursObj";
import { ImageInterface } from "../ListingObj/ImageObj";
import { PromiseInterface } from "../ListingObj/Listing";

export interface ListingDetailInterface {
  listingId: string;
  listingName: string;
  listingType: selectedLob;
  listingKey?: string;
  rangeClassification?: "basic" | "premium" | "luxury";
  offbeatClassification?: boolean;
  lat: number;
  lng: number;
  formattedAddress: string;
  hyperLocation: string;
  num_reviews: number;
  rating: number;
  dailyVisitors: number;
  tagline: string;
  shortlistedBy: number;
  totalBookings: number;
  maxGroupSize: number;
  cutoffTime: number;
  bookCompleteSlot: boolean;
  blogMentions: number;
  circuitId: string;
  variants: VariantInterface[];
  operatingHours: OperatingHoursInterface[];

  subcategory?: string;
  tempClosed?: {
    status: boolean;
    reason: string;
  };

  usp: string;
  coverImages: string[];
  images: string[];
  googlePhotos: ImageInterface[];

  promises?: PromiseInterface;
  category?: string;
  mustBookComplete?: boolean;
  circuitName?: string;
  deeplinkURI?: string;

  groupSizeTags?: flagObj;
  themeTags?: flagObj;
  amenitiesTags?: flagObj;
  regionTags?: flagObj;

  // goibiboCode
  ihcG?: string;

  // placeId
  placeId?: string;
  unavailableDates?: string[];

  algoliaUpdate?: number;
}

export type selectedLob =
  | "activities"
  | "stays"
  | "online"
  | "cabs"
  | "attractions"
  | "food"
  | "events"
  | "areas"
  | "shop"
  | "nightlife";

export interface flagObj {
  [flag: string]: boolean;
}
