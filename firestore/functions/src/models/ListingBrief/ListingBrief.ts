import { selectedLob } from "../ListingDetail/interface";

export type ObjectType =
  | "circuit"
  | "collection"
  | "trip"
  | "listing"
  | "stays"
  | "profile";

export interface ListingBrief {
  listingId: string;
  objectID: string;
  title: string;
  tagline: string;
  ObjectType: ObjectType;
  _geoloc: {
    lat: number;
    lng: number;
  };
  circuitName: string;
  images: string[];
  listingKey?: string;

  variantId?: string;
  variantOptionId?: string;

  // optional
  listingType?: selectedLob;
  rangeClassification?: "basic" | "premium" | "luxury";
  offbeatClassification?: boolean;
  num_reviews?: number;
  rating?: number;
  subcategory?: string;
  category?: string;
  groupSizeTags?: string[];
  themeTags?: string[];
  amenitiesTags?: string[];
  regionTags?: string[];
  kpis?: kpiDict[];
  perPersonPrice?: number;
  hyperLocation?: string;
  minPrice?: number;
  avgPrice?: number;
  defaultPrice?: number;
  priceSuffix?: string;

  boosted?: boolean;

  // inventory pricing
  pricing?: { [date: string]: number }; // pricing object
  unavailableDates?: string[];

  recommendedPax?: string[];
  maxPax?: number;
  _tags?: string[];
  score?: number;
}

export interface kpiDict {
  value: string | number;
  suffix: string;
  kpi: string;
}
