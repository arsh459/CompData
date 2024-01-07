import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { updateTripsCreated } from "../../../models/LeaderBoard/ContentKPIs";
import { removeFromSiteMap } from "../../../models/ListingSiteMap/Methods";
import { Trip } from "../../../models/Trip/Trip";
import { deleteNestedCollection } from "../onCollectionDelete/deleteUtils";

export const onTripDeleteFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{tripId}")
  .onDelete(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onTripDeleteFunc")) {
        return;
      }

      const trip = change.data() as Trip;
      if (trip.uid) {
        await deleteNestedCollection(trip, "trip");
        await updateTripsCreated(trip.uid, -1);

        if (trip.collectionKey) {
          await removeFromSiteMap(
            "trips",
            trip.collectionName,
            trip.collectionKey,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
