import { selectedLob } from "../ListingDetail/interface";
import { VariantInterface } from "../ListingObj/PricePaxObj";
// import { VariantInterface } from "../ListingObj/PricePaxObj";
import { VariantOption } from "../ListingObj/VariantV2";

export const getPriceDetails = (
  listingType: selectedLob,
  bookCompleteSlot?: boolean,
  option?: VariantOption,
): { price?: number; priceSuffix?: string; perPersonPrice?: number } => {
  if (option && listingType === "stays") {
    const displayPrice = getDisplayPrice(option);
    return {
      price: displayPrice,
      priceSuffix: option.priceSuffix ? option.priceSuffix : "night",
      ...(bookCompleteSlot && option.pax > 1
        ? { perPersonPrice: Math.round(displayPrice / option.pax) }
        : {}),
    };
  } else if (option) {
    const displayPrice = getDisplayPrice(option);
    return {
      price: displayPrice,
      priceSuffix: option.priceSuffix ? option.priceSuffix : "",
      ...(bookCompleteSlot && option.pax > 1
        ? { perPersonPrice: Math.round(displayPrice / option.pax) }
        : {}),
    };
  } else {
    return {};
  }
};

export const getDisplayPrice = (option: VariantOption) => {
  if (typeof option.avgPrice === "number" && option.avgPrice !== -1) {
    return option.avgPrice;
  } else if (
    typeof option.defaultPrice === "number" &&
    option.defaultPrice !== -1
  ) {
    return option.defaultPrice;
  }
  return 0;
};

export const getPriceDetails_Variant = (
  listingType: selectedLob,
  bookCompleteSlot?: boolean,
  variant?: VariantInterface,
): { price?: number; priceSuffix?: string; perPersonPrice?: number } => {
  if (variant && listingType === "stays") {
    return {
      price: variant.price,
      priceSuffix: variant.priceSuffix ? variant.priceSuffix : "night",
      ...(bookCompleteSlot && variant.pax > 1
        ? { perPersonPrice: Math.round(variant.price / variant.pax) }
        : {}),
    };
  } else if (variant) {
    return {
      price: variant.price,
      priceSuffix: variant.priceSuffix ? variant.priceSuffix : "",
      ...(bookCompleteSlot && variant.pax > 1
        ? { perPersonPrice: Math.round(variant.price / variant.pax) }
        : {}),
    };
  } else {
    return {};
  }
};
