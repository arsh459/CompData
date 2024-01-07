import { VariantOption } from "../../../../models/ListingObj/VariantV2";

const getGlobalUnavailableDates = (variantOptions: VariantOption[]) => {
  const unavailableDates: { [date: string]: number } = {};
  for (const variantOption of variantOptions) {
    if (variantOption.pricing) {
      for (const date of Object.keys(variantOption.pricing)) {
        if (variantOption.pricing[date] === -2) {
          if (typeof unavailableDates[date] === "number") {
            unavailableDates[date] += 1;
          } else {
            unavailableDates[date] = 1;
          }
        }
      }
    }
  }

  const finalDates: string[] = [];
  for (const unavail of Object.keys(unavailableDates)) {
    if (unavailableDates[unavail] === variantOptions.length) {
      finalDates.push(unavail);
    }
  }

  return finalDates;
};

export const getVariantOptionUnavailableDates = (
  variantOption: VariantOption,
) => {
  const unavailDates: string[] = [];
  if (variantOption.pricing) {
    for (const date of Object.keys(variantOption.pricing)) {
      if (variantOption.pricing[date] === -2) {
        unavailDates.push(date);
      }
    }
  }

  return unavailDates;
};

const getGlobalMinPricing = (variantOptions: VariantOption[]) => {
  const minPricing: { [date: string]: number } = {};
  for (const variantOption of variantOptions) {
    if (variantOption.pricing) {
      for (const date of Object.keys(variantOption.pricing)) {
        if (
          (typeof minPricing[date] === "number" &&
            minPricing[date] > variantOption.pricing[date]) ||
          !minPricing[date]
        ) {
          minPricing[date] = variantOption.pricing[date];
        }
      }
    }
  }

  return minPricing;
};

export const createPricingBrief = (
  listingId: string,
  variantOptions: VariantOption[],
) => {
  return {
    pricing: getGlobalMinPricing(variantOptions),
    unavailableDates: getGlobalUnavailableDates(variantOptions),
    objectID: listingId,
  };
};
