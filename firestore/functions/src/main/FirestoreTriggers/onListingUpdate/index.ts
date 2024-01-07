import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
import { updateListingKey } from "./listingKey";
import { updateListingsInCollection } from "./updateCollectionListings";
import { updatePlacesInCollection } from "./updateGooglePlaces";

export const onListingUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onListingUpdateFunc")) {
        return;
      }

      const listingNow = change.after.data() as ListingDetailInterface;
      const listingPrev = change.before.data() as ListingDetailInterface;

      // update all listings
      await updateListingsInCollection(listingNow);
      // update places
      await updatePlacesInCollection(listingNow, listingPrev);

      await updateListingKey(listingPrev, listingNow, "allListings");
      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("stays/{listingId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onStayUpdateFunc")) {
        return;
      }

      const listingNow = change.after.data() as ListingDetailInterface;
      const listingPrev = change.before.data() as ListingDetailInterface;

      // update all listings
      await updateListingsInCollection(listingNow);
      // update places
      await updatePlacesInCollection(listingNow, listingPrev);

      await updateListingKey(listingPrev, listingNow, "stays");

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
