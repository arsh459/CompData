import {
  createListingBriefFromDetail,
  isValidToBrief,
} from "../../../../models/ListingBrief/Methods";
import { createListingBriefsFromDetail } from "../../../../models/ListingBrief/MethodsV2";
import { ListingDetailInterface } from "../../../../models/ListingDetail/interface";
import { getAllVariantOptions } from "../../../../models/ListingObj/Methods/getVariantOptions";
import { addListingsToIndexV2, addListingToIndex } from "../algoliaUtils";

export const handleListingCreateSeed = async (
  listingNow: ListingDetailInterface,
) => {
  //   console.log("listingNow", listingNow);

  if (isValidToBrief(listingNow)) {
    const {
      allOptionsMap,
      allVariantsMap,
      baseVariantIdMap,
      variantOptionGraph,
    } = await getAllVariantOptions(
      listingNow.listingId,
      listingNow.listingType === "stays" ? "stays" : "allListings",
    );

    // console.log("allOptionsMap", allOptionsMap);
    // console.log("allVariantsMap", allVariantsMap);

    const listingBrief = createListingBriefFromDetail(
      listingNow,
      baseVariantIdMap,
      allVariantsMap,
      allOptionsMap,
    );

    const listingBriefsV2 = createListingBriefsFromDetail(
      listingNow,
      variantOptionGraph,
      allVariantsMap,
      allOptionsMap,
    );

    // console.log("listingBriefsV2", listingBriefsV2);

    // add listingBrief
    await addListingToIndex(listingBrief);
    await addListingsToIndexV2(listingBriefsV2);

    return true;
  }

  return false;
};
