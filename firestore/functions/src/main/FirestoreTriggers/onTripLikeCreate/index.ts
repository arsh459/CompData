import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { incrementTripLike } from "../../../models/Collection/Methods/likeUtils";

export const onTripLikeCreateFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{tripId}/likes/{uid}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onTripLikeCreateFunc")
      ) {
        return;
      }

      const tripId: string = context.params.tripId;
      //   console.log('collectionId', collectionId);

      if (tripId) {
        await incrementTripLike(tripId);
      }
    } catch (error) {
      console.error(error);
    }
  });
