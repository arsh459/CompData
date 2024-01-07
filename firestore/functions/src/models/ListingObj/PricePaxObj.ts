import * as t from "io-ts";

export const PricePaxObj = t.type({
  price: t.number,
  tat: t.number,
  pax: t.number,
  variantId: t.string,
});

export interface PricePaxInterface {
  price: number;
  pax: number;
  tat: number;
  variantId: string;
  numberOfRooms?: number;
  sqft?: number;
  name?: string;
}

export interface VariantInterface {
  price: number;
  pax: number;
  tat: number;
  variantId: string;
  optionId?: string;
  inclusions: string[];
  exclusions: string[];
  numberOfRooms?: number;
  sqft?: number;
  priceSuffix?: string;
  name?: string;
}
