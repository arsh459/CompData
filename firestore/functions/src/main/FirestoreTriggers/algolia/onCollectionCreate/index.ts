import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import { Collection } from "../../../../models/Collection/Collection";
import {
  createCollectionSnippet,
  isValidToCollectionSnippet,
} from "../../../../models/Collection/Methods/isValid";
import { addCollectionToIndex } from "../algoliaUtils";

export const onCollectionAddAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onCollectionAddAlgolia")
      ) {
        return;
      }

      const collectionNow = snapshot.data() as Collection;
      if (isValidToCollectionSnippet(collectionNow)) {
        const collectionSnippet = await createCollectionSnippet(
          collectionNow,
          "collection"
        );
        await addCollectionToIndex(collectionSnippet);
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
