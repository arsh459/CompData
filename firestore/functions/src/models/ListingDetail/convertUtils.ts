import { ListingInterface } from "../ListingObj/Listing";
import { PricePaxInterface, VariantInterface } from "../ListingObj/PricePaxObj";
import { ListingDetailInterface } from "./interface";
import { findCheapestVariant } from "./Methods";

export const getListingSnippetFromDetail = (
  listingDetail: ListingDetailInterface,
): ListingInterface => {
  const cheapestVariant = findCheapestVariant(listingDetail.variants);

  return {
    listingId: listingDetail.listingId,
    listingKey: listingDetail.listingKey ? listingDetail.listingKey : "",
    variantId: cheapestVariant ? cheapestVariant.variantId : "",
    variantOptionId:
      cheapestVariant && cheapestVariant.optionId
        ? cheapestVariant.optionId
        : "",
    listingName: listingDetail.listingName,
    lat: listingDetail.lat,
    lng: listingDetail.lng,
    listingType: listingDetail.listingType,
    ...(listingDetail.subcategory
      ? { subcategory: listingDetail.subcategory }
      : {}),
    coverImage:
      listingDetail.coverImages.length > 0
        ? { url: listingDetail.coverImages[0], source: "db" }
        : { source: "db", url: "" },
    ...(listingDetail.images
      ? { images: getImageObjs(listingDetail.images) }
      : { images: [] }),
    tagline: listingDetail.tagline,
    rating:
      listingDetail.rating && typeof listingDetail.rating === "number"
        ? listingDetail.rating
        : 0,
    num_reviews:
      listingDetail.num_reviews && typeof listingDetail.num_reviews === "number"
        ? listingDetail.num_reviews
        : 0,
    dailyVisitors:
      listingDetail.dailyVisitors &&
      typeof listingDetail.dailyVisitors === "number"
        ? listingDetail.dailyVisitors
        : 0,
    shortlistedBy:
      listingDetail.shortlistedBy &&
      typeof listingDetail.shortlistedBy === "number"
        ? listingDetail.shortlistedBy
        : 0,
    totalBookings:
      listingDetail.totalBookings &&
      typeof listingDetail.totalBookings === "number"
        ? listingDetail.totalBookings
        : 0,
    maxGroupSize:
      listingDetail.maxGroupSize &&
      typeof listingDetail.maxGroupSize === "number"
        ? listingDetail.maxGroupSize
        : 0,
    cutoffTime:
      listingDetail.cutoffTime && typeof listingDetail.cutoffTime === "number"
        ? listingDetail.cutoffTime
        : 0,
    blogMentions:
      listingDetail.blogMentions &&
      typeof listingDetail.blogMentions === "number"
        ? listingDetail.blogMentions
        : 0,
    bookCompleteSlot: listingDetail.bookCompleteSlot ? true : false,
    hyperLocation: listingDetail.hyperLocation
      ? listingDetail.hyperLocation
      : "",
    circuitId: listingDetail.circuitId,
    pricePaxVariants: getPricePaxVarsFromVariant(listingDetail.variants),
    operatingHours: listingDetail.operatingHours,
    ...(listingDetail.promises ? { promises: listingDetail.promises } : {}),
    mustBookComplete: listingDetail.mustBookComplete
      ? listingDetail.mustBookComplete
      : false,
    ...(listingDetail.circuitName
      ? { circuitName: listingDetail.circuitName }
      : {}),
    ...(listingDetail.groupSizeTags
      ? { groupSizeTags: listingDetail.groupSizeTags }
      : {}),
    ...(listingDetail.themeTags ? { themeTags: listingDetail.themeTags } : {}),
    ...(listingDetail.amenitiesTags
      ? { amenitiesTags: listingDetail.amenitiesTags }
      : {}),
    ...(listingDetail.regionTags
      ? { regionTags: listingDetail.regionTags }
      : {}),
    ...(listingDetail.offbeatClassification
      ? { offbeatClassification: listingDetail.offbeatClassification }
      : {}),
    ...(listingDetail.rangeClassification
      ? { rangeClassification: listingDetail.rangeClassification }
      : {}),
  };
};

const getImageObjs = (urls: string[]) =>
  urls.map((url) => {
    return { source: "db", url: url };
  });

const getPricePaxVarsFromVariant = (
  variants: VariantInterface[],
): PricePaxInterface[] =>
  variants.map((variant) => {
    return {
      price: variant.price,
      pax: variant.pax,
      tat: variant.tat,
      variantId: variant.variantId,
      ...(variant.numberOfRooms
        ? { numberOfRooms: variant.numberOfRooms }
        : {}),
      ...(variant.sqft ? { sqft: variant.sqft } : {}),
    };
  });
