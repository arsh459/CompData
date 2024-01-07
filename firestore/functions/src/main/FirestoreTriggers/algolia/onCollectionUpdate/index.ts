import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import { Collection } from "../../../../models/Collection/Collection";
import {
  createCollectionSnippet,
  isValidToCollectionSnippet,
} from "../../../../models/Collection/Methods/isValid";
import {
  addCollectionToIndex,
  removeCollectionFromIndex,
} from "../algoliaUtils";

export const onCollectionUpdateAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onCollectionUpdateAlgoliaFunc"
        )
      ) {
        return;
      }

      const collectionNow = change.after.data() as Collection;
      if (isValidToCollectionSnippet(collectionNow)) {
        const collectionSnippet = await createCollectionSnippet(
          collectionNow,
          "collection"
        );
        await addCollectionToIndex(collectionSnippet);
      } else {
        await removeCollectionFromIndex(collectionNow.collectionId);
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
