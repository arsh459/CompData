import * as functions from "firebase-functions";
import { toAbhiteg, toSwapnil } from "../../../constants/email/contacts";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Collection } from "../../../models/Collection/Collection";
// import { getBookingTasksToBeAdded } from "../../../models/Collection/Methods/checkIfListingAdded";
import { updateCollectionWithListingIds } from "../../../models/Collection/Methods/updateWithListings";
import { updateCollectionsCreated } from "../../../models/LeaderBoard/ContentKPIs";
import { getUserById } from "../../../models/User/Methods";
import { updateOne } from "../../../utils/firestore/fetchOne";
import {
  onNewInfluencerCollection,
  onNewInfluencerCollectionToInfluencer,
} from "../utils/sendgrid";

export const onCollectionCreateFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onCollectionCreate")) {
        return;
      }
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const collection = change.data() as Collection;

      // if listings have to be updated
      // if (collection.updateListings) {
      // const {
      // bookingListingsToBeUpdated,
      // bookingListingsToBeAdded,
      // bookingListingsToBeRemoved,
      // } = getBookingTasksToBeAdded(collection);

      await updateCollectionWithListingIds(
        collection,
        collection.googlePlaces ? Object.keys(collection.googlePlaces) : [],
        [],
        [],
        // bookingListingsToBeAdded,
        // bookingListingsToBeRemoved,
        // bookingListingsToBeUpdated,
        {},
        "collection",
      );
      // }

      if (collection.uid && collection.saved) {
        await updateCollectionsCreated(collection.uid, 1);

        // email notifications
        const influencerUser = await getUserById(collection.uid);

        if (influencerUser) {
          await onNewInfluencerCollection(
            toSwapnil,
            influencerUser.name,
            influencerUser.phone,
            influencerUser.email,
            collection.collectionName,
            collection.collectionTagline,
            collection.listingsPresent
              ? Object.keys(collection.listingsPresent).length
              : 0,
            collection.collectionId,
          );
          await onNewInfluencerCollection(
            toAbhiteg,
            influencerUser.name,
            influencerUser.phone,
            influencerUser.email,
            collection.collectionName,
            collection.collectionTagline,
            collection.listingsPresent
              ? Object.keys(collection.listingsPresent).length
              : 0,
            collection.collectionId,
          );
        }

        if (influencerUser && influencerUser.email) {
          await onNewInfluencerCollectionToInfluencer(
            influencerUser.email,
            influencerUser.name,
            collection.collectionName,
            collection.collectionTagline,
            collection.listingsPresent
              ? Object.keys(collection.listingsPresent).length
              : 0,
          );
        }

        // update is creator
        await updateOne("users", collection.uid, { isCreator: true });
      }
    } catch (error) {
      console.error(error);
    }
  });
