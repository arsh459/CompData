import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { decrementTripLike } from "../../../models/Collection/Methods/likeUtils";

export const onTripLikeDeleteFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{tripId}/likes/{uid}")
  .onDelete(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onTripLikeDeleteFunc")
      ) {
        return;
      }

      const tripId: string = context.params.tripId;
      //   console.log('collectionId', collectionId);

      if (tripId) {
        await decrementTripLike(tripId);
      }
    } catch (error) {
      console.error(error);
    }
  });
