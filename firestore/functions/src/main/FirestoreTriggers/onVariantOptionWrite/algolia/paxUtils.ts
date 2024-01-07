import { getCheapestVariantOption } from "../../../../models/ListingObj/Methods/getVariantOptions";
import {
  VariantOption,
  VariantV2,
} from "../../../../models/ListingObj/VariantV2";

const getMaxPaxInVariant = (
  variantOptionGraph: {
    [variantId: string]: string[];
  },
  variantId: string,
  allVariantOptions: { [optionId: string]: VariantOption },
) => {
  let maxPaxInVariant: number = 0;
  for (const optionId of variantOptionGraph[variantId]) {
    const option = allVariantOptions[optionId];
    if (option.pax > maxPaxInVariant) {
      maxPaxInVariant = option.pax;
    }
  }

  return maxPaxInVariant;
};

const getRecommendedPaxForVarOptions = (variantOptions: VariantOption[]) => {
  const recommendedPax: string[] = [];
  for (const option of variantOptions) {
    if (option.pax > 0) {
      recommendedPax.push(`pax_${option.pax}`);
    }
  }

  return recommendedPax;
};

export const getRecommendedPax = (
  mustBookComplete: boolean,
  allVariantOptions: { [optionId: string]: VariantOption },
  allVariants: VariantV2[],
  variantOptionGraph: { [variantId: string]: string[] },
) => {
  const recommendedPax = getRecommendedPaxForVarOptions(
    Object.values(allVariantOptions),
  );

  if (mustBookComplete) {
    const cheapestOption = getCheapestVariantOption(
      Object.values(allVariantOptions),
    );

    if (cheapestOption) {
      return {
        maxPax: cheapestOption.pax,
        recommendedPax: recommendedPax,
      };
    }
  } else {
    let maxPax: number = 0;
    for (const variant of allVariants) {
      const maxPaxInVar = getMaxPaxInVariant(
        variantOptionGraph,
        variant.variantId,
        allVariantOptions,
      );

      if (variant.numberOfRooms) {
        maxPax += maxPaxInVar * variant.numberOfRooms;
      } else {
        maxPax += maxPaxInVar;
      }
    }

    return {
      maxPax: maxPax,
      recommendedPax: recommendedPax,
    };
  }

  return {
    recommendedPax: recommendedPax,
  };
};
