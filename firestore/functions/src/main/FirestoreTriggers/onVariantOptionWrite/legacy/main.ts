import { ListingDetailInterface } from "../../../../models/ListingDetail/interface";
import { getVariantOptions } from "../../../../models/ListingObj/Methods/getVariantOptions";
import { VariantV2 } from "../../../../models/ListingObj/VariantV2";
import { updateBaseVariant } from "../../onListingVariantWrite/updateBaseVariant";
// import { handleVarsOptionSeed } from "../algolia/handleVarOptionSeed";

export const handleLegacyVariantOptionUpdate_and_algoliaV2 = async (
  collectionId: "allListings" | "stays",
  listingId: string,
  listingDetail: ListingDetailInterface | undefined,
  newVariant: VariantV2 | undefined,
  // propogateAlgoliaV2: boolean,
) => {
  if (newVariant && listingDetail) {
    const allVariantOptions = await getVariantOptions(
      collectionId,
      listingId,
      newVariant.variantId,
    );

    // update base
    await updateBaseVariant(
      listingDetail,
      collectionId,
      newVariant,
      allVariantOptions,
    );

    // update algolia listingsV2
    // if (propogateAlgoliaV2) {
    // await handleVarsOptionSeed(listingDetail, allVariantOptions, newVariant);
    // }
  }
};
