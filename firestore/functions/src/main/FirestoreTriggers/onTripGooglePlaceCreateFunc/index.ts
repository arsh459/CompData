import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import {updateCollectionListings} from '../../../models/LeaderBoard/ContentKPIs';
// import {CollectionListing} from '../../../models/Collection/Collection';
import { GooglePlaceDetail } from "../../../models/GooglePlaceDetail/GooglePlaceDetail";
import { onNewGooglePlaceEmail } from "../utils/sendgrid";
import { toAbhiteg, toSwapnil } from "../../../constants/email/contacts";
import { getUserById } from "../../../models/User/Methods";
import { checkIfListingExists } from "../../../models/ListingDetail/Methods";
import { handlePlaceToCollection } from "../onListingUpdate/updateGooglePlaces";
import { getTripBytripId } from "../../../models/Trip/Methods/getUtils";

export const onTripGooglePlaceCreateFunc = functions
  .region("asia-south1")
  .firestore.document("tripsV2/{tripId}/googlePlaces/{placeId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onTripGooglePlaceCreateFunc",
        )
      ) {
        return;
      }

      const placeDetail = snapshot.data() as GooglePlaceDetail;
      const listingToReplace = await checkIfListingExists(placeDetail.place_id);

      const tripId: string = context.params.tripId;
      const trip = await getTripBytripId(tripId);

      if (listingToReplace && trip) {
        // console.log("listingToAdd", listingToReplace.listingId);
        // console.log("collection", collection.collectionId);
        await handlePlaceToCollection(
          [trip],
          placeDetail.place_id.trim(),
          listingToReplace,
          "trip",
        );
      } else if (trip) {
        const creator = await getUserById(trip.uid);

        if (creator) {
          await onNewGooglePlaceEmail(
            placeDetail.name,
            placeDetail.place_id,
            placeDetail.formatted_address,
            toSwapnil,
            creator.name,
            creator.phone,
            creator.email,
            trip.collectionName,
            trip.collectionTagline,
            trip.listingsPresent ? Object.keys(trip.listingsPresent).length : 0,
            trip.collectionId,
          );

          await onNewGooglePlaceEmail(
            placeDetail.name,
            placeDetail.place_id,
            placeDetail.formatted_address,
            toAbhiteg,
            creator.name,
            creator.phone,
            creator.email,
            trip.collectionName,
            trip.collectionTagline,
            trip.listingsPresent ? Object.keys(trip.listingsPresent).length : 0,
            trip.collectionId,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
