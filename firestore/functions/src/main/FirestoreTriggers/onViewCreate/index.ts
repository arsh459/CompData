import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { View } from "../../../models/Collection/Collection";
// import { handleView } from "../../../models/Collection/Methods/addView";
// import {addVisitor} from '../../../models/LeaderBoard/Methods';

export const onViewCreateFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}/views/{viewId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onViewCreateFunc")) {
        return;
      }

      const collectionId: string = context.params.collectionId;
      const viewId: string = context.params.viewId;

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);

      const newView = snapshot.data() as View;
      if (newView.creatorId && collectionId && viewId) {
        // await handleView(collectionId, newView, viewId, "collection");
      }
    } catch (error) {
      console.error(error);
    }
  });
