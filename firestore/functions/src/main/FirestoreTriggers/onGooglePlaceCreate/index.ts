import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import {updateCollectionListings} from '../../../models/LeaderBoard/ContentKPIs';
// import {CollectionListing} from '../../../models/Collection/Collection';
import { GooglePlaceDetail } from "../../../models/GooglePlaceDetail/GooglePlaceDetail";
import { getCollectionByCollectionId } from "../../../models/Collection/Methods/getUtils";
import { onNewGooglePlaceEmail } from "../utils/sendgrid";
import { toAbhiteg, toSwapnil } from "../../../constants/email/contacts";
import { getUserById } from "../../../models/User/Methods";
import { checkIfListingExists } from "../../../models/ListingDetail/Methods";
import { handlePlaceToCollection } from "../onListingUpdate/updateGooglePlaces";

export const onGooglePlaceCreateFunc = functions
  .region("asia-south1")
  .firestore.document("collections/{collectionId}/googlePlaces/{listingId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onGooglePlaceCreateFunc")
      ) {
        return;
      }

      const placeDetail = snapshot.data() as GooglePlaceDetail;
      const listingToReplace = await checkIfListingExists(placeDetail.place_id);

      const collectionId: string = context.params.collectionId;
      const collection = await getCollectionByCollectionId(collectionId);
      // console.log("here", listingToReplace?.listingId);

      if (listingToReplace && collection) {
        // console.log("listingToAdd", listingToReplace.listingId);
        // console.log("collection", collection.collectionId);
        await handlePlaceToCollection(
          [collection],
          placeDetail.place_id.trim(),
          listingToReplace,
          "collection",
        );
      } else if (collection) {
        const creator = await getUserById(collection.uid);

        if (creator) {
          await onNewGooglePlaceEmail(
            placeDetail.name,
            placeDetail.place_id,
            placeDetail.formatted_address,
            toSwapnil,
            creator.name,
            creator.phone,
            creator.email,
            collection.collectionName,
            collection.collectionTagline,
            collection.listingsPresent
              ? Object.keys(collection.listingsPresent).length
              : 0,
            collection.collectionId,
          );

          await onNewGooglePlaceEmail(
            placeDetail.name,
            placeDetail.place_id,
            placeDetail.formatted_address,
            toAbhiteg,
            creator.name,
            creator.phone,
            creator.email,
            collection.collectionName,
            collection.collectionTagline,
            collection.listingsPresent
              ? Object.keys(collection.listingsPresent).length
              : 0,
            collection.collectionId,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
