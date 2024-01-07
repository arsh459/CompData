import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
import { createThumbURLForDetail } from "../../Https/addListingThmbnail/main";

export const onListingCoverImageUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onListingCoverImageUpdateFunc"
        )
      ) {
        return;
      }

      const listingNow = change.after.data() as ListingDetailInterface;
      const listingBefore = change.before.data() as ListingDetailInterface;
      if (
        (listingNow.coverImages &&
          listingBefore.coverImages &&
          listingNow.coverImages.length > 0 &&
          listingBefore.coverImages.length > 0 &&
          listingNow.coverImages[0] !== listingBefore.coverImages[0]) ||
        (listingNow.coverImages &&
          listingNow.coverImages.length > 0 &&
          !listingNow.deeplinkURI)
      ) {
        await createThumbURLForDetail(listingNow);
        return;
      }
      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayCoverImageUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("stays/{listingId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onStayCoverImageUpdateFunc"
        )
      ) {
        return;
      }

      const listingNow = change.after.data() as ListingDetailInterface;
      const listingBefore = change.before.data() as ListingDetailInterface;
      if (
        (listingNow.coverImages &&
          listingBefore.coverImages &&
          listingNow.coverImages.length > 0 &&
          listingBefore.coverImages.length > 0 &&
          listingNow.coverImages[0] !== listingBefore.coverImages[0]) ||
        (listingNow.coverImages &&
          listingNow.coverImages.length > 0 &&
          !listingNow.deeplinkURI)
      ) {
        await createThumbURLForDetail(listingNow);
        return;
      }
      return;
    } catch (error) {
      console.log("error", error);
    }
  });
