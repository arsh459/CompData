import { getKPIsForStaysV2 } from "../../../../models/ListingBrief/getKPIs";
import { getPriceDetails } from "../../../../models/ListingBrief/getPriceDetails";
import { ListingBrief } from "../../../../models/ListingBrief/ListingBrief";
import { isValidToBrief } from "../../../../models/ListingBrief/Methods";
import { createBriefV2 } from "../../../../models/ListingBrief/MethodsV2";
import { ListingDetailInterface } from "../../../../models/ListingDetail/interface";
import {
  VariantOption,
  VariantV2,
} from "../../../../models/ListingObj/VariantV2";
import {
  addListingsToIndexV2,
  addListingToIndexV2,
} from "../../algolia/algoliaUtils";

export const handleVarOptionSeed = async (
  listingDetail: ListingDetailInterface | undefined,
  option: VariantOption,
  variant: VariantV2 | undefined,
) => {
  if (variant && listingDetail && isValidToBrief(listingDetail)) {
    const result = getPriceDetails(
      listingDetail.listingType,
      variant.entireListingVariant ? true : false,
      option,
    );

    const kpis = getKPIsForStaysV2(variant, option);

    const brief = createBriefV2(
      listingDetail,
      variant,
      option,
      kpis ? kpis : [],
      result.price,
      result.perPersonPrice,
      result.priceSuffix,
    );

    await addListingToIndexV2(brief);
  }
};

export const handleVarsOptionSeed = async (
  listingDetail: ListingDetailInterface | undefined,
  options: VariantOption[],
  variant: VariantV2 | undefined,
) => {
  if (variant && listingDetail && isValidToBrief(listingDetail)) {
    const allBriefs: ListingBrief[] = [];
    for (const option of options) {
      const result = getPriceDetails(
        listingDetail.listingType,
        variant.entireListingVariant ? true : false,
        option,
      );

      const kpis = getKPIsForStaysV2(variant, option);

      const brief = createBriefV2(
        listingDetail,
        variant,
        option,
        kpis ? kpis : [],
        result.price,
        result.perPersonPrice,
        result.priceSuffix,
      );

      allBriefs.push(brief);
    }

    // update all briefs
    await addListingsToIndexV2(allBriefs);
  }
};
