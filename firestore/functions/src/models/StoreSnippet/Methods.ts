import { ListingDetailInterface } from "../ListingDetail/interface";
import { StoreSnippet } from "./StoreSnippet";
import { getPaxPriceVariants } from "../ListingObj/Methods/Parsing";
import { UGCListing } from "../UGCListing/UGCListing";

export const createStoreSnippetFromDetail = (
  listing: ListingDetailInterface,
  ugcListing: UGCListing
): StoreSnippet => {
  return {
    listingId: listing.listingId,
    listingName: listing.listingName,
    lat: listing.lat,
    lng: listing.lng,
    num_reviews: listing.num_reviews,
    rating: listing.rating,
    listingType: listing.listingType,
    images: getImages(listing, ugcListing),
    influencerTagline: ugcListing.heading
      ? ugcListing.heading
      : ugcListing.description,
    tagline: listing.tagline,
    ...(listing.subcategory ? { subcategory: listing.subcategory } : {}),
    ...(listing.category ? { category: listing.category } : {}),
    bookCompleteSlot: listing.bookCompleteSlot
      ? listing.bookCompleteSlot
      : false,
    ...(listing.hyperLocation ? { hyperLocation: listing.hyperLocation } : {}),
    circuitId: listing.circuitId,
    pricePaxVariants: getPaxPriceVariants(listing, true),
    ...(listing.circuitName ? { circuitName: listing.circuitName } : {}),
  };
};

const getImages = (
  listing: ListingDetailInterface,
  ugcListing: UGCListing
): string[] => {
  return [
    ...(ugcListing.images ? ugcListing.images : ugcListing.images),
    ...(listing.coverImages && listing.coverImages.length > 0
      ? listing.coverImages
      : []),
    ...(listing.images && listing.images.length > 0 ? listing.images : []),
  ];
};
