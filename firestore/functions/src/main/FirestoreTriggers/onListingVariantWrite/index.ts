import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  getListingDetailById,
  getStayDetailById_UNSAFE,
} from "../../../models/ListingDetail/Methods";
import { VariantV2 } from "../../../models/ListingObj/VariantV2";
// import { algoliaUpdateForVariantOption } from "../onVariantOptionWrite/algolia/main";
import { handleLegacyVariantOptionUpdate_and_algoliaV2 } from "../onVariantOptionWrite/legacy/main";

export const onListingVariantWriteFunc = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}/variants/{variantId}")
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onListingVariantWriteFunc",
        )
      ) {
        return;
      }

      const listingId: string = context.params.listingId;
      const newVariant = snapshot.after.data() as VariantV2;

      const listingDetail = await getListingDetailById(listingId);

      await handleLegacyVariantOptionUpdate_and_algoliaV2(
        "allListings",
        listingId,
        listingDetail,
        newVariant,
      );

      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayVariantWriteFunc = functions
  .region("asia-south1")
  .firestore.document("stays/{stayId}/variants/{variantId}")
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onStayVariantWriteFunc")
      ) {
        return;
      }

      const listingId: string = context.params.stayId;
      const newVariant = snapshot.after.data() as VariantV2;

      const listingDetail = await getStayDetailById_UNSAFE(listingId);

      await handleLegacyVariantOptionUpdate_and_algoliaV2(
        "stays",
        listingId,
        listingDetail,
        newVariant,
      );

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
