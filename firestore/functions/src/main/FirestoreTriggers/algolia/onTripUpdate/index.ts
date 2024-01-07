import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import {
  createCollectionSnippet,
  isValidToCollectionSnippet,
} from "../../../../models/Collection/Methods/isValid";
import { Trip } from "../../../../models/Trip/Trip";
import {
  addCollectionToIndex,
  removeCollectionFromIndex,
} from "../algoliaUtils";

export const onTripUpdateAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{collectionId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      // console.log("functionId", functionEventId);
      if (
        await isDuplicateInvocation(functionEventId, "onTripUpdateAlgoliaFunc")
      ) {
        return;
      }

      const collectionNow = change.after.data() as Trip;
      if (isValidToCollectionSnippet(collectionNow)) {
        const collectionSnippet = await createCollectionSnippet(
          collectionNow,
          "trip"
        );
        // console.log("valid trip", collectionSnippet.collectionName);
        await addCollectionToIndex(collectionSnippet);
      } else {
        // console.log("invalid trip", collectionNow.collectionName);
        await removeCollectionFromIndex(collectionNow.collectionId);
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
