import {
  getAllListings,
  getAllStays,
} from "../../../models/ListingDetail/getAllStays";
import { VariantInterface } from "../../../models/ListingObj/PricePaxObj";
import { VariantOption, VariantV2 } from "../../../models/ListingObj/VariantV2";
import { v4 as uuid } from "uuid";
import * as admin from "firebase-admin";
import { getVariantOptions } from "../../../models/ListingObj/Methods/getVariantOptions";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
// import { getStayDetailById_UNSAFE } from "../../../models/ListingDetail/Methods";
// import { getListingDetailById } from "../../../models/ListingDetail/Methods";

export const updateAllListingVariants = async (
  listingsType: "stays" | "allListings",
) => {
  const data = await getRequiredListings(listingsType);
  // const listing = await getListingDetailById(
  //   "002e85a0-eb79-4a84-99d7-ecec80d39837"
  // );

  if (data) {
    // const data = [listing];
    for (let j = 0; j < data.length; j++) {
      for (let i = 0; i < data[j].variants.length; i++) {
        const variantOptions = await getVariantOptions(
          listingsType,
          data[j].listingId,
          data[j].variants[i].variantId,
        );

        // console.log("variantOptions", variantOptions);

        for (const varOption of variantOptions) {
          // console.log("var", varOption);
          const newVariant = updateVariantOption(varOption, data[j].listingId);
          // console.log("newVariant", newVariant);

          await saveVariantInRemote(
            data[j].listingId,
            listingsType,
            data[j].variants[i].variantId,
            newVariant,
          );
        }
      }
      // console.log(`j:${j + 1}/${data.length} listingId:${data[j].listingId}`);
    }
  }

  return;
};

export const seedListing = async (
  listing: ListingDetailInterface,
  listingType: "stays" | "allListings",
) => {
  for (let i = 0; i < listing.variants.length; i++) {
    const exists = await checkIfVariantsExist(
      listing.listingId,
      listingType,
      listing.variants[i].variantId,
    );

    // run only if no variants exist
    if (!exists) {
      const { variant, variantOption } = createVariantV2FromVariant(
        listing.variants[i],
        i,
        listing.listingId,
      );

      await saveInRemote(
        listing.listingId,
        listingType,
        variant,
        variantOption,
      );
    }
  }
};

export const seedAllListings = async (
  listingsType: "stays" | "allListings",
) => {
  const data = await getRequiredListings(listingsType);
  // const stay = await getStayDetailById_UNSAFE(
  // "0015b4f4-8ec7-40e0-9b96-857d27e54cff"
  // );
  // if (stay) {
  // const data = [stay];
  for (let j = 0; j < data.length; j++) {
    await seedListing(data[j], listingsType);
    console.log(`j:${j + 1}/${data.length} listingId:${data[j].listingId}`);
  }

  return;
  // }
};

const saveInRemote = async (
  listingId: string,
  collectionId: string,
  variant: VariantV2,
  variantOption: VariantOption,
) => {
  await admin
    .firestore()
    .collection(collectionId)
    .doc(listingId)
    .collection("variants")
    .doc(variant.variantId)
    .set(variant, { merge: true });
  await admin
    .firestore()
    .collection(collectionId)
    .doc(listingId)
    .collection("variants")
    .doc(variant.variantId)
    .collection("variantOptions")
    .doc(variantOption.optionId)
    .set(variantOption, { merge: true });
};

const checkIfVariantsExist = async (
  listingId: string,
  collectionId: string,
  variantId: string,
  // existingVariants: VariantInterface[]
): Promise<boolean> => {
  const existingVarV2 = await admin
    .firestore()
    .collection(collectionId)
    .doc(listingId)
    .collection("variants")
    .doc(variantId)
    .get();

  if (existingVarV2.exists) {
    return true;
  }

  return false;
};

const saveVariantInRemote = async (
  listingId: string,
  collectionId: string,
  variantId: string,
  variantOption: VariantOption,
) => {
  await admin
    .firestore()
    .collection(collectionId)
    .doc(listingId)
    .collection("variants")
    .doc(variantId)
    .collection("variantOptions")
    .doc(variantOption.optionId)
    .set(variantOption);
};

const getRequiredListings = async (listingsType: "stays" | "allListings") => {
  if (listingsType === "stays") {
    return await getAllStays();
  } else {
    return await getAllListings();
  }
};

const createVariantV2FromVariant = (
  variant: VariantInterface,
  index: number,
  listingId: string,
) => {
  const variantV2: VariantV2 = {
    variantId: variant.variantId,
    inclusions: variant.inclusions,
    exclusions: variant.exclusions,
    name: variant.name ? variant.name : `variant-${index}`,
    images: [],
    ...(variant.numberOfRooms ? { numberOfRooms: variant.numberOfRooms } : {}),
    ...(variant.sqft ? { sqft: variant.sqft } : {}),
  };

  const variantOption: VariantOption = {
    pax: variant.pax,
    tat: variant.tat,
    optionId: uuid(),
    inclusions: [],
    defaultPrice: variant.price,
    avgPrice: -1,
    name: `Option ${index + 1}`,
    pricing: {},
    listingId: listingId,
    ...(variant.priceSuffix ? { priceSuffix: variant.priceSuffix } : {}),
  };

  return {
    variant: variantV2,
    variantOption: variantOption,
  };
};

const updateVariantOption = (
  variantOption: VariantOption,
  listingId: string,
): VariantOption => {
  return {
    pax: variantOption.pax,
    tat: variantOption.tat,
    optionId: variantOption.optionId,
    inclusions: [],
    defaultPrice: variantOption.defaultPrice ? variantOption.defaultPrice : 0,
    avgPrice: -1,
    name: variantOption.name,
    pricing: {},
    listingId: listingId,
  };
};
