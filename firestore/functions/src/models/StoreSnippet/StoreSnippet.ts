import { PricePaxInterface } from "../ListingObj/PricePaxObj";

export interface StoreSnippet {
  listingId: string;
  listingName: string;
  lat: number;
  lng: number;
  num_reviews: number;
  rating: number;
  listingType: string;
  images: string[];
  influencerTagline: string;
  tagline: string;
  subcategory?: string;
  category?: string;
  bookCompleteSlot: boolean;
  hyperLocation?: string;
  circuitId: string;
  pricePaxVariants: PricePaxInterface[];
  circuitName?: string;
}
