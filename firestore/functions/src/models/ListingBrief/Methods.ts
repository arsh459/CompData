// import { getRecommendedPax } from "../../main/FirestoreTriggers/onVariantOptionWrite/algolia/paxUtils";
import { CircuitInterface } from "../Circuit/Circuit";
import {
  ListingDetailInterface,
  // selectedLob,
} from "../ListingDetail/interface";
import {
  findCheapestVariant,
  findCheapestVariantOption,
} from "../ListingDetail/Methods";
import {
  getAllVariantOptions,
  getVariantOption,
  getVariantV2,
} from "../ListingObj/Methods/getVariantOptions";
import { VariantOption, VariantV2 } from "../ListingObj/VariantV2";
import { getKPIsForBrief } from "./getKPIs";
import { getPriceDetails, getPriceDetails_Variant } from "./getPriceDetails";
import { kpiDict, ListingBrief } from "./ListingBrief";
import { createListingBriefsFromDetail } from "./MethodsV2";
// import * as functions from "firebase-functions";

export const getBriefsFromDetailList = async (
  listingDetailList: ListingDetailInterface[],
): Promise<{ briefList: ListingBrief[]; briefV2List: ListingBrief[] }> => {
  const briefList: ListingBrief[] = [];
  const briefV2List: ListingBrief[] = [];
  let i = 0;
  for (const listing of listingDetailList) {
    if (isValidToBrief(listing)) {
      const {
        baseVariantIdMap,
        allVariantsMap,
        allOptionsMap,
        variantOptionGraph,
      } = await getAllVariantOptions(
        listing.listingId,
        listing.listingType === "stays" ? "stays" : "allListings",
      );

      briefList.push(
        createListingBriefFromDetail(
          listing,
          baseVariantIdMap,
          allVariantsMap,
          allOptionsMap,
        ),
      );

      briefV2List.push(
        ...createListingBriefsFromDetail(
          listing,
          variantOptionGraph,
          allVariantsMap,
          allOptionsMap,
        ),
      );
    }

    console.log(`${i + 1}/${listingDetailList.length}: ${listing.listingId}`);
    i += 1;
  }
  return {
    briefList,
    briefV2List,
  };
};

export const updateListingBriefFromDetail = async (
  listingDetail: ListingDetailInterface,
  collectionId: "stays" | "allListings",
): Promise<ListingBrief> => {
  const cheapestVariant = findCheapestVariant(listingDetail.variants);
  const result = getPriceDetails_Variant(
    listingDetail.listingType,
    listingDetail.bookCompleteSlot,
    cheapestVariant,
  );

  // functions.logger.log("cheapestVariant", cheapestVariant);

  let kpis: kpiDict[] | undefined = undefined;
  if (cheapestVariant && cheapestVariant.optionId) {
    const variant = await getVariantV2(
      collectionId,
      listingDetail.listingId,
      cheapestVariant.variantId,
    );
    const option = await getVariantOption(
      collectionId,
      listingDetail.listingId,
      cheapestVariant.variantId,
      cheapestVariant.optionId,
    );

    kpis = getKPIsForBrief(listingDetail, variant, option);
  }

  return {
    listingId: listingDetail.listingId,
    objectID: listingDetail.listingId,
    title: listingDetail.listingName,
    tagline: listingDetail.tagline,
    listingKey: listingDetail.listingKey ? listingDetail.listingKey : "",
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

    variantId: cheapestVariant ? cheapestVariant.variantId : "",
    variantOptionId:
      cheapestVariant && cheapestVariant.optionId
        ? cheapestVariant.optionId
        : "",

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
    ...(result && typeof result.price === "number"
      ? { minPrice: result.price }
      : {}),
    ...(result && typeof result.perPersonPrice === "number"
      ? { perPersonPrice: result.perPersonPrice }
      : {}),
    ...(result && typeof result.priceSuffix === "string"
      ? { priceSuffix: result.priceSuffix }
      : {}),
    ...(kpis && kpis.length > 0 ? { kpis: kpis } : {}),
  };
};

export const createListingBriefFromDetail = (
  listingDetail: ListingDetailInterface,
  baseVariantIdMap: { [optionId: string]: string },
  allVariantsMap: { [variantId: string]: VariantV2 },
  allOptionsMap: { [optionId: string]: VariantOption },
): ListingBrief => {
  const { variant, option } = findCheapestVariantOption(
    allVariantsMap,
    allOptionsMap,
    baseVariantIdMap,
  );
  const result = getPriceDetails(
    listingDetail.listingType,
    listingDetail.bookCompleteSlot,
    option,
  );

  const kpis = getKPIsForBrief(listingDetail, variant, option);

  const listingBrief: ListingBrief = {
    listingId: listingDetail.listingId,
    objectID: listingDetail.listingId,
    listingKey: listingDetail.listingKey ? listingDetail.listingKey : "",
    title: listingDetail.listingName,
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
    ...(result && typeof result.price === "number"
      ? { minPrice: result.price }
      : {}),
    ...(result && typeof result.perPersonPrice === "number"
      ? { perPersonPrice: result.perPersonPrice }
      : {}),
    ...(result && typeof result.priceSuffix === "string"
      ? { priceSuffix: result.priceSuffix }
      : {}),
    ...(kpis && kpis.length > 0 ? { kpis: kpis } : {}),

    // recommended pax
    // recommendedPax: recommendedPax,
    // ...(typeof maxPax === "number" && maxPax > 0 ? { maxPax: maxPax } : {}),
  };

  return listingBrief;
};

export const isValidToBrief = (
  listingDetail: ListingDetailInterface,
): boolean => {
  const cheapestVariant = findCheapestVariant(listingDetail.variants);
  if (
    cheapestVariant &&
    cheapestVariant.price > 0 &&
    listingDetail.listingId &&
    listingDetail.listingName &&
    listingDetail.listingType &&
    listingDetail.listingType === "stays" &&
    typeof listingDetail.lat === "number" &&
    typeof listingDetail.lng === "number" &&
    listingDetail.lat !== 0 &&
    listingDetail.lng !== 0 &&
    (listingDetail.images.length > 0 || listingDetail.coverImages.length > 0) &&
    (!listingDetail.tempClosed ||
      (listingDetail.tempClosed && !listingDetail.tempClosed.status))
  ) {
    return true;
  } else if (
    listingDetail.listingId &&
    listingDetail.listingName &&
    listingDetail.listingType &&
    listingDetail.listingType !== "stays" &&
    typeof listingDetail.lat === "number" &&
    typeof listingDetail.lng === "number" &&
    listingDetail.lat !== 0 &&
    listingDetail.lng !== 0 &&
    (listingDetail.images.length > 0 || listingDetail.coverImages.length > 0) &&
    (!listingDetail.tempClosed ||
      (listingDetail.tempClosed && !listingDetail.tempClosed.status))
  ) {
    return true;
  }
  return false;
};

export const isValidCircuitToBrief = (circuit: CircuitInterface): boolean => {
  if (circuit.circuitName && circuit.circuitName && circuit.images.length > 0) {
    return true;
  }

  return false;
};

export const getImagesForBrief = (listing: ListingDetailInterface) => {
  return [...listing.coverImages, ...listing.images];
};

export const createListingBriefFromCircuit = (
  circuit: CircuitInterface,
): ListingBrief => {
  const circuitBrief: ListingBrief = {
    listingId: circuit.circuitId,
    objectID: circuit.circuitId,
    title: circuit.circuitName,
    tagline: "",
    ObjectType: "circuit",
    _geoloc: {
      lat: circuit.lat,
      lng: circuit.lng,
    },
    circuitName: circuit.circuitName,
    images: circuit.images,
    category: "city",
    boosted: true,
  };

  return circuitBrief;
};

export const getBriefsFromCircuitList = (
  circuitList: CircuitInterface[],
): ListingBrief[] => {
  const briefList: ListingBrief[] = [];
  return circuitList.reduce((acc, item) => {
    if (isValidCircuitToBrief(item)) {
      acc.push(createListingBriefFromCircuit(item));
    }

    return acc;
  }, briefList);
};
