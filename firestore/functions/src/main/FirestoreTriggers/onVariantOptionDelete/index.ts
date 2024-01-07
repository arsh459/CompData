import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  getListingDetailById,
  getStayDetailById_UNSAFE,
} from "../../../models/ListingDetail/Methods";
import { getVariantV2 } from "../../../models/ListingObj/Methods/getVariantOptions";
// import { algoliaUpdateForVariantOption } from "../onVariantOptionWrite/algolia/main";
import { handleLegacyVariantOptionUpdate_and_algoliaV2 } from "../onVariantOptionWrite/legacy/main";
import { handleVariantOptionDeleteAlgolia } from "./algolia/handleDelete";

export const onListingVariantOptionDeleteFunc = functions
  .region("asia-south1")
  .firestore.document(
    "allListings/{listingId}/variants/{variantId}/variantOptions/{variantOptionId}",
  )
  .onDelete(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onListingVariantOptionDeleteFunc",
        )
      ) {
        return;
      }

      const listingId: string = context.params.listingId;
      const variantId: string = context.params.variantId;
      const optionId: string = context.params.variantOptionId;

      const listingDetail = await getListingDetailById(listingId);

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
        // false,
      );

      // if (listingDetail) {
      //   await algoliaUpdateForVariantOption(listingDetail);
      // }

      // listingsV2 index remove
      await handleVariantOptionDeleteAlgolia(listingId, variantId, optionId);

      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayVariantOptionDeleteFunc = functions
  .region("asia-south1")
  .firestore.document(
    "stays/{stayId}/variants/{variantId}/variantOptions/{variantOptionId}",
  )
  .onDelete(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onStayVariantOptionDeleteFunc",
        )
      ) {
        return;
      }

      const listingId: string = context.params.stayId;
      const variantId: string = context.params.variantId;
      const optionId: string = context.params.variantOptionId;

      const listingDetail = await getStayDetailById_UNSAFE(listingId);

      const baseVariant = await getVariantV2("stays", listingId, variantId);
      await handleLegacyVariantOptionUpdate_and_algoliaV2(
        "stays",
        listingId,
        listingDetail,
        baseVariant,
        // false,
      );

      // if (listingDetail) {
      //   await algoliaUpdateForVariantOption(listingDetail);
      // }

      await handleVariantOptionDeleteAlgolia(listingId, variantId, optionId);

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
