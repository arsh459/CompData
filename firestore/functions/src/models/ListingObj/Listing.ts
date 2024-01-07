import * as t from "io-ts";
import { ImageObj, ImageInterface } from "./ImageObj";
import { PricePaxObj, PricePaxInterface } from "./PricePaxObj";
import {
  OperatingHoursObj,
  OperatingHoursInterface,
} from "./OperatingHoursObj";
import { flagObj } from "../ListingDetail/interface";

export const ListingObj = t.type({
  listingId: t.string,
  listingName: t.string,
  lat: t.number,
  lng: t.number,
  num_reviews: t.number,
  rating: t.number,
  listingType: t.string,
  dailyVisitors: t.number,
  coverImage: ImageObj,
  images: t.array(ImageObj),
  tagline: t.string,
  shortlistedBy: t.number,
  totalBookings: t.number,
  maxGroupSize: t.number,
  cutoffTime: t.number,
  bookCompleteSlot: t.boolean,
  blogMentions: t.number,
  hyperLocation: t.string,
  circuitId: t.string,
  pricePaxVariants: t.array(PricePaxObj),
  operatingHours: t.array(OperatingHoursObj),
});

export type ListingObjType = t.Type<typeof ListingObj>;

export interface ListingInterface {
  listingId: string;
  listingName: string;
  lat: number;
  lng: number;
  num_reviews: number;
  rating: number;
  listingType: string;
  dailyVisitors: number;
  coverImage: ImageInterface;
  images: ImageInterface[];
  tagline: string;
  shortlistedBy: number;
  totalBookings: number;
  maxGroupSize: number;
  cutoffTime: number;
  bookCompleteSlot: boolean;
  blogMentions: number;
  hyperLocation: string;
  circuitId: string;
  pricePaxVariants: PricePaxInterface[];
  operatingHours: OperatingHoursInterface[];

  subcategory?: string;
  promises?: PromiseInterface;
  category?: string;
  mustBookComplete?: boolean;
  circuitName?: string;

  groupSizeTags?: flagObj;
  themeTags?: flagObj;
  amenitiesTags?: flagObj;
  regionTags?: flagObj;

  // classification
  rangeClassification?: "basic" | "premium" | "luxury";
  offbeatClassification?: boolean;

  listingKey?: string;
  variantId?: string;
  variantOptionId?: string;
}

export interface PromiseInterface {
  arogyaSetu: boolean;
  flexibleDates: boolean;
  lastMinuteCancel: boolean;
  masks: boolean;
  mobileTicket: boolean;
  private: boolean;
  regularSanitization: boolean;
  sixFeetGap: boolean;
  twentyFourHourCancel: boolean;
  twoHourConfirmation: boolean;
}
