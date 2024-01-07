import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
import { updatePlacesInCollection } from "../onListingUpdate/updateGooglePlaces";

export const onListingCreateFunc = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onListingCreateFunc")) {
        return;
      }

      const listingNow = snapshot.data() as ListingDetailInterface;

      // update places
      await updatePlacesInCollection(listingNow);

      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayCreateFunc = functions
  .region("asia-south1")
  .firestore.document("stays/{listingId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onStayCreateFunc")) {
        return;
      }

      const listingNow = snapshot.data() as ListingDetailInterface;

      // update places
      await updatePlacesInCollection(listingNow);

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
