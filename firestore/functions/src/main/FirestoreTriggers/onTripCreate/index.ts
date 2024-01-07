import * as functions from "firebase-functions";
import { toAbhiteg, toSwapnil } from "../../../constants/email/contacts";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { updateCollectionWithListingIds } from "../../../models/Collection/Methods/updateWithListings";
import { updateTripsCreated } from "../../../models/LeaderBoard/ContentKPIs";
import { Trip } from "../../../models/Trip/Trip";
import { getUserById } from "../../../models/User/Methods";
import { updateOne } from "../../../utils/firestore/fetchOne";
import {
  onNewInfluencerCollection,
  onNewInfluencerCollectionToInfluencer,
} from "../utils/sendgrid";

export const onTripCreateFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{collectionId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onTripCreateFunc")) {
        return;
      }
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const trip = change.data() as Trip;

      // console.log("new trip", trip.updateListings);

      // if listings have to be updated
      // if (trip.updateListings) {

      // }

      // trip update
      await updateCollectionWithListingIds(
        trip,
        trip.googlePlaces ? Object.keys(trip.googlePlaces) : [],
        [],
        [],
        {},
        "trip",
      );

      if (trip.uid) {
        await updateTripsCreated(trip.uid, 1);

        // email notifications
        const influencerUser = await getUserById(trip.uid);

        if (influencerUser) {
          await onNewInfluencerCollection(
            toSwapnil,
            influencerUser.name,
            influencerUser.phone,
            influencerUser.email,
            trip.collectionName,
            trip.collectionTagline,
            trip.listingsPresent ? Object.keys(trip.listingsPresent).length : 0,
            trip.collectionId,
          );
          await onNewInfluencerCollection(
            toAbhiteg,
            influencerUser.name,
            influencerUser.phone,
            influencerUser.email,
            trip.collectionName,
            trip.collectionTagline,
            trip.listingsPresent ? Object.keys(trip.listingsPresent).length : 0,
            trip.collectionId,
          );
        }

        if (influencerUser && influencerUser.email) {
          await onNewInfluencerCollectionToInfluencer(
            influencerUser.email,
            influencerUser.name,
            trip.collectionName,
            trip.collectionTagline,
            trip.listingsPresent ? Object.keys(trip.listingsPresent).length : 0,
          );
        }

        // update is creator
        await updateOne("users", trip.uid, { isCreator: true });
      }
    } catch (error) {
      console.error(error);
    }
  });
