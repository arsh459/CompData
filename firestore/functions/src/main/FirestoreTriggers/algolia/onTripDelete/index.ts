import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import { Trip } from "../../../../models/Trip/Trip";
import { removeCollectionFromIndex } from "../algoliaUtils";

export const onTripDeleteAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{tripId}")
  .onDelete(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onCollectionDeleteAlgoliaFunc"
        )
      ) {
        return;
      }

      const collectionNow = snapshot.data() as Trip;
      await removeCollectionFromIndex(collectionNow.collectionId);

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
