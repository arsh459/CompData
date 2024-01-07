export interface ListingInventory {
  [variantId: string]: VariantInventory;
}

export interface VariantInventory {
  [date: string]: SingleDateInventory;
}

export interface SingleDateInventory {
  inventory: number;
  basePrice: number;
}
