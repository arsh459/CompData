import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { VariantV2 } from "../../../models/ListingObj/VariantV2";
import { handleLegacyVariantOptionDelete_and_algoliaV2 } from "./deleteBaseVariant";

export const onListingVariantDeleteFunc = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}/variants/{variantId}")
  .onDelete(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onListingVariantDeleteFunc",
        )
      ) {
        return;
      }

      const listingId: string = context.params.listingId;
      const newVariant = snapshot.data() as VariantV2;

      if (newVariant) {
        // update base
        await handleLegacyVariantOptionDelete_and_algoliaV2(
          "allListings",
          listingId,
          newVariant,
          true,
        );
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayVariantDeleteFunc = functions
  .region("asia-south1")
  .firestore.document("stays/{stayId}/variants/{variantId}")
  .onDelete(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onStayVariantDeleteFunc")
      ) {
        return;
      }

      const listingId: string = context.params.stayId;
      const newVariant = snapshot.data() as VariantV2;
      if (newVariant) {
        // update base
        await handleLegacyVariantOptionDelete_and_algoliaV2(
          "stays",
          listingId,
          newVariant,
          true,
        );
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
