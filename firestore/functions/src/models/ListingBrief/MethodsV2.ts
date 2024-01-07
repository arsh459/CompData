import { getVariantOptionUnavailableDates } from "../../main/FirestoreTriggers/onVariantOptionWrite/algolia/availability";
import { calculateRelevanceScore } from "../../main/FirestoreTriggers/onVariantOptionWrite/algolia/relevanceScore";
import { getTags } from "../../main/FirestoreTriggers/onVariantOptionWrite/algolia/tags";
import { ListingDetailInterface } from "../ListingDetail/interface";
import { VariantOption, VariantV2 } from "../ListingObj/VariantV2";
import { getKPIsForStaysV2 } from "./getKPIs";
import { getPriceDetails } from "./getPriceDetails";
import { kpiDict, ListingBrief } from "./ListingBrief";
import { getImagesForBrief } from "./Methods";

export const createListingBriefsFromDetail = (
  listingDetail: ListingDetailInterface,
  variantOptionGraph: { [variantId: string]: string[] },
  allVariantsMap: { [variantId: string]: VariantV2 },
  allOptionsMap: { [optionId: string]: VariantOption },
): ListingBrief[] => {
  const allBriefs: ListingBrief[] = [];
  for (const variant of Object.values(allVariantsMap)) {
    for (const optionId of variantOptionGraph[variant.variantId]) {
      const option = allOptionsMap[optionId];

      const result = getPriceDetails(
        listingDetail.listingType,
        variant.entireListingVariant ? true : false,
        option,
      );

      const kpis = getKPIsForStaysV2(variant, option);
      allBriefs.push(
        createBriefV2(
          listingDetail,
          variant,
          option,
          kpis ? kpis : [],
          result.price,
          result.perPersonPrice,
          result.priceSuffix,
        ),
      );
    }
  }

  return allBriefs;
};

export const createUniqueId = (
  listingId: string,
  variantId: string,
  optionId: string,
) => {
  let newId: string = "";
  newId += listingId;

  if (variantId) {
    newId += `-${variantId.slice(0, 5)}`;
  }

  if (optionId) {
    newId += `-${optionId.slice(0, 5)}`;
  }

  return newId;
};

export const createBriefV2 = (
  listingDetail: ListingDetailInterface,
  variant: VariantV2,
  option: VariantOption,
  kpis: kpiDict[],
  price?: number,
  perPersonPrice?: number,
  priceSuffix?: string,
): ListingBrief => {
  return {
    listingId: listingDetail.listingId,
    objectID: createUniqueId(
      listingDetail.listingId,
      variant.variantId,
      option.optionId,
    ),
    title: listingDetail.listingName,
    listingKey: listingDetail.listingKey ? listingDetail.listingKey : "",
    tagline: listingDetail.tagline,
    ObjectType: listingDetail.listingType === "stays" ? "stays" : "listing",
    listingType: listingDetail.listingType
      ? listingDetail.listingType
      : "activities",
    _geoloc: {
      lat: listingDetail.lat,
      lng: listingDetail.lng,
    },
    circuitName: listingDetail.circuitName ? listingDetail.circuitName : "",
    images: getImagesForBrief(listingDetail).slice(0, 5),

    // variant && option
    variantId: variant ? variant.variantId : "",
    variantOptionId: option ? option.optionId : "",

    num_reviews: listingDetail.num_reviews,
    hyperLocation: listingDetail.hyperLocation
      ? listingDetail.hyperLocation
      : "",
    rating: listingDetail.rating,
    subcategory: listingDetail.subcategory ? listingDetail.subcategory : "",
    category: listingDetail.category ? listingDetail.category : "",
    ...(typeof listingDetail.offbeatClassification === "boolean"
      ? { offbeatClassification: listingDetail.offbeatClassification }
      : {}),
    ...(listingDetail.rangeClassification
      ? { rangeClassification: listingDetail.rangeClassification }
      : {}),
    ...(listingDetail.groupSizeTags
      ? { groupSizeTags: Object.keys(listingDetail.groupSizeTags) }
      : {}),
    ...(listingDetail.themeTags
      ? { themeTags: Object.keys(listingDetail.themeTags) }
      : {}),
    ...(listingDetail.amenitiesTags
      ? { amenitiesTags: Object.keys(listingDetail.amenitiesTags) }
      : {}),
    ...(listingDetail.regionTags
      ? { regionTags: Object.keys(listingDetail.regionTags) }
      : {}),
    ...(typeof price === "number" ? { minPrice: price } : {}),
    ...(typeof perPersonPrice === "number"
      ? { perPersonPrice: perPersonPrice }
      : {}),
    ...(typeof priceSuffix === "string" ? { priceSuffix: priceSuffix } : {}),
    ...(kpis && kpis.length > 0 ? { kpis: kpis } : {}),
    maxPax: typeof option.pax === "number" && option.pax > 0 ? option.pax : 1,
    recommendedPax: [
      `pax_${
        typeof option.pax === "number" && option.pax > 0 ? option.pax : 1
      }`,
    ],
    unavailableDates: getVariantOptionUnavailableDates(option),
    pricing: option.pricing ? option.pricing : {},
    ...(option.avgPrice ? { avgPrice: option.avgPrice } : { avgPrice: -1 }),
    ...(option.defaultPrice
      ? { defaultPrice: option.defaultPrice }
      : { defaultPrice: -1 }),
    _tags: getTags(variant, option),
    score: calculateRelevanceScore(listingDetail), // tie braker
  };
};
