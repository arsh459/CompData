import * as moment from "moment";
import { ListingDetailInterface } from "../ListingDetail/interface";
import { VariantInterface } from "../ListingObj/PricePaxObj";
import { VariantOption, VariantV2 } from "../ListingObj/VariantV2";
import { kpiDict } from "./ListingBrief";

export const getKPIsForBrief = (
  listingDetail: ListingDetailInterface,
  selectedVariant?: VariantV2,
  variantOption?: VariantOption,
): kpiDict[] => {
  if (listingDetail.listingType === "stays") {
    return getKPIsForStays(listingDetail, selectedVariant, variantOption);
  } else {
    return getKPIsForListings(listingDetail, selectedVariant, variantOption);
  }
};

const getAllPaxInStay = (variants: VariantInterface[]): number => {
  return variants.reduce((acc, item) => acc + item.pax, 0);
};

const getAllRoomsInStay = (variants: VariantInterface[]): number => {
  return variants.reduce(
    (acc, item) => (item.numberOfRooms ? acc + item.numberOfRooms : acc),
    0,
  );
};

export const getKPIsForStaysV2 = (
  variant: VariantV2,
  option: VariantOption,
): kpiDict[] => {
  const kpis: kpiDict[] = [];

  // if pax is present add accomodates
  if (option.pax) {
    kpis.push({
      value: option.pax,
      suffix: "adults",
      kpi: "Accomodates",
    });
  }

  if (
    variant &&
    typeof variant.numberOfRooms === "number" &&
    variant.numberOfRooms > 0
  ) {
    kpis.push({
      value: variant.numberOfRooms,
      suffix: "",
      kpi: "Rooms",
    });
  }

  if (variant && typeof variant.sqft === "number" && variant.sqft > 0) {
    kpis.push({
      value: variant.sqft,
      suffix: "sqft",
      kpi: "Area",
    });
  }

  return kpis;
};

const getKPIsForStays = (
  listingDetail: ListingDetailInterface,
  selectedVariant?: VariantV2,
  variantOption?: VariantOption,
): kpiDict[] => {
  const kpis: kpiDict[] = [];

  // if pax is present add accomodates
  if (variantOption && variantOption.pax) {
    kpis.push({
      value: listingDetail.mustBookComplete
        ? getAllPaxInStay(listingDetail.variants)
        : variantOption.pax,
      suffix: "adults",
      kpi: "Accomodates",
    });
  }

  if (
    selectedVariant &&
    typeof selectedVariant.numberOfRooms === "number" &&
    selectedVariant.numberOfRooms > 0
  ) {
    kpis.push({
      value: listingDetail.mustBookComplete
        ? getAllRoomsInStay(listingDetail.variants)
        : selectedVariant.numberOfRooms,
      suffix: "",
      kpi: "Rooms",
    });
  }

  if (
    selectedVariant &&
    typeof selectedVariant.sqft === "number" &&
    selectedVariant.sqft > 0
  ) {
    kpis.push({
      value: selectedVariant.sqft,
      suffix: "sqft",
      kpi: "Area",
    });
  }

  return kpis;
};

export const getKPIsForListings = (
  listingDetail: ListingDetailInterface,
  selectedVariant?: VariantV2,
  variantOption?: VariantOption,
): kpiDict[] => {
  const kpis: kpiDict[] = [];
  if (
    (listingDetail.listingType === "activities" ||
      listingDetail.listingType === "cabs") &&
    typeof listingDetail.totalBookings === "number" &&
    listingDetail.totalBookings > 0
  ) {
    kpis.push({
      value: listingDetail.totalBookings,
      suffix: "",
      kpi: "Booked",
    });
  } else if (
    (listingDetail.listingType === "events" ||
      listingDetail.listingType === "online") &&
    typeof listingDetail.maxGroupSize === "number" &&
    listingDetail.maxGroupSize > 0
  ) {
    kpis.push({
      value: listingDetail.maxGroupSize,
      suffix: "people",
      kpi: "Exp. Attendees",
    });
  } else if (
    (listingDetail.listingType === "events" ||
      listingDetail.listingType === "online") &&
    typeof listingDetail.dailyVisitors === "number" &&
    listingDetail.dailyVisitors > 0
  ) {
    kpis.push({
      value: listingDetail.dailyVisitors,
      suffix: "people",
      kpi: "Daily Visitors",
    });
  } else if (
    variantOption &&
    typeof variantOption.tat === "number" &&
    variantOption.tat > 0
  ) {
    kpis.push({
      value: moment.duration(variantOption.tat, "minutes").humanize(),
      suffix: "",
      kpi: "Duration",
    });
  }

  return kpis;
};
