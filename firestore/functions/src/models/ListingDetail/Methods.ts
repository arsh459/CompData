import { fetchOne } from "../../utils/firestore/fetchOne";
import { PricePaxInterface, VariantInterface } from "../ListingObj/PricePaxObj";
import { ListingDetailInterface } from "./interface";
import * as admin from "firebase-admin";
import { CollectionListingISO } from "../Collection/Collection";
import {
  // getAllVariantsV2,
  getCheapestVariantOption,
  // getVariantOptions,
} from "../ListingObj/Methods/getVariantOptions";
import { VariantOption, VariantV2 } from "../ListingObj/VariantV2";

// import {ListingDetailInterface} from './interface';

export const getListingDetailById = async (
  listingId: string,
): Promise<ListingDetailInterface | undefined> => {
  const listingDetail = await fetchOne("allListings", listingId);
  const data = listingDetail.data();

  if (data !== undefined) {
    return data as ListingDetailInterface;
  }

  return undefined;
};

export const checkIfListingExists = async (
  placeId: string,
): Promise<ListingDetailInterface | undefined> => {
  const [stayPlaces, listingPlaces] = await Promise.all([
    admin.firestore().collection("stays").where("placeId", "==", placeId).get(),
    admin
      .firestore()
      .collection("allListings")
      .where("placeId", "==", placeId)
      .get(),
  ]);

  if (stayPlaces.docs.length > 0) {
    return stayPlaces.docs[0].data() as ListingDetailInterface;
  } else if (listingPlaces.docs.length > 0) {
    return listingPlaces.docs[0].data() as ListingDetailInterface;
  }

  return undefined;
};

export const getStayDetailById_UNSAFE = async (
  listingId: string,
): Promise<ListingDetailInterface | undefined> => {
  const stayDetail = await fetchOne("stays", listingId);
  const data = stayDetail.data();

  if (data !== undefined) {
    return data as ListingDetailInterface;
  }

  return undefined;
};

export const getDetail_UNSAFE = async (
  listingType: string,
  listingId: string,
): Promise<ListingDetailInterface | undefined> => {
  let response = undefined;
  if (listingType === "stays") {
    return (await getStayDetailById_UNSAFE(
      listingId,
    )) as ListingDetailInterface;
  } else {
    response = (await getListingDetailById(
      listingId,
    )) as ListingDetailInterface;
  }

  return response;
};

export const getDetail_brute = async (
  listingId: string,
): Promise<ListingDetailInterface | undefined> => {
  const [stayDetail, listingDetail] = await Promise.all([
    getStayDetailById_UNSAFE(listingId),
    getListingDetailById(listingId),
  ]);

  if (stayDetail) {
    return stayDetail;
  }

  if (listingDetail) {
    return listingDetail;
  }

  return undefined;
};

export const findCheapestVariant = (variants: VariantInterface[]) => {
  if (variants.length > 0) {
    variants.sort(function (a, b) {
      return a.price - b.price;
    });

    return variants[0];
  }

  return undefined;
};

export const findCheapestVariant_pricePax = (variants: PricePaxInterface[]) => {
  if (variants.length > 0) {
    variants.sort(function (a, b) {
      return a.price - b.price;
    });

    return variants[0];
  }

  return undefined;
};

export const isDetailValid = (listing: ListingDetailInterface) => {
  if (
    listing.listingId &&
    listing.listingName &&
    (listing.images.length > 0 || listing.coverImages.length > 0) &&
    typeof listing.lat === "number" &&
    typeof listing.lng === "number" &&
    listing.variants.length
  ) {
    return true;
  }

  return false;
};

export const isCollectionDetailValid = (listing: CollectionListingISO) => {
  if (
    listing.listingId &&
    listing.listingName &&
    listing.images.length > 0 &&
    typeof listing.lat === "number" &&
    typeof listing.lng === "number" &&
    listing.pricePaxVariants.length
  ) {
    return true;
  }

  return false;
};

export const findCheapestVariantOption = (
  allVariantsMap: { [variantId: string]: VariantV2 },
  allOptionsMap: { [optionId: string]: VariantOption },
  baseVariantMap: { [optionId: string]: string },
): {
  variant: VariantV2 | undefined;
  option: VariantOption | undefined;
} => {
  const cheapestOption = getCheapestVariantOption(Object.values(allOptionsMap));
  if (cheapestOption) {
    const cheapestVariantList = Object.values(allVariantsMap).filter(
      (variant) =>
        variant.variantId === baseVariantMap[cheapestOption.optionId],
    );
    return {
      variant:
        cheapestVariantList.length > 0 ? cheapestVariantList[0] : undefined,
      option: cheapestOption,
    };
  }

  return {
    variant: undefined,
    option: undefined,
  };
};
