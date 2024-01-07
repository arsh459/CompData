import { createUniqueId } from "../../../../models/ListingBrief/MethodsV2";
import { getAllVariantOptions } from "../../../../models/ListingObj/Methods/getVariantOptions";
import { removeListingV2FromIndex } from "../algoliaUtils";

export const removeListingFromAlgoliaV2 = async (
  collectionId: "stays" | "allListings",
  listingId: string,
) => {
  const { allVariantsMap, variantOptionGraph } = await getAllVariantOptions(
    listingId,
    collectionId,
  );

  for (const variantId of Object.keys(allVariantsMap)) {
    for (const optionId of variantOptionGraph[variantId]) {
      await removeListingV2FromIndex(
        createUniqueId(listingId, variantId, optionId),
      );
    }
  }
};
