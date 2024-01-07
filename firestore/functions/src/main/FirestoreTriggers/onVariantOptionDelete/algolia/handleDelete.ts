import {
  removeListingV2FromIndex,
  removeListingsV2FromIndex,
} from "../../algolia/algoliaUtils";
import { createUniqueId } from "../../../../models/ListingBrief/MethodsV2";
import { VariantOption } from "../../../../models/ListingObj/VariantV2";

export const handleVariantOptionDeleteAlgolia = async (
  listingId: string,
  variantId: string,
  optionId: string,
) => {
  await removeListingV2FromIndex(
    createUniqueId(listingId, variantId, optionId),
  );
};

export const handleVarsOptionDelete = async (
  listingId: string,
  variantId: string,
  variantOptions: VariantOption[],
) => {
  const ids: string[] = [];
  for (const option of variantOptions) {
    ids.push(createUniqueId(listingId, variantId, option.optionId));
  }

  // batch delete
  await removeListingsV2FromIndex(ids);
};
