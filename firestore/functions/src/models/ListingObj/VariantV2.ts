export interface VariantV2 {
  variantId: string;
  inclusions: string[];
  exclusions: string[];
  name: string;
  images: string[];

  numberOfRooms?: number;
  sqft?: number;
  variantTemplatesInclusions?: VariantTemplateInclusion;
  entireListingVariant?: boolean; // if true this will block the entire property
}

export interface VariantOption {
  listingId: string;
  pax: number;
  tat: number; // minutes
  optionId: string;
  priceSuffix?: string; // stays has night
  templatesInclusions?: TemplateInclusion;
  inclusions: string[];
  avgPrice: number;
  defaultPrice: number;
  name: string; // with breakfast
  pricing: { [date: string]: number }; //  backend
}

export interface TemplateInclusion {
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  gala_dinner?: boolean;
  special_FnB_Discounts?: boolean;
  safari_included?: boolean;
}

export interface VariantTemplateInclusion {
  pool?: boolean;
  smoking_allowed?: boolean;
  tv?: boolean;
  "ac/heaters"?: boolean;
  toiletries?: boolean;
  towels?: boolean;
  seating_area?: boolean;
  study_table?: boolean;
  storage?: boolean;
  minibar?: boolean;
  balcony?: boolean;
  private_washroom?: boolean;
  hot_water?: boolean;
  jacuzzi?: boolean;
  bath_tub?: boolean;
  items_available_on_request?: boolean;
  mountain_facing?: boolean;
  beach_facing?: boolean;
  pool_facing?: boolean;
  garden_facing?: boolean;
}

export type VariantTemplateKey =
  | "pool"
  | "smoking_allowed"
  | "tv"
  | "ac/heaters"
  | "toiletries"
  | "towels"
  | "seating_area"
  | "study_table"
  | "storage"
  | "minibar"
  | "balcony"
  | "private_washroom"
  | "hot_water"
  | "jacuzzi"
  | "bath_tub"
  | "items_available_on_request"
  | "mountain_facing"
  | "beach_facing"
  | "pool_facing"
  | "garden_facing";

export const variantTemplateList: VariantTemplateKey[] = [
  "pool",
  "smoking_allowed",
  "tv",
  "ac/heaters",
  "toiletries",
  "towels",
  "seating_area",
  "study_table",
  "storage",
  "minibar",
  "balcony",
  "private_washroom",
  "hot_water",
  "jacuzzi",
  "bath_tub",
  "items_available_on_request",
  "mountain_facing",
  "beach_facing",
  "pool_facing",
  "garden_facing",
];

export type variantOptionInclusionKey =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "gala_dinner"
  | "special_FnB_Discounts"
  | "safari_included";

export const variantOptionInclusionList: variantOptionInclusionKey[] = [
  "breakfast",
  "lunch",
  "dinner",
  "gala_dinner",
  "special_FnB_Discounts",
  "safari_included",
];
