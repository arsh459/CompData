import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import { ListingDetailInterface } from "../../../../models/ListingDetail/interface";
import { removeFromSiteMap } from "../../../../models/ListingSiteMap/Methods";
import { removeListingFromIndex } from "../algoliaUtils";
import { removeListingFromAlgoliaV2 } from "../onListingUpdate/removeListing";

export const onListingDeleteAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}")
  .onDelete(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onListingDeleteAlgoliaFunc",
        )
      ) {
        return;
      }

      const listingNow = change.data() as ListingDetailInterface;
      await removeListingFromIndex(listingNow.listingId);
      await removeListingFromAlgoliaV2("allListings", listingNow.listingId);

      if (listingNow.listingKey) {
        await removeFromSiteMap(
          "experiences",
          listingNow.listingName,
          listingNow.listingKey,
        );
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayDeleteAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("stays/{listingId}")
  .onDelete(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onStayDeleteAlgoliaFunc")
      ) {
        return;
      }

      const listingNow = change.data() as ListingDetailInterface;
      await removeListingFromIndex(listingNow.listingId);
      await removeListingFromAlgoliaV2("stays", listingNow.listingId);

      if (listingNow.listingKey) {
        await removeFromSiteMap(
          "stays",
          listingNow.listingName,
          listingNow.listingKey,
        );
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
