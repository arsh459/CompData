import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  getListingDetailById,
  getStayDetailById_UNSAFE,
} from "../../../models/ListingDetail/Methods";
import { getVariantV2 } from "../../../models/ListingObj/Methods/getVariantOptions";
// import { VariantOption } from "../../../models/ListingObj/VariantV2";
// import { handleVarOptionSeed } from "./algolia/handleVarOptionSeed";
// import { handleAlgoliaUpdateForVariantOption } from "./algolia/main";
import { handleLegacyVariantOptionUpdate_and_algoliaV2 } from "./legacy/main";

export const onListingVariantOptionWriteFunc = functions
  .region("asia-south1")
  .firestore.document(
    "allListings/{listingId}/variants/{variantId}/variantOptions/{variantOptionId}",
  )
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onListingVariantOptionWriteFunc",
        )
      ) {
        return;
      }

      const listingId: string = context.params.listingId;
      const variantId: string = context.params.variantId;

      const listingDetail = await getListingDetailById(listingId);

      // seed to algolia listingsV2
      const baseVariant = await getVariantV2(
        "allListings",
        listingId,
        variantId,
      );
      await handleLegacyVariantOptionUpdate_and_algoliaV2(
        "allListings",
        listingId,
        listingDetail,
        baseVariant,
        // false, // does not propogate to all options in base
      );

      // algolia support
      // const prevOption = snapshot.before.data() as VariantOption;
      // const newOption = snapshot.after.data() as VariantOption;

      // // if pricing/availability has been updated, support legacy
      // await handleAlgoliaUpdateForVariantOption(
      //   listingDetail,
      //   newOption,
      //   prevOption,
      // );

      // seed individual
      // await handleVarOptionSeed(listingDetail, newOption, baseVariant);

      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayVariantOptionWriteFunc = functions
  .region("asia-south1")
  .firestore.document(
    "stays/{stayId}/variants/{variantId}/variantOptions/{variantOption}",
  )
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onStayVariantOptionWriteFunc",
        )
      ) {
        return;
      }

      const listingId: string = context.params.stayId;
      const variantId: string = context.params.variantId;

      const listingDetail = await getStayDetailById_UNSAFE(listingId);

      // seed to algolia listingsV2
      const baseVariant = await getVariantV2("stays", listingId, variantId);
      await handleLegacyVariantOptionUpdate_and_algoliaV2(
        "stays",
        listingId,
        listingDetail,
        baseVariant,
        // false,
      );

      // algolia support
      // const prevOption = snapshot.before.data() as VariantOption;
      // const newOption = snapshot.after.data() as VariantOption;

      // if pricing/availability has been updated
      // await handleAlgoliaUpdateForVariantOption(
      //   listingDetail,
      //   newOption,
      //   prevOption,
      // );

      // await handleVarOptionSeed(listingDetail, newOption, baseVariant);

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
