import { ListingDetailInterface } from "../../../../models/ListingDetail/interface";
import { getAllVariantOptions } from "../../../../models/ListingObj/Methods/getVariantOptions";
import { VariantOption } from "../../../../models/ListingObj/VariantV2";
import { updateListingIoIndex } from "../../algolia/algoliaUtils";
import { createPricingBrief } from "./availability";
import { shallowEqual } from "./compare";

export const handleAlgoliaUpdateForVariantOption = async (
  listingDetail: ListingDetailInterface | undefined,
  newOption: VariantOption,
  prevOption: VariantOption,
) => {
  // if pricing has changed
  if (listingDetail && shallowEqual(prevOption.pricing, newOption.pricing)) {
    await algoliaUpdateForVariantOption(listingDetail);
  }
};

export const algoliaUpdateForVariantOption = async (
  listingDetail: ListingDetailInterface,
) => {
  const { allOptionsMap } = await getAllVariantOptions(
    listingDetail.listingId,
    listingDetail.listingType === "stays" ? "stays" : "allListings",
  );

  const pricingBrief = createPricingBrief(
    listingDetail.listingId,
    Object.values(allOptionsMap),
  );

  // update in algolia
  await updateListingIoIndex(pricingBrief, false);
};
