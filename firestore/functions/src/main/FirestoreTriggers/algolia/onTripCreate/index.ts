import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import {
  createCollectionSnippet,
  isValidToCollectionSnippet,
} from "../../../../models/Collection/Methods/isValid";
import { Trip } from "../../../../models/Trip/Trip";
import { addCollectionToIndex } from "../algoliaUtils";

export const onTripAddAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{tripId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onTripAddAlgoliaFunc")
      ) {
        return;
      }

      const collectionNow = snapshot.data() as Trip;
      if (isValidToCollectionSnippet(collectionNow)) {
        const collectionSnippet = await createCollectionSnippet(
          collectionNow,
          "trip"
        );
        await addCollectionToIndex(collectionSnippet);
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
