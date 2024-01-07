import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Trip } from "../../../models/Trip/Trip";
import { handleCloudinaryMedia } from "../onCollectionCreate/cloudinary/handleCloudinaryMedia";

export const onTripMediaProcessCreateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("tripsV2/{tripId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onTripMediaProcessCreateFunc"
        )
      ) {
        return;
      }
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const trip = snapshot.data() as Trip;

      //
      if (
        trip.processingMedia &&
        trip.processingMedia === "PENDING" &&
        trip.collectionMedia.length > 0
      ) {
        await handleCloudinaryMedia(trip, "trip");
      }
    } catch (error) {
      console.error(error);
    }
  });

export const onTripMediaProcessUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("tripsV2/{tripId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onTripMediaProcessUpdateFunc"
        )
      ) {
        return;
      }
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const trip = change.after.data() as Trip;
      const prevTrip = change.before.data() as Trip;

      //
      if (
        trip.processingMedia &&
        trip.processingMedia === "PENDING" &&
        trip.collectionMedia.length > 0
      ) {
        await handleCloudinaryMedia(trip, "trip", prevTrip.mediaAspectRatio);
      }
    } catch (error) {
      console.error(error);
    }
  });
