import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
import { createThumbURLForDetail } from "../../Https/addListingThmbnail/main";

export const onListingCoverImageCreateFunc = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onListingCoverImageCreate"
        )
      ) {
        return;
      }

      const listingDetail = change.data() as ListingDetailInterface;
      await createThumbURLForDetail(listingDetail);
      return;
    } catch (error) {
      console.error(error);
    }
  });

export const onStayCoverImageCreateFunc = functions
  .region("asia-south1")
  .firestore.document("stays/{listingId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onStayCoverImageCreate")
      ) {
        return;
      }

      const listingDetail = change.data() as ListingDetailInterface;
      await createThumbURLForDetail(listingDetail);
      return;
    } catch (error) {
      console.error(error);
    }
  });
