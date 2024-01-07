import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import { ListingDetailInterface } from "../../../../models/ListingDetail/interface";
import { addToSiteMap } from "../../../../models/ListingSiteMap/Methods";
import { handleListingCreateSeed } from "./handleCreateSeed";

export const onListingAddAlgolia = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onListingAddAlgolia")) {
        return;
      }

      const listingNow = change.data() as ListingDetailInterface;
      const seeded = await handleListingCreateSeed(listingNow);

      if (seeded && listingNow.listingKey) {
        await addToSiteMap(
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

export const onStayAddAlgolia = functions
  .region("asia-south1")
  .firestore.document("stays/{listingId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onStayAddAlgolia")) {
        return;
      }

      const listingNow = change.data() as ListingDetailInterface;
      const seeded = await handleListingCreateSeed(listingNow);

      if (seeded && listingNow.listingKey) {
        await addToSiteMap(
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
