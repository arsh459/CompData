import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Collection } from "../../../models/Collection/Collection";
import { updateCollectionsCreated } from "../../../models/LeaderBoard/ContentKPIs";
import { removeFromSiteMap } from "../../../models/ListingSiteMap/Methods";
import { deleteNestedCollection } from "./deleteUtils";

export const onCollectionDeleteFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}")
  .onDelete(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onCollectionDeleteFunc")
      ) {
        return;
      }

      const collection = change.data() as Collection;
      if (collection.uid && collection.saved) {
        await deleteNestedCollection(collection, "collection");
        await updateCollectionsCreated(collection.uid, -1);

        if (collection.collectionKey) {
          await removeFromSiteMap(
            "trips",
            collection.collectionName,
            collection.collectionKey,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
