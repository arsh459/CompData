import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { UGCListing } from "../../../models/UGCListing/UGCListing";
import {
  addToStorePacket,
  removeFromStorePacket,
} from "../../../models/StorePacket/Methods";
import { discoveryCreateEmail } from "../utils/sendgrid";
// import { removeListingId } from "../../../models/User/Methods";

export const onDiscoveryUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("ugcListings/{ugcListingId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onDiscoveryUpdate")) {
        return;
      }

      const discNow = change.after.data() as UGCListing;
      const discBefore = change.before.data() as UGCListing;
      if (
        discNow.saved &&
        discNow.status === "PUBLISHED" &&
        discBefore.status !== "PUBLISHED" &&
        discNow.listingId &&
        discNow.circuitId
      ) {
        await addToStorePacket(
          discNow.uid,
          discNow.listingId,
          discNow.circuitId,
          discNow
        );
      } else if (
        discNow.saved &&
        discNow.status !== "PUBLISHED" &&
        discBefore.status === "PUBLISHED" &&
        discNow.listingId &&
        discNow.circuitId
      ) {
        await removeFromStorePacket(
          discNow.uid,
          discNow.listingId,
          discNow.circuitId
        );
        // send discovery update email
        await discoveryCreateEmail(discNow, "update");
      } else if (
        !discNow.saved &&
        discBefore.saved &&
        discNow.listingId &&
        discNow.status === "PUBLISHED" &&
        discNow.circuitId
      ) {
        await removeFromStorePacket(
          discNow.uid,
          discNow.listingId,
          discNow.circuitId
        );
        // send discovery update email
        await discoveryCreateEmail(discNow, "deleted");
      }
    } catch (error) {
      console.log("error", error);
    }
  });
