import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  checkIfMediaUpdate,
  getNewListingsAdded,
} from "../../../models/Collection/Methods/checkIfListingAdded";
import { getCollectionListingsMap } from "../../../models/Collection/Methods/getUtils";
import { updateCollectionWithListingIds } from "../../../models/Collection/Methods/updateWithListings";
import { Trip } from "../../../models/Trip/Trip";
import { updateOne } from "../../../utils/firestore/fetchOne";
import { updateCollectionKey } from "./tripKey";

export const onTripUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{collectionId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onTripUpdateFunc")) {
        return;
      }

      const prevTrip = change.before.data() as Trip;
      const newTrip = change.after.data() as Trip;

      // only if request to update collection is requested
      if (newTrip.updateListings) {
        const {
          newIds,
          deletedIds,
          newPlaceIds,
          placesToDelete,
          // bookingListingsToBeAdded,
          // bookingListingsToBeRemoved,
          // bookingListingsToBeUpdated,
        } = getNewListingsAdded(prevTrip, newTrip);

        // if either is changed then write with merge fields
        if (
          newIds.length > 0 ||
          deletedIds.length > 0 ||
          newPlaceIds.length > 0 ||
          placesToDelete.length > 0 ||
          checkIfMediaUpdate(newTrip.collectionMedia, prevTrip.collectionMedia)
        ) {
          const collectionListingsMap = await getCollectionListingsMap(
            newTrip.collectionId,
            "trip",
          );

          // console.log("updating");
          // console.log('newIds', newIds);
          // console.log('deletedIds', deletedIds);
          // console.log('newPlaceIds', newPlaceIds);
          // console.log('placesToDelete', placesToDelete);
          // const placesMap = await getCollectionPlacesMap(
          //newCollection.collectionId,
          //);
          await updateCollectionWithListingIds(
            newTrip, // has updated list of ids
            newPlaceIds,
            deletedIds,
            placesToDelete,
            // bookingListingsToBeAdded,
            // bookingListingsToBeRemoved,
            // bookingListingsToBeUpdated,
            collectionListingsMap,
            "trip",
          );
        } else {
          await updateOne("tripsV2", newTrip.collectionId, {
            updateListings: false,
          });
        }
      }

      // add trip key
      await updateCollectionKey(prevTrip, newTrip, "tripsV2");

      // update is creator
      await updateOne("users", newTrip.uid, { isCreator: true });
    } catch (error) {
      console.error(error);
    }
  });
