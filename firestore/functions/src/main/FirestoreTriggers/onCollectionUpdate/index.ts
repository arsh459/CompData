import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Collection } from "../../../models/Collection/Collection";
import {
  // checkIfMediaUpdate,
  getNewListingsAdded,
} from "../../../models/Collection/Methods/checkIfListingAdded";
import { getCollectionListingsMap } from "../../../models/Collection/Methods/getUtils";
import { updateCollectionWithListingIds } from "../../../models/Collection/Methods/updateWithListings";
import { updateOne } from "../../../utils/firestore/fetchOne";
import { updateCollectionKey } from "../onTripUpdate/tripKey";
// import { addListingsInCollection } from "./addListingsInCollection";
// import {getCollectionPlacesMap} from '../../../models/GooglePlaceDetail/Methods/getUtils';
// import {updateCollectionsCreated} from '../../../models/LeaderBoard/ContentKPIs';

export const onCollectionUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onCollectionUpdateFunc")
      ) {
        return;
      }

      const prevCollection = change.before.data() as Collection;
      const newCollection = change.after.data() as Collection;

      // update collection
      // await addListingsInCollection(newCollection);

      // only if request to update collection is requested
      if (newCollection.updateListings) {
        const {
          newIds,
          deletedIds,
          newPlaceIds,
          placesToDelete,
          // bookingListingsToBeAdded,
          // bookingListingsToBeRemoved,
          // bookingListingsToBeUpdated,
        } = getNewListingsAdded(prevCollection, newCollection);

        // console.log("newPlaceIds", newPlaceIds);
        // console.log("placesToDelete", placesToDelete);

        // if either is changed then write with merge fields
        if (
          newIds.length > 0 ||
          deletedIds.length > 0 ||
          newPlaceIds.length > 0 ||
          placesToDelete.length > 0
          // checkIfMediaUpdate(
          //   prevCollection.collectionMedia,
          //   newCollection.collectionMedia
          // )
          // bookingListingsToBeAdded.length > 0 || // for booking task updates
          // bookingListingsToBeRemoved.length > 0 // for booking task removals
        ) {
          const collectionListingsMap = await getCollectionListingsMap(
            newCollection.collectionId,
            "collection",
          );

          // functions.logger.log("collectionListingsMap", collectionListingsMap);

          // console.log("updating");
          // console.log('newIds', newIds);
          // console.log('deletedIds', deletedIds);
          // console.log('newPlaceIds', newPlaceIds);
          // console.log('placesToDelete', placesToDelete);
          // const placesMap = await getCollectionPlacesMap(
          //newCollection.collectionId,
          //);
          await updateCollectionWithListingIds(
            newCollection, // has updated list of ids
            newPlaceIds,
            deletedIds,
            placesToDelete,
            // bookingListingsToBeAdded,
            // bookingListingsToBeRemoved,
            // bookingListingsToBeUpdated,
            collectionListingsMap,
            "collection",
          );
        } else {
          await updateOne("collections", newCollection.collectionId, {
            updateListings: false,
          });
        }
      }

      // add trip key
      await updateCollectionKey(prevCollection, newCollection, "collections");

      // update is creator
      await updateOne("users", newCollection.uid, { isCreator: true });
    } catch (error) {
      console.error(error);
    }
  });
