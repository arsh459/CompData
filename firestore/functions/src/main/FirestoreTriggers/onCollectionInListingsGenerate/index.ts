import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Collection } from "../../../models/Collection/Collection";
// import { addListingsInCollection } from "../onCollectionUpdate/addListingsInCollection";

export const onCollectionInListingsGenerateFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onCollectionInListingsGenerateFunc",
        )
      ) {
        return;
      }

      const newCollection = change.after.data() as Collection;

      if (!newCollection.updateListings) {
        // update collection
        // await addListingsInCollection(newCollection);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
