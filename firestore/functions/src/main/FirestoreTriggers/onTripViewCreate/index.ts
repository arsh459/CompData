import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { View } from "../../../models/Collection/Collection";
// import { handleView } from "../../../models/Collection/Methods/addView";
// import {addVisitor} from '../../../models/LeaderBoard/Methods';

export const onTripViewCreateFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{tripId}/views/{viewId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onTripViewCreateFunc")
      ) {
        return;
      }

      const tripId: string = context.params.tripId;
      const viewId: string = context.params.viewId;

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);

      const newView = snapshot.data() as View;
      if (newView.creatorId && tripId && viewId) {
        // await handleView(tripId, newView, viewId, "trip");
      }
    } catch (error) {
      console.error(error);
    }
  });
