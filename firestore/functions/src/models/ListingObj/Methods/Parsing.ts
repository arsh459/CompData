import { ListingDetailInterface } from "../../ListingDetail/interface";
import { VariantInterface, PricePaxInterface } from "../PricePaxObj";

export const getCoverImage = (listing: ListingDetailInterface) => {
  // if cover images is present
  if (listing.coverImages.length > 0) {
    return {
      url: listing.coverImages[0],
      source: "db",
    };
  }

  // return image
  if (listing.images.length > 0) {
    return {
      url: listing.images[0],
      source: "db",
    };
  }

  if (listing.googlePhotos && listing.googlePhotos.length > 0) {
    return {
      ...listing.googlePhotos[0],
      source: "googlePlaces",
    };
  }

  return {
    url: "",
    source: "db",
  };
};

export const getPaxPriceVariants = (
  listing: ListingDetailInterface,
  nonZeroPricesOnly: boolean,
): PricePaxInterface[] => {
  const response: PricePaxInterface[] = [];
  return listing.variants.reduce((acc, item) => {
    // pax - tat - price
    if (validatePaxPrice(item, nonZeroPricesOnly)) {
      acc.push({
        pax: item.pax,
        tat: item.tat,
        price: item.price,
        variantId: item.variantId,
        ...(item.numberOfRooms && typeof item.numberOfRooms === "number"
          ? { numberOfRooms: item.numberOfRooms }
          : {}),
        ...(item.sqft && typeof item.sqft === "number"
          ? { sqft: item.sqft }
          : {}),
      });
    }

    return acc;
  }, response);
};

export const validatePaxPrice = (
  variant: VariantInterface,
  nonZeroPricesOnly: boolean,
) => {
  if (variant.pax > 0 && variant.price >= 0 && !nonZeroPricesOnly) {
    return true;
  } else if (variant.pax > 0 && variant.price > 0 && nonZeroPricesOnly) {
    return true;
  }
  return false;
};
