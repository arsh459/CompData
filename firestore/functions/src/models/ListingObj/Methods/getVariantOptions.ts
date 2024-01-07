import * as admin from "firebase-admin";
import { VariantOption, VariantV2 } from "../VariantV2";

export const getVariantOptions = async (
  collectionId: string,
  listingId: string,
  variantId: string,
) => {
  //   console.log("listingId", listingId);
  //   console.log("collectionId", collectionId);
  //   console.log("variantId", variantId);
  const variantOptions = await admin
    .firestore()
    .collection(collectionId)
    .doc(listingId)
    .collection("variants")
    .doc(variantId)
    .collection("variantOptions")
    .get();

  const varOptions: VariantOption[] = [];
  for (const variantOption of variantOptions.docs) {
    if (variantOption.exists) {
      varOptions.push(variantOption.data() as VariantOption);
    }
  }

  return varOptions;
};

export const getVariantV2 = async (
  collectionId: string,
  listingId: string,
  variantId: string,
): Promise<VariantV2 | undefined> => {
  const variant = await admin
    .firestore()
    .collection(collectionId)
    .doc(listingId)
    .collection("variants")
    .doc(variantId)
    .get();

  if (variant.exists) {
    return variant.data() as VariantV2;
  }

  return undefined;
};

export const getVariantOption = async (
  collectionId: string,
  listingId: string,
  variantId: string,
  optionId: string,
) => {
  //   console.log("listingId", listingId);
  //   console.log("collectionId", collectionId);
  //   console.log("variantId", variantId);
  const variantOption = await admin
    .firestore()
    .collection(collectionId)
    .doc(listingId)
    .collection("variants")
    .doc(variantId)
    .collection("variantOptions")
    .doc(optionId)
    .get();

  // const varOptions: VariantOption[] = [];
  if (variantOption.exists) {
    return variantOption.data() as VariantOption;
  }

  return undefined;
};

export const getAllVariantOptions = async (
  listingId: string,
  collectionId: "stays" | "allListings",
) => {
  const allVariantsMap: { [id: string]: VariantV2 } = {};
  const allOptionsMap: { [id: string]: VariantOption } = {};
  const baseVariantIdMap: { [optionId: string]: string } = {};
  const variantOptionGraph: { [variantId: string]: string[] } = {};
  const allVariants = await getAllVariantsV2(collectionId, listingId);

  for (const variant of allVariants) {
    allVariantsMap[variant.variantId] = variant;
    variantOptionGraph[variant.variantId] = [];

    const allOptionsForVariant = await getVariantOptions(
      collectionId,
      listingId,
      variant.variantId,
    );
    for (const option of allOptionsForVariant) {
      allOptionsMap[option.optionId] = option;
      baseVariantIdMap[option.optionId] = variant.variantId;
      variantOptionGraph[variant.variantId].push(option.optionId);
    }
  }

  return {
    allVariantsMap,
    allOptionsMap,
    baseVariantIdMap,
    variantOptionGraph,
  };
};

export const getAllVariantsV2 = async (
  collectionId: string,
  listingId: string,
): Promise<VariantV2[]> => {
  const variants = await admin
    .firestore()
    .collection(collectionId)
    .doc(listingId)
    .collection("variants")
    .get();

  const remoteVariants: VariantV2[] = [];
  for (const variant of variants.docs) {
    if (variant.exists) {
      remoteVariants.push(variant.data() as VariantV2);
    }
  }

  return remoteVariants;
};

export const getCheapestVariantOption = (
  variantOptions: VariantOption[],
): VariantOption | undefined => {
  const sorted = variantOptions.sort((a, b) => {
    if (
      typeof a.avgPrice === "number" &&
      a.avgPrice !== -1 &&
      typeof b.avgPrice === "number" &&
      b.avgPrice !== -1
    ) {
      return a.avgPrice - b.avgPrice;
    }

    if (
      typeof a.defaultPrice === "number" &&
      a.defaultPrice !== -1 &&
      typeof b.defaultPrice === "number" &&
      b.defaultPrice !== -1
    ) {
      return a.defaultPrice - b.defaultPrice;
    }
    return 0;
  });

  if (sorted.length > 0) {
    return sorted[0];
  }

  return undefined;
};
