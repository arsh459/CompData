import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import { Collection } from "../../../../models/Collection/Collection";
import { removeCollectionFromIndex } from "../algoliaUtils";

export const onCollectionDeleteAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}")
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

      const collectionNow = snapshot.data() as Collection;
      await removeCollectionFromIndex(collectionNow.collectionId);

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
