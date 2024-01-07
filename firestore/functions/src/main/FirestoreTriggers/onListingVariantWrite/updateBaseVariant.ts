import { VariantInterface } from "../../../models/ListingObj/PricePaxObj";
import {
  VariantOption,
  variantTemplateList,
  variantOptionInclusionList,
  //   VariantTemplateKey,
  //   variantOptionInclusionKey,
  VariantV2,
} from "../../../models/ListingObj/VariantV2";
import * as admin from "firebase-admin";
import { getDisplayPrice } from "../../../models/ListingBrief/getPriceDetails";
import { getCheapestVariantOption } from "../../../models/ListingObj/Methods/getVariantOptions";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
// import * as functions from "firebase-functions";

export const updateBaseVariant = async (
  detail: ListingDetailInterface,
  collectionId: "allListings" | "stays",
  variant: VariantV2,
  variantOptions: VariantOption[],
  // unavailableDates?: string[],
) => {
  const legacyVariant = createLegacyVariant(variant, variantOptions);
  // functions.logger.log("legacyVariant", legacyVariant);

  // detail
  if (detail) {
    const updatedLegacy = getUpdatedLegacyVariant(
      detail.variants,
      legacyVariant,
    );

    // functions.logger.log("updatedLegacy", updatedLegacy);

    await admin
      .firestore()
      .collection(collectionId)
      .doc(detail.listingId)
      .update({
        variants: updatedLegacy,
        algoliaUpdate: admin.firestore.FieldValue.increment(1), // trigger algolia update
      });
  }
};

const createLegacyVariant = (
  variant: VariantV2,
  variantOptions: VariantOption[],
): VariantInterface => {
  const cheapestVariantOption = getCheapestVariantOption(variantOptions);

  // const legacyPriceSuffix = getLegacyPriceSuffix(variantOptions);
  return {
    price: cheapestVariantOption ? getDisplayPrice(cheapestVariantOption) : 0,
    pax: cheapestVariantOption ? cheapestVariantOption.pax : 1,
    tat: cheapestVariantOption ? cheapestVariantOption.tat : 1,
    variantId: variant.variantId,
    optionId: cheapestVariantOption ? cheapestVariantOption.optionId : "",
    inclusions: getLegacyInclusions(variant, cheapestVariantOption),
    exclusions: variant.exclusions,
    ...(variant.numberOfRooms ? { numberOfRooms: variant.numberOfRooms } : {}),
    ...(variant.sqft ? { sqft: variant.sqft } : {}),
    ...(cheapestVariantOption && cheapestVariantOption.priceSuffix
      ? { priceSuffix: cheapestVariantOption.priceSuffix }
      : {}),
    name: variant.name,
  };
};

export const capitalise = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const getLegacyInclusions = (
  variant: VariantV2,
  variantOption?: VariantOption,
): string[] => {
  const inclusionList: string[] = [];

  // meal plan
  // for (const variantOption of variantOptions) {
  if (variantOption && variantOption.templatesInclusions) {
    variantOptionInclusionList.map((item) => {
      if (
        variantOption.templatesInclusions &&
        variantOption.templatesInclusions[item]
      ) {
        inclusionList.push(capitalise(item.replace("_", " ")));
      }
    });
  }
  // }

  // checkboxes
  if (variant.variantTemplatesInclusions) {
    variantTemplateList.map((item) => {
      if (
        variant.variantTemplatesInclusions &&
        variant.variantTemplatesInclusions[item]
      ) {
        inclusionList.push(capitalise(item.replace("_", " ")));
      }
    });
  }

  // manually added
  inclusionList.push(...variant.inclusions);
  if (variantOption) {
    inclusionList.push(...variantOption.inclusions);
  }

  return Array.from(new Set(inclusionList));
};

/*
const getLeagacyPax = (variantOptions: VariantOption[]): number => {
  const paxArray = variantOptions.map((item) => item.pax);
  return Math.max(1, ...paxArray);
};

const getLeagacyTat = (variantOptions: VariantOption[]): number => {
  const tatArray = variantOptions.map((item) => item.tat);
  return Math.max(1, ...tatArray);
};

const getLegacyVariantPrice = (variantOptions: VariantOption[]) => {
  const avgAvgPriceArr: number[] = [];
  const defaultPriceArr: number[] = [];
  for (const variantOption of variantOptions) {
    if (variantOption.avgPrice && variantOption.avgPrice > 0) {
      avgAvgPriceArr.push(variantOption.avgPrice);
    }
    if (variantOption.defaultPrice && variantOption.defaultPrice > 0) {
      defaultPriceArr.push(variantOption.defaultPrice);
    }
  }

  // functions.logger.log("avgAvgPriceArr", avgAvgPriceArr);
  // functions.logger.log("defaultPriceArr", defaultPriceArr);

  const avgPrice = arraySum(avgAvgPriceArr);
  const defPrice = arraySum(defaultPriceArr);

  // functions.logger.log("avgPrice", avgPrice);
  // functions.logger.log("defPrice", defPrice);

  if (avgPrice > 0) {
    return avgPrice;
  }

  if (defPrice > 0) {
    return defPrice;
  }

  return 0;
};

const arraySum = (array: number[]) => {
  if (array.length > 0) {
    let sum: number = 0;
    for (const elem of array) {
      sum += elem;
    }
    return sum / array.length;
  }

  return 0;
};

const getLegacyPriceSuffix = (variantOptions: VariantOption[]) => {
  let priceSuffix = "";
  for (const variantOption of variantOptions) {
    if (variantOption.priceSuffix) {
      priceSuffix = variantOption.priceSuffix;
    }
  }

  return priceSuffix;
};
*/

const getUpdatedLegacyVariant = (
  variants: VariantInterface[],
  legacyVariant: VariantInterface,
) => {
  const updatedVariants: VariantInterface[] = [];
  let legacyAdded = false;
  for (const variant of variants) {
    if (variant.variantId === legacyVariant.variantId) {
      updatedVariants.push(legacyVariant);
      legacyAdded = true;
    } else {
      updatedVariants.push(variant);
    }
  }

  // if variant is not added
  if (!legacyAdded) {
    updatedVariants.push(legacyVariant);
  }

  return updatedVariants;
};
